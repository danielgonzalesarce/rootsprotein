import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import type { Review } from "@/data/reviews";
import { reviews as curatedReviews } from "@/data/reviews";

export type StoredReview = Review & {
  createdAt: string;
  source: "site";
};

type StoreData = { reviews: StoredReview[] };

function localPath() {
  return path.join(process.cwd(), ".data", "site-reviews.json");
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
  const file = localPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

function getSql() {
  const url = process.env.DATABASE_URL?.trim();
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
  const featured = siteOnes
    .filter((item) => item.rating >= 4)
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
  const name = input.name.trim().slice(0, 60);
  const text = input.text.trim().slice(0, 480);
  const rating = clampRating(input.rating);

  if (name.length < 2) throw new Error("Escribe tu nombre.");
  if (text.length < 8) throw new Error("Cuéntanos un poco más (mínimo 8 caracteres).");
  if (rating < 1 || rating > 5) throw new Error("Elige de 1 a 5 estrellas.");

  const review: StoredReview = {
    id: randomUUID(),
    name,
    text,
    rating,
    createdAt: new Date().toISOString(),
    source: "site",
  };

  const sql = getSql();
  if (sql) {
    try {
      await sql`
        insert into site_reviews (id, name, text, rating, published, created_at)
        values (${review.id}, ${review.name}, ${review.text}, ${review.rating}, true, ${review.createdAt}::timestamptz)
      `;
      return review;
    } catch {
      // fallback local
    }
  }

  const store = await readLocal();
  store.reviews.unshift(review);
  await writeLocal({ reviews: store.reviews.slice(0, 200) });
  return review;
}
