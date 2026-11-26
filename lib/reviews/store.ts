import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import type { Review } from "@/data/reviews";
import { reviews as curatedReviews } from "@/data/reviews";
import { looksLikeScriptInjection, sanitizePlainText } from "@/lib/security/sanitize";

export type StoredReview = {
  id: string;
  name: string;
  text: string;
  rating: 5 | 4 | 3 | 2 | 1;
  createdAt: string;
  source: "site";
};

type StoreData = { reviews: StoredReview[] };

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function resolveDatabaseUrl(): string | null {
  for (const value of [
    process.env.DATABASE_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
  ]) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return null;
}

function localPath() {
  const root = isServerlessRuntime() ? "/tmp" : process.cwd();
  return path.join(root, ".data", "site-reviews.json");
}

async function readLocal(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(localPath(), "utf8");
    const parsed = JSON.parse(raw) as StoreData;
    return { reviews: parsed.reviews ?? [] };
  } catch {
    return { reviews: [] };
  }
}

async function writeLocal(data: StoreData) {
  if (isServerlessRuntime() && !resolveDatabaseUrl()) {
    throw new Error("Falta DATABASE_URL en Vercel para guardar reseñas.");
  }
  const file = localPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

function getSql() {
  const url = resolveDatabaseUrl();
  if (!url) return null;
  return neon(url);
}

function clampRating(value: number): 5 | 4 | 3 | 2 | 1 {
  const n = Math.round(value);
  if (n >= 5) return 5;
  if (n === 4) return 4;
  if (n === 3) return 3;
  if (n === 2) return 2;
  return 1;
}

export async function listSiteReviews(): Promise<StoredReview[]> {
  const sql = getSql();
  if (sql) {
    try {
      const rows = await sql`
        select id, name, text, rating, created_at
        from site_reviews
        where published = true
        order by created_at desc
        limit 40
      `;
      return (rows as Record<string, unknown>[]).map((row) => ({
        id: String(row.id),
        name: String(row.name),
        text: String(row.text),
        rating: clampRating(Number(row.rating)),
        createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
        source: "site" as const,
      }));
    } catch {
      // tabla aún no creada → fallback local
    }
  }

  const local = await readLocal();
  return [...local.reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listHomeReviews(): Promise<Review[]> {
  const siteOnes = await listSiteReviews();
  const featured: Review[] = siteOnes
    .filter((item): item is StoredReview & { rating: 5 | 4 } => item.rating >= 4)
    .map(({ id, name, text, rating }) => ({ id, name, text, rating }));

  const seen = new Set(featured.map((item) => item.text.trim().toLowerCase()));
  const curated = curatedReviews.filter((item) => !seen.has(item.text.trim().toLowerCase()));
  return [...featured, ...curated].slice(0, 8);
}

export async function createSiteReview(input: {
  name: string;
  text: string;
  rating: number;
}): Promise<StoredReview> {
  const name = sanitizePlainText(input.name, 60);
  const text = sanitizePlainText(input.text, 480);
  const rating = clampRating(input.rating);

  if (name.length < 2) throw new Error("Escribe tu nombre.");
  if (text.length < 8) throw new Error("Cuéntanos un poco más (mínimo 8 caracteres).");
  if (rating < 1 || rating > 5) throw new Error("Elige de 1 a 5 estrellas.");
  if (looksLikeScriptInjection(`${name} ${text}`)) {
    throw new Error("Contenido no permitido.");
  }

  const review: StoredReview = {
    id: randomUUID(),
    name,
    text,
    rating,
    createdAt: new Date().toISOString(),
    source: "site",
  };

  // Moderación: no se publican solas en home hasta marcar published=true en DB.
  const publishImmediately = process.env.SITE_REVIEWS_AUTO_PUBLISH === "true";

  const sql = getSql();
  if (sql) {
    try {
      await sql`
        insert into site_reviews (id, name, text, rating, published, created_at)
        values (${review.id}, ${review.name}, ${review.text}, ${review.rating}, ${publishImmediately}, ${review.createdAt}::timestamptz)
      `;
      return review;
    } catch {
      // fallback local
    }
  }

  const store = await readLocal();
  if (publishImmediately) {
    store.reviews.unshift(review);
    await writeLocal({ reviews: store.reviews.slice(0, 200) });
  }
  return review;
}
