import Link from "next/link";
import { Chapter } from "@/components/home/Chapter";
import { ProductCardGrid } from "@/components/menu/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCategory, getProduct } from "@/lib/menu";

const ids = ["post-entreno", "te-pink-protein", "frappe-sublime", "frappe-brownie"];

export function ChapterPostEntreno() {
  const postProtein = getProduct("post-entreno")?.macros?.protein;
  const frappeProtein = getCategory("frappes")?.macros?.protein;

  return (
    <Chapter surface="avena" tone="light">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Recuperación</p>
      <SectionTitle className="mt-3">Para recuperarte</SectionTitle>
      {postProtein != null && frappeProtein != null ? (
        <p className="mt-4 max-w-[42ch] text-tinta/65">
          El Post Entreno trae {postProtein} g de proteína. Los frappés, {frappeProtein} g.
        </p>
      ) : null}
      <div className="mt-10">
        <ProductCardGrid ids={ids} />
      </div>
      <Link href="/carta#frappes" className="mt-8 inline-flex min-h-11 items-center text-hoja underline underline-offset-4">
        Ver todos los frappés
      </Link>
    </Chapter>
  );
}
