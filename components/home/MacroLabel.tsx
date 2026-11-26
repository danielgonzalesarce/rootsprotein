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
    <Chapter surface="savia" tone="dark">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-salvia/70">Macros</p>
      <SectionTitle className="mt-3 text-avena">Lo que hay en tu vaso o en tu plato</SectionTitle>
      <p className="mt-4 max-w-[40ch] text-avena/75">{site.supportLine}</p>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((category) => (
          <li key={category.id}>
            <p className="text-sm text-avena/55">{category.name}</p>
            <p className="mt-3 font-display text-[3rem] leading-none tracking-[-0.04em] text-avena">
              <span className="nums">{category.macros?.protein}</span>
              <span className="ml-1 text-[1.2rem]">g</span>
            </p>
            <p className="mt-2 text-avena/70">de proteína</p>
            <p className="nums mt-4 text-sm text-avena/45">{category.macros?.calories} kcal</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-4 border-t border-avena/15 pt-8 sm:grid-cols-3">
        {reasons.map((reason) => (
          <p key={reason} className="max-w-[28ch] text-avena/80">
            {reason}
          </p>
        ))}
      </div>

      <p className="mt-8 text-sm text-avena/50">
        Según la carta del local.{" "}
        <Link href="/carta" className="text-avena underline underline-offset-4">
          Ver la carta
        </Link>
      </p>
    </Chapter>
  );
}
