import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Chapter({
  id,
  surface,
  tone,
  children,
  className,
}: {
  id?: string;
  surface: "avena" | "salvia" | "hoja" | "savia";
  tone: "light" | "dark";
  /** @deprecated */
  curve?: string;
  children: ReactNode;
  className?: string;
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
      className={cn("relative", bg, tone === "dark" ? "text-avena on-dark" : "text-tinta", className)}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
        {children}
      </div>
    </section>
  );
}
