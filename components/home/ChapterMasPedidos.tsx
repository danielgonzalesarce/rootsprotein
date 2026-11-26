import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Chapter } from "@/components/home/Chapter";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** TODO(dueña): confirmar los más pedidos reales */
const ids = ["waffle-caramel-crunch", "waffle-pizza", "frappe-sublime", "post-entreno"];

export function ChapterMasPedidos() {
  return (
    <Chapter surface="avena" tone="light" className="overflow-hidden">
      <div className="flex flex-col gap-8 border-b border-savia/12 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[40rem]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Más pedidos</p>
          <SectionTitle className="mt-3 max-w-[14ch]">Lo que más se lleva</SectionTitle>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-tinta/65">
            Los favoritos del local. Empieza por aquí o abre la carta completa.
          </p>
        </div>
        <Link
          href="/carta"
          className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-savia px-5 text-[0.95rem] font-medium text-avena shadow-[0_14px_32px_-18px_rgba(26,42,22,0.45)] transition hover:bg-hoja lg:self-auto"
        >
          Ver toda la carta
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </Link>
      </div>

      <div className="mt-10">
        <ProductCardGrid ids={ids} columns={4} />
      </div>
    </Chapter>
  );
}
