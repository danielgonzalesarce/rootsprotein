/** Quita etiquetas HTML y caracteres de control para evitar XSS / inyección en texto de usuarios. */
export function sanitizePlainText(input: string, maxLength: number): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function looksLikeScriptInjection(input: string): boolean {
  const value = input.toLowerCase();
  return (
    value.includes("<script") ||
    value.includes("javascript:") ||
    value.includes("onerror=") ||
    value.includes("onload=") ||
    value.includes("data:text/html")
  );
}
