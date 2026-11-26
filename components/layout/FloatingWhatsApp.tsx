"use client";

import { useEffect, useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { track } from "@/lib/analytics";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart";

const PROMPTS = [
  "¿Antojo de waffle o frappé? Te atendemos aquí.",
  "Pide por WhatsApp · Santa Anita",
];
const CYCLE_MS = 6200;
const VISIBLE_MS = 4200;

export function FloatingWhatsApp() {
  const cartOpen = useCartStore((state) => state.isOpen);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);

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
      setPromptIndex((current) => (current + 1) % PROMPTS.length);
      setShowPrompt(true);
      hideTimer = setTimeout(() => setShowPrompt(false), preferReduce ? CYCLE_MS : VISIBLE_MS);
    };

    const start = setTimeout(show, 1600);
    const interval = setInterval(show, CYCLE_MS);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [cartOpen]);

  if (cartOpen) return null;

  const href = infoWhatsAppUrl();
  const prompt = PROMPTS[promptIndex] ?? PROMPTS[0];

  return (
    <div className="fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`max-w-[13.5rem] origin-bottom-right rounded-[1.15rem] rounded-br-md bg-avena px-3.5 py-2.5 text-left text-[0.8rem] leading-snug text-savia shadow-[0_14px_32px_rgba(26,42,22,0.22)] ring-1 ring-savia/10 transition-all duration-300 sm:max-w-[16rem] sm:px-4 sm:py-3 sm:text-[0.88rem] ${
          showPrompt
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
        onClick={() => track("click_whatsapp")}
      >
        <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-hoja">
          WhatsApp
        </span>
        <span className="mt-1 block">{prompt}</span>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 sm:h-14 sm:w-14"
        onClick={() => track("click_whatsapp")}
      >
        <WhatsAppGlyph className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
