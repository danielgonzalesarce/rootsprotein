import { timingSafeEqual } from "node:crypto";
import { loyalty } from "@/data/loyalty";
import { isWithinServiceHours } from "@/lib/loyalty/hours";
import { hashPin, isValidPin, verifyPin } from "@/lib/loyalty/pin";
import { normalizePhone } from "@/lib/loyalty/phone";
import {
  addRedemption,
  addStamp,
  createCustomer,
  findCustomerByPhone,
  getActiveStampCount,
  getHistory,
  getLastStampAt,
} from "@/lib/loyalty/store";
import { verifyQrToken } from "@/lib/loyalty/tokens";
import { sanitizePlainText } from "@/lib/security/sanitize";
import { localQrPassword } from "@/lib/security/secrets";

export type AccountView = {
  name: string;
  phone: string;
  stamps: number;
  needed: number;
  readyToRedeem: boolean;
  history: Awaited<ReturnType<typeof getHistory>>;
  prizeLabel: string;
};

export async function registerCustomer(input: {
  name: string;
  phone: string;
  pin: string;
}): Promise<{ ok: true; customerId: string; name: string; phone: string } | { ok: false; error: string }> {
  const name = sanitizePlainText(input.name, 60);
  if (name.length < 2) return { ok: false, error: "Escribe tu nombre." };
  const phone = normalizePhone(input.phone);
  if (!phone) return { ok: false, error: "Escribe un WhatsApp válido (9 dígitos)." };
  if (!isValidPin(input.pin)) return { ok: false, error: "El PIN debe tener entre 4 y 6 dígitos." };

  const existing = await findCustomerByPhone(phone);
  if (existing) return { ok: false, error: "Ese WhatsApp ya tiene cuenta. Entra con tu PIN." };

  const customer = await createCustomer({
    phone,
    name,
    pinHash: await hashPin(input.pin),
  });
  return { ok: true, customerId: customer.id, name: customer.name, phone: customer.phone };
}

export async function loginCustomer(input: {
  phone: string;
  pin: string;
}): Promise<{ ok: true; customerId: string; name: string; phone: string } | { ok: false; error: string }> {
  const phone = normalizePhone(input.phone);
  if (!phone) return { ok: false, error: "Escribe un WhatsApp válido (9 dígitos)." };
  if (!isValidPin(input.pin)) return { ok: false, error: "El PIN debe tener entre 4 y 6 dígitos." };

  const customer = await findCustomerByPhone(phone);
  if (!customer) return { ok: false, error: "No encontramos esa cuenta. Regístrate primero." };
  const valid = await verifyPin(input.pin, customer.pinHash);
  if (!valid) return { ok: false, error: "PIN incorrecto." };
  return { ok: true, customerId: customer.id, name: customer.name, phone: customer.phone };
}

export async function buildAccountView(customerId: string, name: string, phone: string): Promise<AccountView> {
  const [stamps, history] = await Promise.all([getActiveStampCount(customerId), getHistory(customerId)]);
  return {
    name,
    phone,
    stamps,
    needed: loyalty.stampsNeeded,
    readyToRedeem: stamps >= loyalty.stampsNeeded,
    history,
    prizeLabel: loyalty.prizeLabel,
  };
}

export async function applyStamp(input: {
  customerId: string;
  token: string;
}): Promise<{ ok: true; stamps: number } | { ok: false; error: string }> {
  const tokenCheck = verifyQrToken(input.token, "stamp");
  if (!tokenCheck.ok) return tokenCheck;
  if (!isWithinServiceHours()) {
    return { ok: false, error: "Solo puedes sumar sellos en el horario del local." };
  }

  const current = await getActiveStampCount(input.customerId);
  if (current >= loyalty.stampsNeeded) {
    return { ok: false, error: "Ya tienes 8 sellos. Pide el canje en el local." };
  }

  const lastAt = await getLastStampAt(input.customerId);
  if (lastAt) {
    const elapsed = Date.now() - new Date(lastAt).getTime();
    const cooldown = loyalty.stampCooldownHours * 60 * 60 * 1000;
    if (elapsed < cooldown) {
      const hoursLeft = Math.ceil((cooldown - elapsed) / (60 * 60 * 1000));
      return {
        ok: false,
        error: `Ya sumaste un sello hace poco. Espera ${hoursLeft} h para el siguiente.`,
      };
    }
  }

  await addStamp(input.customerId);
  const stamps = await getActiveStampCount(input.customerId);
  return { ok: true, stamps };
}

export async function applyRedeem(input: {
  customerId: string;
  token: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const tokenCheck = verifyQrToken(input.token, "redeem");
  if (!tokenCheck.ok) return tokenCheck;
  if (!isWithinServiceHours()) {
    return { ok: false, error: "Solo puedes canjear en el horario del local." };
  }

  const current = await getActiveStampCount(input.customerId);
  if (current < loyalty.stampsNeeded) {
    return { ok: false, error: `Te faltan ${loyalty.stampsNeeded - current} sellos para canjear.` };
  }

  await addRedemption(input.customerId);
  return { ok: true };
}

export function checkLocalPassword(password: string): boolean {
  const expected = localQrPassword();
  const left = Buffer.from(password);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  try {
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}
