import { createHmac, timingSafeEqual } from "node:crypto";
import { loyalty } from "@/data/loyalty";
import { loyaltyQrSecret } from "@/lib/security/secrets";

export type QrKind = "stamp" | "redeem";

type TokenPayload = {
  kind: QrKind;
  exp?: number;
  /** Solo sellos: QR imprimible sin caducidad. */
  forever?: boolean;
};

function secret(): string {
  return loyaltyQrSecret();
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
    if (payload.forever === true) {
      if (payload.kind !== "stamp") return null;
      return { kind: "stamp", forever: true };
    }
    if (typeof payload.exp !== "number") return null;
    return payload;
  } catch {
    return null;
  }
}

function staticStampToken(): string | null {
  const value = process.env.LOYALTY_STATIC_STAMP_TOKEN?.trim();
  if (!value || value.length < 16) return null;
  return value;
}

function matchesStaticStampToken(token: string): boolean {
  const expected = staticStampToken();
  if (!expected) return false;
  const left = Buffer.from(token);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  try {
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function createQrToken(
  kind: QrKind,
  ttlMinutes = loyalty.qrTtlMinutes,
): { token: string; expiresAt: string } {
  const exp = Date.now() + ttlMinutes * 60_000;
  return { token: encode({ kind, exp }), expiresAt: new Date(exp).toISOString() };
}

/** QR de sello para imprimir: no caduca. Requiere el mismo LOYALTY_QR_SECRET en el servidor. */
export function createPermanentStampToken(): { token: string; expiresAt: null } {
  return { token: encode({ kind: "stamp", forever: true }), expiresAt: null };
}

export function verifyQrToken(
  token: string,
  kind: QrKind,
  now = Date.now(),
): { ok: true } | { ok: false; error: string } {
  if (kind === "stamp" && matchesStaticStampToken(token)) {
    return { ok: true };
  }

  const payload = decode(token);
  if (!payload) return { ok: false, error: "Este código QR no es válido." };
  if (payload.kind !== kind) {
    return { ok: false, error: kind === "stamp" ? "Este QR no es para sellar." : "Este QR no es para canjear." };
  }
  if (payload.forever) return { ok: true };
  if (typeof payload.exp !== "number" || now > payload.exp) {
    return { ok: false, error: "Este código QR ya venció. Pide uno nuevo en el local." };
  }
  return { ok: true };
}
