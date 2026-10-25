import Link from "next/link";
import { Chapter } from "@/components/home/Chapter";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { categories } from "@/data/menu";
import { proteinPeak } from "@/lib/menu";

const reasons = [
  `Hasta ${proteinPeak()} g de proteína en el plato.`,
  "Sin gluten, sin lactosa y sin azúcar.",
  "Los gramos están en la carta, antes de pedir.",
];

export function MacroLabel() {
  const rows = categories.filter((category) => category.macros);

  return (
    <Chapter surface="savia" tone="dark" curve="d">
      <div className="max-w-[40ch]">
        <SectionTitle>Lo que hay en tu vaso o en tu plato</SectionTitle>
        <p className="mt-4 text-avena/85">{site.supportLine} La proteína va en el waffle y en el vaso.</p>
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((category) => (
          <li key={category.id} className="rounded-2xl bg-avena px-5 py-6 text-tinta">
            <p className="text-sm">{category.name}</p>
            <p className="mt-4 font-display text-[3.25rem] leading-none tracking-[-0.04em] text-savia">
              <span className="nums">{category.macros?.protein}</span>
              <span className="ml-1 text-[1.35rem]">g</span>
            </p>
            <p className="mt-2">de proteína</p>
            <p className="nums mt-5 text-sm text-tinta/70">{category.macros?.calories} kcal</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-4 border-t border-avena/20 pt-8 sm:grid-cols-3">
        {reasons.map((reason) => (
          <p key={reason} className="max-w-[28ch] text-[1.05rem]">
            {reason}
          </p>
        ))}
      </div>

      <p className="mt-8 text-sm text-avena/70">
        Según la carta del local.{" "}
        <Link href="/carta" className="text-avena underline decoration-avena/40 underline-offset-4">
          Ver la carta
        </Link>
      </p>
    </Chapter>
  );
}
