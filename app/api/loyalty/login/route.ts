import { NextResponse } from "next/server";
import { loginCustomer } from "@/lib/loyalty/actions";
import { createSessionToken, setSessionCookie } from "@/lib/loyalty/session";
import { enforceRateLimit, jsonError, readJsonBody } from "@/lib/security/request";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "loyalty-login", 12, 15 * 60_000);
  if (limited) return limited;

  const body = await readJsonBody<{ phone?: string; pin?: string }>(request);
  if (body instanceof NextResponse) return body;

  try {
    const result = await loginCustomer({
      phone: body.phone ?? "",
      pin: body.pin ?? "",
    });
    if (!result.ok) return jsonError(result.error, 400);

    const token = await createSessionToken({
      customerId: result.customerId,
      name: result.name,
      phone: result.phone,
    });
    await setSessionCookie(token);
    return NextResponse.json({ ok: true, name: result.name });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo entrar.";
    return jsonError(message, 500);
  }
}
