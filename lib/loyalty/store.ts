import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import {
  loyalty,
  type LoyaltyCustomer,
  type LoyaltyHistoryItem,
  type LoyaltyRedemption,
  type LoyaltyStamp,
} from "@/data/loyalty";

type StoreData = {
  customers: LoyaltyCustomer[];
  stamps: LoyaltyStamp[];
  redemptions: LoyaltyRedemption[];
};

type Sql = NeonQueryFunction<false, false>;

const emptyStore = (): StoreData => ({ customers: [], stamps: [], redemptions: [] });

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

/** En Vercel/Neon pueden venir con distintos nombres. */
function resolveDatabaseUrl(): string | null {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.NEON_DATABASE_URL,
  ];
  for (const value of candidates) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return null;
}

function localPath(): string {
  // En serverless el cwd no es escribible; el fallback local solo aplica fuera de Vercel.
  const root = isServerlessRuntime() ? "/tmp" : process.cwd();
  return path.join(root, ".data", "loyalty.json");
}

async function readLocal(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(localPath(), "utf8");
    const parsed = JSON.parse(raw) as StoreData;
    return {
      customers: parsed.customers ?? [],
      stamps: parsed.stamps ?? [],
      redemptions: parsed.redemptions ?? [],
    };
  } catch {
    return emptyStore();
  }
}

async function writeLocal(data: StoreData): Promise<void> {
  if (isServerlessRuntime() && !resolveDatabaseUrl()) {
    throw new Error(
      "Falta DATABASE_URL en Vercel. Conecta Neon (o pega la connection string) y vuelve a desplegar.",
    );
  }
  const file = localPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

function getSql(): Sql | null {
  const url = resolveDatabaseUrl();
  if (!url) return null;
  return neon(url);
}

function useNeon(): boolean {
  return Boolean(resolveDatabaseUrl());
}

function requireNeonInProduction(): void {
  if (isServerlessRuntime() && !resolveDatabaseUrl()) {
    throw new Error(
      "Falta DATABASE_URL en Vercel. Conecta Neon (o pega la connection string) y vuelve a desplegar.",
    );
  }
}

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export async function findCustomerByPhone(phone: string): Promise<LoyaltyCustomer | null> {
  requireNeonInProduction();
  const sql = getSql();
  if (sql && useNeon()) {
    const rows = await sql`
      select id, phone, name, pin_hash, created_at
      from loyalty_customers
      where phone = ${phone}
      limit 1
    `;
    const row = rows[0] as Record<string, unknown> | undefined;
    return row ? mapCustomer(row) : null;
  }
  const store = await readLocal();
  return store.customers.find((customer) => customer.phone === phone) ?? null;
}

export async function findCustomerById(id: string): Promise<LoyaltyCustomer | null> {
  requireNeonInProduction();
  const sql = getSql();
  if (sql && useNeon()) {
    const rows = await sql`
      select id, phone, name, pin_hash, created_at
      from loyalty_customers
      where id = ${id}
      limit 1
    `;
    const row = rows[0] as Record<string, unknown> | undefined;
    return row ? mapCustomer(row) : null;
  }
  const store = await readLocal();
  return store.customers.find((customer) => customer.id === id) ?? null;
}

export async function createCustomer(input: {
  phone: string;
  name: string;
  pinHash: string;
}): Promise<LoyaltyCustomer> {
  requireNeonInProduction();
  const customer: LoyaltyCustomer = {
    id: randomUUID(),
    phone: input.phone,
    name: input.name.trim(),
    pinHash: input.pinHash,
    createdAt: new Date().toISOString(),
  };

  const sql = getSql();
  if (sql && useNeon()) {
    try {
      await sql`
        insert into loyalty_customers (id, phone, name, pin_hash, created_at)
        values (${customer.id}, ${customer.phone}, ${customer.name}, ${customer.pinHash}, ${customer.createdAt})
      `;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.toLowerCase().includes("unique") || message.includes("23505")) {
        throw new Error("Ese WhatsApp ya está registrado.");
      }
      throw error;
    }
    return customer;
  }

  const store = await readLocal();
  if (store.customers.some((item) => item.phone === customer.phone)) {
    throw new Error("Ese WhatsApp ya está registrado.");
  }
  store.customers.push(customer);
  await writeLocal(store);
  return customer;
}

