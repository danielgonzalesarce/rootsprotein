import { NextResponse } from "next/server";
import { applyStamp } from "@/lib/loyalty/actions";
import { getSession } from "@/lib/loyalty/session";
import { enforceRateLimit, jsonError, readJsonBody } from "@/lib/security/request";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "loyalty-stamp", 20, 10 * 60_000);
  if (limited) return limited;

  const session = await getSession();
  if (!session) {
    return jsonError("Entra a tu cuenta para sumar el sello.", 401, { needsAuth: true });
  }

  const body = await readJsonBody<{ token?: string }>(request);
  if (body instanceof NextResponse) return body;

  const result = await applyStamp({ customerId: session.customerId, token: body.token ?? "" });
  if (!result.ok) return jsonError(result.error, 400);
  return NextResponse.json({ ok: true, stamps: result.stamps });
}
