import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { loyalty } from "@/data/loyalty";

export type SessionPayload = {
  customerId: string;
  phone: string;
  name: string;
};

function secretKey(): Uint8Array {
  const secret = process.env.LOYALTY_SECRET ?? "roots-dev-loyalty-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ phone: payload.phone, name: payload.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.customerId)
    .setIssuedAt()
    .setExpirationTime(`${loyalty.sessionDays}d`)
    .sign(secretKey());
}

export async function readSessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub || typeof payload.phone !== "string" || typeof payload.name !== "string") return null;
    return {
      customerId: payload.sub,
      phone: payload.phone,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(loyalty.cookieName)?.value;
  if (!token) return null;
  return readSessionToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(loyalty.cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: loyalty.sessionDays * 24 * 60 * 60,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(loyalty.cookieName);
}
