const base = process.env.BASE_URL ?? "http://localhost:3000";

const jar = new Map();
function remember(response) {
  for (const cookie of response.headers.getSetCookie?.() ?? []) {
    const [pair] = cookie.split(";");
    const [name, ...rest] = pair.split("=");
    jar.set(name, rest.join("="));
  }
}
const cookieHeader = () => [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");

const phone = `9${String(Date.now()).slice(-8)}`;

const register = await fetch(`${base}/api/loyalty/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Neon Test", phone, pin: "1234" }),
});
remember(register);
const registerJson = await register.json();
console.log("register", register.status, registerJson);
if (!register.ok) process.exit(1);

const me = await fetch(`${base}/api/loyalty/me`, { headers: { Cookie: cookieHeader() } });
const meJson = await me.json();
console.log("me", me.status, { stamps: meJson.stamps, phone: meJson.phone });
if (!me.ok) process.exit(1);

const qr = await fetch(`${base}/api/loyalty/local-qr`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password: process.env.LOCAL_QR_PASSWORD ?? "roots-local", kind: "stamp" }),
});
const qrJson = await qr.json();
console.log("qr", qr.status, Boolean(qrJson.qrDataUrl));
if (!qr.ok) process.exit(1);

const token = new URL(qrJson.url).searchParams.get("t");
const stamp = await fetch(`${base}/api/loyalty/stamp`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Cookie: cookieHeader() },
  body: JSON.stringify({ token }),
});
const stampJson = await stamp.json();
console.log("stamp", stamp.status, stampJson);
if (!stamp.ok) process.exit(1);

console.log("OK neon loyalty e2e");
process.exit(0);
