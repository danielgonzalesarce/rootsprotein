import { CartaHeader } from "@/components/menu/CartaHeader";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Carta de Waffles y Frappés Proteicos | Roots Protein Bar Santa Anita",
  description:
    "Menú con precios y macros: waffles dulces y salados altos en proteína, frappés proteicos, bebidas calientes, pre/post entreno y tés. Sin gluten, lactosa ni azúcar en Santa Anita, Lima.",
  path: "/carta",
  keywords: [
    "carta protein bar Santa Anita",
    "menú waffles proteicos Lima",
    "frappés proteicos precios",
    "post entreno Santa Anita",
    "waffles sin gluten Lima",
  ],
});

export default function CartaPage() {
  return (
    <main id="contenido" className="bg-avena text-tinta" data-surface="light">
      <CartaHeader />
      <MenuCatalog />
    </main>
  );
}
