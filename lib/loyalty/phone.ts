/** Normaliza un WhatsApp peruano a dígitos internacionales (51…). */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("9")) return `51${digits}`;
  if (digits.length === 11 && digits.startsWith("51") && digits[2] === "9") return digits;
  if (digits.length === 12 && digits.startsWith("051")) return digits.slice(1);
  return null;
}

export function formatPhoneDisplay(phone: string): string {
  if (phone.length === 11 && phone.startsWith("51")) {
    const local = phone.slice(2);
    return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  return phone;
}
