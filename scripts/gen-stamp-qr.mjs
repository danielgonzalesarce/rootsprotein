import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import QRCode from "qrcode";

const ENV_KEY = "LOYALTY_STATIC_STAMP_TOKEN";
const siteUrl = "https://rootsprotein.vercel.app";

function readEnvLocal() {
  if (!existsSync(".env.local")) return "";
  return readFileSync(".env.local", "utf8");
}

function getExistingToken(text) {
  const match = text.match(new RegExp(`^${ENV_KEY}=(.+)$`, "m"));
  if (!match) return null;
  let value = match[1].trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value.length >= 16 ? value : null;
}

const envText = readEnvLocal();
let token = getExistingToken(envText);
if (!token) {
  token = randomBytes(24).toString("base64url");
  const line = `\n# QR de sello imprimible (sin caducidad) — copiar también a Vercel\n${ENV_KEY}=${token}\n`;
  writeFileSync(".env.local", `${envText.trimEnd()}${line}`, "utf8");
  console.log("added_to_env_local");
} else {
  console.log("reused_env_local_token");
}

mkdirSync(".secrets", { recursive: true });
writeFileSync(
  ".secrets/static-stamp-token.txt",
  [
    "Pega esto en Vercel → Settings → Environment Variables:",
    "",
    `${ENV_KEY}=${token}`,
    "",
    `URL del QR: ${siteUrl}/sello?t=${token}`,
    "",
  ].join("\n"),
  "utf8",
);

const url = `${siteUrl}/sello?t=${encodeURIComponent(token)}`;
await QRCode.toFile("public/qr-sello-print.png", url, {
  width: 1024,
  margin: 2,
  color: { dark: "#1a2a16", light: "#ffffff" },
});
await QRCode.toFile("public/qr-sello.png", url, {
  width: 1024,
  margin: 2,
  color: { dark: "#1a2a16", light: "#00000000" },
});

for (const file of ["public/qr-local-sello.png", "public/qr-rootsprotein.png", "public/qr-rootsprotein.svg", "public/qr-rootsprotein-print.png"]) {
  try {
    unlinkSync(file);
  } catch {
    /* ignore */
  }
}

console.log("ok");
console.log("png", "public/qr-sello-print.png");
console.log("vercel_secret_file", ".secrets/static-stamp-token.txt");
