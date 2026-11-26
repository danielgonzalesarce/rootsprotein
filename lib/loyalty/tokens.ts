import { createHmac, timingSafeEqual } from "node:crypto";
import { loyalty } from "@/data/loyalty";

export type QrKind = "stamp" | "redeem";

type TokenPayload = {
  kind: QrKind;
  exp: number;
};

function secret(): string {
  const value = process.env.LOYALTY_QR_SECRET ?? process.env.LOYALTY_SECRET;
  if (!value) {
    // Solo para desarrollo local sin .env; en producción debe configurarse.
    return "roots-dev-qr-secret-change-me";
  }
  return value;
}

function encode(payload: TokenPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function decode(token: string): TokenPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as TokenPayload;
    if (payload.kind !== "stamp" && payload.kind !== "redeem") return null;
    if (typeof payload.exp !== "number") return null;
    return payload;
  } catch {
    return null;
  }
}

export function createQrToken(kind: QrKind, ttlMinutes = loyalty.qrTtlMinutes): { token: string; expiresAt: string } {
  const exp = Date.now() + ttlMinutes * 60_000;
  return { token: encode({ kind, exp }), expiresAt: new Date(exp).toISOString() };
}

export function verifyQrToken(
  token: string,
  kind: QrKind,
  now = Date.now(),
): { ok: true } | { ok: false; error: string } {
  const payload = decode(token);
  if (!payload) return { ok: false, error: "Este código QR no es válido." };
  if (payload.kind !== kind) {
    return { ok: false, error: kind === "stamp" ? "Este QR no es para sellar." : "Este QR no es para canjear." };
  }
  if (now > payload.exp) return { ok: false, error: "Este código QR ya venció. Pide uno nuevo en el local." };
  return { ok: true };
}
