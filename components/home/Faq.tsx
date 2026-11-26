"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Chapter } from "@/components/home/Chapter";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { loyalty } from "@/data/loyalty";
import { site } from "@/data/site";
import { categories } from "@/data/menu";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

function answerForProtein(): string {
  const dulces = categories.find((category) => category.id === "waffles-dulces")?.macros;
  const salados = categories.find((category) => category.id === "waffles-salados")?.macros;
  const frappes = categories.find((category) => category.id === "frappes")?.macros;
  const calientes = categories.find((category) => category.id === "bebidas-calientes")?.macros;
  if (!dulces || !salados || !frappes || !calientes) {
    return "Cada producto muestra sus macros en la carta.";
  }
  return `Según nuestra carta: waffles dulces ${dulces.protein} g, waffles salados ${salados.protein} g, frappés ${frappes.protein} g y bebidas calientes ${calientes.protein} g por porción. Cada producto muestra sus macros en la carta.`;
}

export function Faq() {
  const items = [
    {
      q: "¿Tienen delivery?",
      a: `Sí, pídelo por WhatsApp al ${site.whatsappDisplay}. La cobertura y el costo de envío se confirman por ese medio.`,
    },
    {
      q: "¿Cuánta proteína tienen los productos?",
      a: answerForProtein(),
    },
    {
      q: "¿Tienen azúcar, gluten o lactosa?",
      a: "Nuestra carta es alta en proteína y libre de gluten, lactosa y azúcar. Si tienes una alergia o condición médica, consúltanos antes de pedir.",
    },
    {
      q: "¿Tienen opciones saladas?",
      a: "Sí: waffles salados de base de queso (Cheese, Pizza, Americana, Peperoni y Hawaiana).",
    },
    ...(site.payments.length > 0
      ? [{ q: "¿Cómo puedo pagar?", a: `Aceptamos ${site.payments.join(", ")}.` }]
      : []),
    {
      q: `¿Qué es ${loyalty.name}?`,
      a: `Nuestro programa de sellos: cada visita suma 1 sello al escanear el QR del local. Con ${loyalty.stampsNeeded} sellos ganas ${loyalty.prizeLabel}. Crea tu cuenta en Mis sellos.`,
    },
    {
      q: "¿Dónde están?",
      a: site.addressReference
        ? `${site.streetAddress}, ${site.district}. ${site.addressReference}`
        : `${site.streetAddress}, ${site.district}`,
    },
  ];

  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);
  const listRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Chapter surface="salvia" tone="light">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 xl:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Dudas</p>
          <SectionTitle className="mt-3 max-w-[12ch]">Preguntas frecuentes</SectionTitle>
          <p className="mt-4 max-w-[32ch] text-lg leading-relaxed text-tinta/65">
            Lo esencial antes de pedir o pasar por el local.
          </p>
          <div className="mt-8">
            <Button href={infoWhatsAppUrl()} variant="line">
              Escríbenos
            </Button>
          </div>
        </div>

        <div ref={listRef} className="border-t border-savia/20">
          {items.map((item, index) => {
            const expanded = open === item.q;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={item.q}
                className={cn(
                  "faq-item group border-b border-savia/20",
                  visible && "faq-item--in",
                )}
                style={{ ["--faq-i" as string]: index }}
              >
                <h3>
                  <button
                    type="button"
                    className="grid w-full grid-cols-[minmax(2.25rem,auto)_minmax(0,1fr)_auto] items-start gap-3 py-5 text-left sm:gap-5 sm:py-6"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : item.q)}
                  >
                    <span className="nums pt-1 text-sm font-medium tracking-wide text-hoja transition-colors group-hover:text-savia">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative min-w-0">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -left-3 top-2 w-0.5 rounded-full bg-hoja transition-all duration-300 sm:-left-4",
                          expanded ? "h-[calc(100%-0.35rem)]" : "h-0 group-hover:h-5",
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-[1.28rem] leading-tight tracking-[-0.03em] text-savia transition-transform duration-300 sm:text-[1.45rem]",
                          expanded && "translate-x-0.5",
                        )}
                      >
                        {item.q}
                      </span>
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        "mt-1.5 h-5 w-5 shrink-0 text-hoja transition-transform duration-300",
                        expanded && "rotate-45",
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[48ch] pb-5 pl-0 pr-2 text-[0.98rem] leading-relaxed text-tinta/65 sm:pb-6 sm:pl-[calc(2.25rem+1.25rem)] sm:pr-8 sm:text-[1.02rem]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Chapter>
  );
}
