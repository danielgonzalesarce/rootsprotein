import { NextResponse } from "next/server";
import { createSiteReview, listSiteReviews } from "@/lib/reviews/store";
import { looksLikeScriptInjection, sanitizePlainText } from "@/lib/security/sanitize";
import { enforceRateLimit, jsonError, readJsonBody } from "@/lib/security/request";

export async function GET(request: Request) {
  const limited = enforceRateLimit(request, "reviews-get", 60, 60_000);
  if (limited) return limited;

  const reviews = await listSiteReviews();
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "reviews-post", 5, 15 * 60_000);
  if (limited) return limited;

  const body = await readJsonBody<{
    name?: string;
    text?: string;
    rating?: number;
    website?: string;
  }>(request);
  if (body instanceof NextResponse) return body;

  // Honeypot anti-bots
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitizePlainText(body.name ?? "", 60);
  const text = sanitizePlainText(body.text ?? "", 480);

  if (looksLikeScriptInjection(`${name} ${text}`)) {
    return jsonError("Contenido no permitido.", 400);
  }

  try {
    const review = await createSiteReview({
      name,
      text,
      rating: Number(body.rating ?? 0),
    });
    return NextResponse.json({ review });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo guardar la reseña.";
    return jsonError(message, 400);
  }
}
