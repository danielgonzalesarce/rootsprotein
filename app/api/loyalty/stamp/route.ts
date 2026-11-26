import { NextResponse } from "next/server";
import { applyStamp } from "@/lib/loyalty/actions";
import { getSession } from "@/lib/loyalty/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Entra a tu cuenta para sumar el sello.", needsAuth: true }, { status: 401 });
  }
  const body = (await request.json()) as { token?: string };
  const result = await applyStamp({ customerId: session.customerId, token: body.token ?? "" });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true, stamps: result.stamps });
}
