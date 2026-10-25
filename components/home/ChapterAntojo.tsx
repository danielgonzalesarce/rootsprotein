import Image from "next/image";
import { Chapter } from "@/components/home/Chapter";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { menuBoardImage } from "@/data/images";
import { getCategory } from "@/lib/menu";

// TODO(dueña): confirmar sus productos estrella
const ids = ["waffle-caramel-crunch", "waffle-classic", "waffle-pizza", "waffle-cheese"];

export function ChapterAntojo() {
  const proteinaDulce = getCategory("waffles-dulces")?.macros?.protein;
  const proteinaSalada = getCategory("waffles-salados")?.macros?.protein;

  return (
    <Chapter surface="salvia" tone="light" curve="c">
      <figure className="mb-8">
        <div className="arch relative aspect-[16/8] bg-avena">
          <Image
            src={menuBoardImage.src}
            alt={menuBoardImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover object-[center_35%]"
          />
        </div>
      </figure>
      <SectionTitle>Un waffle que también suma proteína</SectionTitle>
      {proteinaDulce != null && proteinaSalada != null ? (
        <p className="mt-4 max-w-[42ch]">
          Los dulces tienen {proteinaDulce} g de proteína y los salados, {proteinaSalada} g.
        </p>
      ) : null}
      <div className="mt-8">
        <ProductCardGrid ids={ids} />
      </div>
    </Chapter>
  );
}
