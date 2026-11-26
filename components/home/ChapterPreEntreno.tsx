import { Chapter } from "@/components/home/Chapter";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const ids = ["pre-entreno", "te-atomic"];

export function ChapterPreEntreno() {
  return (
    <Chapter surface="avena" tone="light">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Pre entreno</p>
      <SectionTitle className="mt-3">Para arrancar con energía</SectionTitle>
      <p className="mt-4 max-w-[40ch] text-tinta/65">
        Cafeína, taurina y electrolitos en el Pre Entreno, y un shot de energía en el Atomic.
      </p>
      <div className="mt-10">
        <ProductCardGrid ids={ids} />
      </div>
    </Chapter>
  );
}
