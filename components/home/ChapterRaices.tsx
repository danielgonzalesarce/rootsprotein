"use client";

import { useEffect, useRef, useState } from "react";
import { Chapter } from "@/components/home/Chapter";
import { StampMark } from "@/components/loyalty/StampMark";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { loyalty } from "@/data/loyalty";
import { cn } from "@/lib/cn";

const PREVIEW_TARGET = 3;

const steps = [
  { n: "01", text: "Pide en el local" },
  { n: "02", text: "Escanea el QR" },
  { n: "03", text: `Junta ${loyalty.stampsNeeded} y canjea` },
];

export function ChapterRaices() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      setStarted((already) => {
        if (already) return already;
        if (reduce) {
          setFilled(PREVIEW_TARGET);
          return true;
        }
        let current = 0;
        const tick = () => {
          current += 1;
          setFilled(current);
          if (current < PREVIEW_TARGET) window.setTimeout(tick, 320);
        };
        window.setTimeout(tick, 180);
        return true;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Chapter surface="savia" tone="dark" className="overflow-hidden">
      <div ref={ref} className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div
          className="pointer-events-none absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-hoja/20 blur-3xl lg:left-auto lg:right-8 lg:top-[42%]"
          aria-hidden="true"
        />

        <div className="relative max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-salvia/75">{loyalty.name}</p>
          <SectionTitle className="mt-4 text-avena">Colecciona raíces</SectionTitle>
          <p className="mt-4 max-w-[34ch] text-lg leading-relaxed text-avena/70">
            Cada visita suma un sello. Con {loyalty.stampsNeeded} ganas {loyalty.prizeLabel}.
          </p>

          <ol className="mt-9 border-t border-avena/15">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[minmax(2.5rem,auto)_minmax(0,1fr)] gap-4 border-b border-avena/15 py-4"
              >
                <span className="nums pt-0.5 text-sm tracking-wide text-hoja">{step.n}</span>
                <p className="text-[1.05rem] text-avena/85">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9">
            <Button href="/cuenta" surface="dark">
              Ver mis sellos
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end">
          <div className="flex items-end justify-between gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-salvia/60">Tu progreso</p>
            <p className="nums font-display text-4xl tracking-[-0.04em] text-avena sm:text-5xl">
              {filled}
              <span className="text-avena/35">/{loyalty.stampsNeeded}</span>
            </p>
          </div>

          <ul
            className="mt-6 grid grid-cols-4 gap-3 sm:gap-5"
            aria-label={`Vista previa: ${filled} de ${loyalty.stampsNeeded} sellos`}
          >
            {Array.from({ length: loyalty.stampsNeeded }, (_, index) => (
              <li key={index} className="grid place-items-center">
                <StampMark
                  filled={index < filled}
                  pop={index < filled && started}
                  className={cn("max-w-[6.75rem] sm:max-w-[8rem]")}
                />
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-avena/45">
            Vista previa · al entrar a Mis sellos ves los tuyos
          </p>
        </div>
      </div>
    </Chapter>
  );
}