export async function listStamps(customerId: string): Promise<LoyaltyStamp[]> {
  requireNeonInProduction();
  const sql = getSql();
  if (sql && useNeon()) {
    const rows = await sql`
      select id, customer_id, created_at, source
      from loyalty_stamps
      where customer_id = ${customerId}
      order by created_at asc
    `;
    return (rows as Record<string, unknown>[]).map(mapStamp);
  }
  const store = await readLocal();
  return store.stamps
    .filter((stamp) => stamp.customerId === customerId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function listRedemptions(customerId: string): Promise<LoyaltyRedemption[]> {
  requireNeonInProduction();
  const sql = getSql();
  if (sql && useNeon()) {
    const rows = await sql`
      select id, customer_id, stamps_used, created_at
      from loyalty_redemptions
      where customer_id = ${customerId}
      order by created_at asc
    `;
    return (rows as Record<string, unknown>[]).map(mapRedemption);
  }
  const store = await readLocal();
  return store.redemptions
    .filter((item) => item.customerId === customerId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function getActiveStampCount(customerId: string): Promise<number> {
  const [stamps, redemptions] = await Promise.all([listStamps(customerId), listRedemptions(customerId)]);
  const lastRedeemAt = redemptions.at(-1)?.createdAt;
  const active = lastRedeemAt ? stamps.filter((stamp) => stamp.createdAt > lastRedeemAt) : stamps;
  return Math.min(active.length, loyalty.stampsNeeded);
}

export async function getLastStampAt(customerId: string): Promise<string | null> {
  const stamps = await listStamps(customerId);
  return stamps.at(-1)?.createdAt ?? null;
}

export async function addStamp(customerId: string): Promise<LoyaltyStamp> {
  requireNeonInProduction();
  const stamp: LoyaltyStamp = {
    id: randomUUID(),
    customerId,
    createdAt: new Date().toISOString(),
    source: "qr",
  };

  const sql = getSql();
  if (sql && useNeon()) {
    await sql`
      insert into loyalty_stamps (id, customer_id, created_at, source)
      values (${stamp.id}, ${stamp.customerId}, ${stamp.createdAt}, ${stamp.source})
    `;
    return stamp;
  }

  const store = await readLocal();
  store.stamps.push(stamp);
  await writeLocal(store);
  return stamp;
}

export async function addRedemption(customerId: string): Promise<LoyaltyRedemption> {
  requireNeonInProduction();
  const redemption: LoyaltyRedemption = {
    id: randomUUID(),
    customerId,
    stampsUsed: loyalty.stampsNeeded,
    createdAt: new Date().toISOString(),
  };

  const sql = getSql();
  if (sql && useNeon()) {
    await sql`
      insert into loyalty_redemptions (id, customer_id, stamps_used, created_at)
      values (${redemption.id}, ${redemption.customerId}, ${redemption.stampsUsed}, ${redemption.createdAt})
    `;
    return redemption;
  }

  const store = await readLocal();
  store.redemptions.push(redemption);
  await writeLocal(store);
  return redemption;
}

export async function countCustomers(): Promise<number> {
  const sql = getSql();
  if (sql && useNeon()) {
    const rows = await sql`select count(*)::int as total from loyalty_customers`;
    return Number((rows[0] as { total: number }).total ?? 0);
  }
  const store = await readLocal();
  return store.customers.length;
}

export async function getHistory(customerId: string): Promise<LoyaltyHistoryItem[]> {
  const [stamps, redemptions] = await Promise.all([listStamps(customerId), listRedemptions(customerId)]);
  const items: LoyaltyHistoryItem[] = [
    ...stamps.map((stamp) => ({
      id: stamp.id,
      kind: "stamp" as const,
      createdAt: stamp.createdAt,
      label: "Sello",
    })),
    ...redemptions.map((item) => ({
      id: item.id,
      kind: "redeem" as const,
      createdAt: item.createdAt,
      label: "Canje",
    })),
  ];
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 12);
}

function mapCustomer(row: Record<string, unknown>): LoyaltyCustomer {
  return {
    id: String(row.id),
    phone: String(row.phone),
    name: String(row.name),
    pinHash: String(row.pin_hash ?? row.pinHash),
    createdAt: asIso(row.created_at ?? row.createdAt),
  };
}

function mapStamp(row: Record<string, unknown>): LoyaltyStamp {
  return {
    id: String(row.id),
    customerId: String(row.customer_id ?? row.customerId),
    createdAt: asIso(row.created_at ?? row.createdAt),
    source: "qr",
  };
}

function mapRedemption(row: Record<string, unknown>): LoyaltyRedemption {
  return {
    id: String(row.id),
    customerId: String(row.customer_id ?? row.customerId),
    stampsUsed: Number(row.stamps_used ?? row.stampsUsed ?? loyalty.stampsNeeded),
    createdAt: asIso(row.created_at ?? row.createdAt),
  };
}
