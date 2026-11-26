import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { site } from "@/data/site";
import { checkLocalPassword } from "@/lib/loyalty/actions";
import { createQrToken, type QrKind } from "@/lib/loyalty/tokens";

/** Usa el host con el que abriste /local/qr (p. ej. IP Wi‑Fi) para que el celular pueda escanear. */
function publicOrigin(request: Request): string {
  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwardedHost) {
    const proto = forwardedProto ?? (requestUrl.protocol === "https:" ? "https" : "http");
    return `${proto}://${forwardedHost}`;
  }
  if (requestUrl.hostname !== "localhost" && requestUrl.hostname !== "127.0.0.1") {
    return requestUrl.origin;
  }
  return site.siteUrl;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string; kind?: QrKind };
  if (!checkLocalPassword(body.password ?? "")) {
    return NextResponse.json({ error: "Clave incorrecta." }, { status: 401 });
  }
  const kind = body.kind === "redeem" ? "redeem" : "stamp";
  const { token, expiresAt } = createQrToken(kind);
  const path = kind === "stamp" ? `/sello?t=${encodeURIComponent(token)}` : `/canje?t=${encodeURIComponent(token)}`;
  const url = `${publicOrigin(request)}${path}`;
  const qrDataUrl = await QRCode.toDataURL(url, {
    margin: 1,
    width: 480,
    color: { dark: "#24381c", light: "#ffffff" },
  });
  return NextResponse.json({ ok: true, kind, url, expiresAt, qrDataUrl });
}
