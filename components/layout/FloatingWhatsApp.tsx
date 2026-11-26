"use client";

import { useEffect, useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { track } from "@/lib/analytics";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart";

const PROMPT = "¿Listo para pedir? Escríbenos";
const CYCLE_MS = 5000;
const VISIBLE_MS = 3500;

export function FloatingWhatsApp() {
  const cartOpen = useCartStore((state) => state.isOpen);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (cartOpen) {
      setShowPrompt(false);
      return;
    }

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const preferReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = () => {
      setShowPrompt(true);
      hideTimer = setTimeout(() => setShowPrompt(false), preferReduce ? CYCLE_MS : VISIBLE_MS);
    };

    const start = setTimeout(show, 1200);
    const interval = setInterval(show, CYCLE_MS);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [cartOpen]);

  if (cartOpen) return null;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5">
      <div
        className={`max-w-[11.5rem] origin-bottom-right rounded-2xl rounded-br-md bg-white px-3 py-2.5 text-xs leading-snug text-savia shadow-[0_12px_28px_rgba(26,42,22,0.18)] ring-1 ring-savia/8 transition-all duration-300 sm:max-w-[15rem] sm:px-4 sm:py-3 sm:text-sm ${
          showPrompt ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {PROMPT}
      </div>
      <a
        href={infoWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 sm:h-14 sm:w-14"
        onClick={() => track("click_whatsapp")}
      >
        <WhatsAppGlyph className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
