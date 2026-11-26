import { compare, hash } from "bcryptjs";

export async function hashPin(pin: string): Promise<string> {
  return hash(pin, 10);
}

export async function verifyPin(pin: string, pinHash: string): Promise<boolean> {
  return compare(pin, pinHash);
}

export function isValidPin(pin: string): boolean {
  return /^\d{4,6}$/.test(pin);
}
