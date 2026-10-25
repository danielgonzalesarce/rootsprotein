import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Carta Roots Protein Bar | Waffles, Frappés y Fitness",
  description:
    "Precios y macros de waffles dulces y salados, frappés proteicos, bebidas calientes, pre y post entreno y tés funcionales.",
  path: "/carta",
});

export default function CartaPage() {
  return (
    <main id="contenido" className="bg-avena pt-[var(--header-h)] text-tinta" data-surface="light">
      <div className="mx-auto w-full max-w-6xl px-5 pb-4 pt-12 md:px-10 md:pt-16">
        <h1 className="chapter-title text-savia">Nuestra carta</h1>
        <p className="mt-4 max-w-[62ch]">{site.supportLine}</p>
      </div>
      <MenuCatalog />
    </main>
  );
}
