const WEAK_DEFAULTS = new Set([
  "roots-dev-loyalty-secret-change-me",
  "roots-dev-qr-secret-change-me",
  "roots-local",
  "cambia-esta-clave-larga",
  "cambia-esta-otra-clave",
]);

export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

function readRequiredSecret(name: string, fallbackDev: string): string {
  const value = process.env[name]?.trim();
  if (value && !WEAK_DEFAULTS.has(value) && value.length >= 16) {
    return value;
  }

  if (isProductionRuntime()) {
    throw new Error(
      `[security] Configura ${name} en Vercel (mín. 16 caracteres, no uses el valor de ejemplo).`,
    );
  }

  if (value && value.length >= 8) return value;
  return fallbackDev;
}

export function loyaltySessionSecret(): string {
  return readRequiredSecret("LOYALTY_SECRET", "roots-dev-loyalty-secret-change-me");
}

export function loyaltyQrSecret(): string {
  const qr = process.env.LOYALTY_QR_SECRET?.trim();
  if (qr && !WEAK_DEFAULTS.has(qr) && qr.length >= 16) return qr;
  if (qr && !isProductionRuntime() && qr.length >= 8) return qr;
  return loyaltySessionSecret();
}

export function localQrPassword(): string {
  const value = process.env.LOCAL_QR_PASSWORD?.trim();
  if (value && !WEAK_DEFAULTS.has(value) && value.length >= 8) return value;

  if (isProductionRuntime()) {
    throw new Error("[security] Configura LOCAL_QR_PASSWORD fuerte en Vercel (mín. 8 caracteres).");
  }

  return value && value.length >= 4 ? value : "roots-local";
}
