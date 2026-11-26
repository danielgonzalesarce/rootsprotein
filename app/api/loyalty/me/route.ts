import { NextResponse } from "next/server";
import { buildAccountView } from "@/lib/loyalty/actions";
import { getSession } from "@/lib/loyalty/session";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No hay sesión." }, { status: 401 });
  const account = await buildAccountView(session.customerId, session.name, session.phone);
  return NextResponse.json(account);
}
