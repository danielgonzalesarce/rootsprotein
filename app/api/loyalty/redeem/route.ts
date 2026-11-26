import { NextResponse } from "next/server";
import { applyRedeem } from "@/lib/loyalty/actions";
import { getSession } from "@/lib/loyalty/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Entra a tu cuenta para canjear.", needsAuth: true }, { status: 401 });
  }
  const body = (await request.json()) as { token?: string };
  const result = await applyRedeem({ customerId: session.customerId, token: body.token ?? "" });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
