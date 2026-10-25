import { site } from "@/data/site";
import { formatOrderMoney } from "@/lib/format";

const INFO_MESSAGE = "Hola 👋 Quiero hacer un pedido en Roots Protein Bar.";

function whatsAppUrl(message: string): string {
  // wa.me reescribe el texto y rompe los emojis. El enlace directo los conserva.
  return `https://api.whatsapp.com/send?phone=${site.whatsappNumber}&text=${encodeURIComponent(message)}`;
}

export function infoWhatsAppUrl(): string {
  return whatsAppUrl(INFO_MESSAGE);
}

export type OrderLine = {
  quantity: number;
  name: string;
  variantLabel: string;
  unitPrice: number;
  addonOption?: string;
  addonPrice: number;
  note: string;
};

export type OrderDraft = {
  code: string;
  lines: OrderLine[];
  subtotal: number;
  mode: "Recojo en local" | "Delivery";
  name: string;
  timeLabel: string;
  address: string;
  reference: string;
  notes: string;
  payment: string;
  cashAmount: number | null;
};

function itemBlock(line: OrderLine): string[] {
  const variant = line.variantLabel !== "Único" ? ` (${line.variantLabel})` : "";
  const total = line.unitPrice * line.quantity;
  const each = line.quantity > 1 ? ` (${formatOrderMoney(line.unitPrice)} c/u)` : "";
  const rows = [`• ${line.quantity} × ${line.name}${variant} — ${formatOrderMoney(total)}${each}`];
  if (line.addonOption) {
    const addonTotal = line.addonPrice * line.quantity;
    const addonEach = line.quantity > 1 ? ` (${formatOrderMoney(line.addonPrice)} c/u)` : "";
    const addonQty = line.quantity > 1 ? `${line.quantity} × ` : "";
    rows.push(`  + ${addonQty}Bubble tea ${line.addonOption} — ${formatOrderMoney(addonTotal)}${addonEach}`);
  }
  if (line.note.trim()) rows.push(`  Nota: ${line.note.trim()}`);
  return rows;
}

export function buildOrderMessage(order: OrderDraft): string {
  const pickup = order.mode === "Recojo en local";
  const rows = [
    "Hola 👋, quisiera hacer el siguiente pedido:",
    "",
    `🧇 *PEDIDO #${order.code}*`,
    "",
    `👤 *Cliente:* ${order.name}`,
    `📍 *Modalidad:* ${order.mode}`,
    `🕒 *${pickup ? "Hora de recojo" : "Hora de entrega"}:* ${order.timeLabel}`,
  ];

  if (!pickup) {
    rows.push(`🏠 *Dirección:* ${order.address}`);
    if (order.reference) rows.push(`📌 *Referencia:* ${order.reference}`);
  }

  rows.push(
    "",
    "*Detalle del pedido*",
    ...order.lines.flatMap((line) => itemBlock(line)),
    "",
    `💰 *Total a pagar: ${formatOrderMoney(order.subtotal)}*`,
    `💳 *Pago:* ${order.payment}`,
    ...(order.payment === "Efectivo" && order.cashAmount !== null
      ? [
          `💵 *Paga con:* ${formatOrderMoney(order.cashAmount)}`,
          ...(pickup
            ? [`🔁 *Vuelto:* ${formatOrderMoney(Math.round((order.cashAmount - order.subtotal) * 100) / 100)}`]
            : []),
        ]
      : []),
    `📝 *Notas:* ${order.notes.trim() || "Sin indicaciones"}`,
    "",
    "¿Me confirman mi pedido, por favor? 🙏",
  );

  if (!pickup) rows.push("¿Hay cobertura y cuánto cuesta el envío? 💬");
  return rows.join("\n");
}

export function orderWhatsAppUrl(message: string): string {
  return whatsAppUrl(message);
}
