import Image from "next/image";
import { Chapter } from "@/components/home/Chapter";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { menuBoardImage } from "@/data/images";
import { getCategory } from "@/lib/menu";

const ids = ["waffle-caramel-crunch", "waffle-classic", "waffle-pizza", "waffle-cheese"];

export function ChapterAntojo() {
  const proteinaDulce = getCategory("waffles-dulces")?.macros?.protein;
  const proteinaSalada = getCategory("waffles-salados")?.macros?.protein;

  return (
    <Chapter surface="salvia" tone="light">
      <figure className="mb-10 overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/8] bg-avena">
          <Image
            src={menuBoardImage.src}
            alt={menuBoardImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover object-[center_35%]"
          />
        </div>
      </figure>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Waffles</p>
      <SectionTitle className="mt-3">Un waffle que también suma proteína</SectionTitle>
      {proteinaDulce != null && proteinaSalada != null ? (
        <p className="mt-4 max-w-[40ch] text-tinta/65">
          Los dulces tienen {proteinaDulce} g de proteína y los salados, {proteinaSalada} g.
        </p>
      ) : null}
      <div className="mt-10">
        <ProductCardGrid ids={ids} />
      </div>
    </Chapter>
  );
}
