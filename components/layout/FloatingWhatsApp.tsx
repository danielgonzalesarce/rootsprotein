"use client";

import { useEffect, useState } from "react";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Hojas } from "@/components/illustrations/Hojas";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart";

const VISIBLE_MS = 5200;
const CYCLE_MS = 9000;

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

    const start = setTimeout(show, 1400);
    const interval = setInterval(show, CYCLE_MS);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [cartOpen]);

  if (cartOpen) return null;

  const href = infoWhatsAppUrl();

  return (
    <div className="fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={!showPrompt}
        tabIndex={showPrompt ? 0 : -1}
        className={cn(
          "wa-bubble group relative mr-1 w-[min(16.5rem,calc(100vw-5.5rem))] origin-bottom-right rounded-[1.35rem] bg-gradient-to-br from-avena via-avena to-salvia px-4 pb-3.5 pt-3.5 text-left text-savia shadow-[0_18px_40px_-16px_rgba(26,42,22,0.45)] ring-1 ring-white/70 transition-all duration-500 sm:mr-1.5 sm:w-[17.5rem] sm:px-5 sm:pb-4 sm:pt-4",
          showPrompt
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-[0.92] opacity-0",
        )}
        onClick={() => track("click_whatsapp")}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 top-3 h-10 w-10 rounded-full bg-hoja/15 blur-xl"
        />
        <Hojas className="pointer-events-none absolute -right-1 -top-2 h-5 w-8 rotate-12 text-hoja opacity-80" />

        <p className="relative font-display text-[1.2rem] leading-[1.15] tracking-[-0.035em] sm:text-[1.28rem]">
          ¿Qué se te antoja hoy?
        </p>
        <p className="relative mt-1.5 text-[0.8rem] leading-snug text-tinta/55 sm:text-[0.85rem]">
          Waffles, frappés y más · te respondemos al toque
        </p>

        <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-savia px-3 py-1.5 text-[0.72rem] font-medium text-avena transition group-hover:bg-hoja">
          <WhatsAppGlyph className="h-3.5 w-3.5" />
          Escribir ahora
        </span>

        {/* Cola hacia el botón */}
        <span
          aria-hidden="true"
          className="absolute -bottom-2 right-5 h-3.5 w-3.5 rotate-45 bg-avena ring-1 ring-white/40 sm:right-6"
        />
      </a>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        className="wa-fab relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_32px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 sm:h-14 sm:w-14"
        onClick={() => track("click_whatsapp")}
      >
        <span
          aria-hidden="true"
          className="wa-fab-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/40"
        />
        <WhatsAppGlyph className="relative h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
