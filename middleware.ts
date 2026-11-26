import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_PREFIXES = [
  "/.env",
  "/.git",
  "/.data",
  "/node_modules",
  "/wp-admin",
  "/wp-login",
  "/phpmyadmin",
  "/xmlrpc.php",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();

  if (BLOCKED_PREFIXES.some((prefix) => lower === prefix || lower.startsWith(`${prefix}/`))) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (lower.includes("..") || lower.includes("%2e%2e")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"],
};
