import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const curves = {
  a: "M0 80 L0 46 C160 72 250 6 440 30 C650 56 720 4 940 24 C1140 42 1260 74 1440 28 L1440 80 Z",
  b: "M0 80 L0 22 C110 6 270 68 470 34 C690 0 830 62 1050 28 C1230 6 1350 56 1440 38 L1440 80 Z",
  c: "M0 80 L0 56 C190 16 330 74 540 30 C760 0 880 68 1100 22 C1270 2 1370 48 1440 16 L1440 80 Z",
  d: "M0 80 L0 28 C100 64 260 4 430 36 C640 70 800 10 1000 42 C1190 70 1330 14 1440 46 L1440 80 Z",
  e: "M0 80 L0 48 C210 10 350 76 570 26 C820 0 950 60 1170 32 C1310 14 1390 58 1440 20 L1440 80 Z",
  f: "M0 80 L0 18 C150 50 310 6 490 40 C710 78 870 8 1090 34 C1290 56 1370 18 1440 42 L1440 80 Z",
} as const;

const fills = {
  avena: "text-avena",
  salvia: "text-salvia",
  hoja: "text-hoja",
  savia: "text-savia",
} as const;

export function ChapterCurve({
  variant,
  fill,
}: {
  variant: keyof typeof curves;
  fill: keyof typeof fills;
}) {
  return (
    <svg
      className={cn(
        "absolute inset-x-0 top-0 h-16 w-full -translate-y-[calc(100%-1px)] md:h-24",
        fills[fill],
      )}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d={curves[variant]} />
    </svg>
  );
}

export function Chapter({
  id,
  surface,
  tone,
  curve,
  children,
}: {
  id?: string;
  surface: "avena" | "salvia" | "hoja" | "savia";
  tone: "light" | "dark";
  curve?: keyof typeof curves;
  children: ReactNode;
}) {
  const bg = {
    avena: "bg-avena",
    salvia: "bg-salvia",
    hoja: "bg-hoja",
    savia: "bg-savia",
  }[surface];

  return (
    <section
      id={id}
      data-surface={tone}
      className={cn("relative", bg, tone === "dark" ? "text-avena on-dark" : "text-tinta")}
    >
      {curve ? <ChapterCurve variant={curve} fill={surface} /> : null}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-10 lg:py-24">
        {children}
      </div>
    </section>
  );
}
