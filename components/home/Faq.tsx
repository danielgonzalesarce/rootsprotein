"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Chapter } from "@/components/home/Chapter";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { categories } from "@/data/menu";
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
      q: "¿Dónde están?",
      a: site.addressReference
        ? `${site.streetAddress}, ${site.district}. ${site.addressReference}`
        : `${site.streetAddress}, ${site.district}`,
    },
  ];

  const [open, setOpen] = useState<string | null>(null);

  return (
    <Chapter surface="avena" tone="light" curve="a">
      <SectionTitle>Preguntas frecuentes</SectionTitle>
      <div className="mt-8 max-w-[62ch] border-b border-savia/20">
        {items.map((item, index) => {
          const expanded = open === item.q;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={item.q} className="border-t border-savia/20">
              <h3>
                <button
                  type="button"
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-[1.0625rem] font-medium"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : item.q)}
                >
                  {item.q}
                  <Plus aria-hidden="true" className={cn("h-5 w-5 shrink-0", expanded && "rotate-45")} strokeWidth={1.5} />
                </button>
              </h3>
              {expanded ? (
                <div id={panelId} role="region" className="pb-4">
                  {item.a}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Chapter>
  );
}
