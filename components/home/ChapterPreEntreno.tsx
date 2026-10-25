import { Chapter } from "@/components/home/Chapter";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

// TODO(dueña): confirmar sus productos estrella
const ids = ["pre-entreno", "te-atomic"];

export function ChapterPreEntreno() {
  return (
    <Chapter surface="avena" tone="light" curve="a">
      <SectionTitle>Para arrancar con energía</SectionTitle>
      <p className="mt-4 max-w-[42ch]">
        Cafeína, taurina y electrolitos en el Pre Entreno, y un shot de energía en el Atomic.
      </p>
      <div className="mt-8">
        <ProductCardGrid ids={ids} />
      </div>
    </Chapter>
  );
}
