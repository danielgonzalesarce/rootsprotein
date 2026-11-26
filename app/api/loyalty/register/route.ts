import { NextResponse } from "next/server";
import { registerCustomer } from "@/lib/loyalty/actions";
import { createSessionToken, setSessionCookie } from "@/lib/loyalty/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; phone?: string; pin?: string };
  const result = await registerCustomer({
    name: body.name ?? "",
    phone: body.phone ?? "",
    pin: body.pin ?? "",
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  const token = await createSessionToken({
    customerId: result.customerId,
    name: result.name,
    phone: result.phone,
  });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true, name: result.name });
}
