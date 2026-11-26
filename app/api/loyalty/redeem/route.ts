import { NextResponse } from "next/server";
import { applyRedeem } from "@/lib/loyalty/actions";
import { getSession } from "@/lib/loyalty/session";
import { enforceRateLimit, jsonError, readJsonBody } from "@/lib/security/request";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "loyalty-redeem", 12, 10 * 60_000);
  if (limited) return limited;

  const session = await getSession();
  if (!session) {
    return jsonError("Entra a tu cuenta para canjear.", 401, { needsAuth: true });
  }

  const body = await readJsonBody<{ token?: string }>(request);
  if (body instanceof NextResponse) return body;

  const result = await applyRedeem({ customerId: session.customerId, token: body.token ?? "" });
  if (!result.ok) return jsonError(result.error, 400);
  return NextResponse.json({ ok: true });
}
