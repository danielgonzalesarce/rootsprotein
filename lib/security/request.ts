import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { clientIp, rateLimit } from "@/lib/security/rate-limit";

export function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

/** Solo acepta JSON explícito (mitiga CSRF clásico por formularios HTML). */
export function assertJsonContentType(request: Request): NextResponse | null {
  const type = request.headers.get("content-type") ?? "";
  if (!type.toLowerCase().includes("application/json")) {
    return jsonError("Content-Type inválido.", 415);
  }
  return null;
}

export async function readJsonBody<T>(request: Request): Promise<T | NextResponse> {
  const badType = assertJsonContentType(request);
  if (badType) return badType;

  try {
    return (await request.json()) as T;
  } catch {
    return jsonError("JSON inválido.", 400);
  }
}

export function enforceRateLimit(
  request: Request,
  bucket: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const result = rateLimit(`${bucket}:${clientIp(request)}`, limit, windowMs);
  if (result.ok) return null;
  return NextResponse.json(
    { error: "Demasiados intentos. Espera un momento." },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfterSec) },
    },
  );
}

/** Evita host header injection al armar URLs públicas (QR). */
export function safePublicOrigin(request: Request): string {
  const requestUrl = new URL(request.url);
  const candidates = [
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim(),
    request.headers.get("host")?.trim(),
    requestUrl.host,
  ].filter(Boolean) as string[];

  for (const host of candidates) {
    if (isAllowedHost(host)) {
      const proto =
        request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
        (requestUrl.protocol === "https:" ? "https" : "http");
      const safeProto = isProductionLike() ? "https" : proto === "https" ? "https" : "http";
      return `${safeProto}://${host}`;
    }
  }

  return site.siteUrl;
}

function isProductionLike(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

function isAllowedHost(host: string): boolean {
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";
  if (!hostname || hostname.includes("/") || hostname.includes("\\")) return false;

  try {
    const siteHost = new URL(site.siteUrl).hostname.toLowerCase();
    if (hostname === siteHost) return true;
  } catch {
    // ignore
  }

  if (hostname.endsWith(".vercel.app")) return true;
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(hostname)) return true;

  return false;
}
