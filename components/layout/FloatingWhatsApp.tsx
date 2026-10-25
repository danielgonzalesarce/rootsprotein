"use client";

import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { track } from "@/lib/analytics";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart";

export function FloatingWhatsApp() {
  const cartOpen = useCartStore((state) => state.isOpen);
  if (cartOpen) return null;

  return (
    <a
      href={infoWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-hoja text-white shadow-[0_12px_28px_rgba(74,102,48,0.35)]"
      onClick={() => track("click_whatsapp")}
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}
