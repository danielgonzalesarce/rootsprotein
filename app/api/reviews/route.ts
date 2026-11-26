import { NextResponse } from "next/server";
import { createSiteReview, listSiteReviews } from "@/lib/reviews/store";

export async function GET() {
  const reviews = await listSiteReviews();
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      text?: string;
      rating?: number;
      website?: string; // honeypot
    };

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const review = await createSiteReview({
      name: body.name ?? "",
      text: body.text ?? "",
      rating: Number(body.rating ?? 0),
    });

    return NextResponse.json({ review });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo guardar la reseña.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
