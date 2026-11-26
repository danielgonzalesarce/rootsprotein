import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { checkLocalPassword } from "@/lib/loyalty/actions";
import { createQrToken, type QrKind } from "@/lib/loyalty/tokens";
import { enforceRateLimit, jsonError, readJsonBody, safePublicOrigin } from "@/lib/security/request";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "local-qr", 30, 10 * 60_000);
  if (limited) return limited;

  const body = await readJsonBody<{ password?: string; kind?: QrKind }>(request);
  if (body instanceof NextResponse) return body;

  try {
    if (!checkLocalPassword(body.password ?? "")) {
      return jsonError("Clave incorrecta.", 401);
    }

    const kind = body.kind === "redeem" ? "redeem" : "stamp";
    const { token, expiresAt } = createQrToken(kind);
    const path =
      kind === "stamp" ? `/sello?t=${encodeURIComponent(token)}` : `/canje?t=${encodeURIComponent(token)}`;
    const url = `${safePublicOrigin(request)}${path}`;
    const qrDataUrl = await QRCode.toDataURL(url, {
      margin: 1,
      width: 480,
      color: { dark: "#24381c", light: "#ffffff" },
    });
    return NextResponse.json({ ok: true, kind, url, expiresAt, qrDataUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo generar el QR.";
    return jsonError(message, 500);
  }
}
