/**
 * Fotos del local ya colocadas. Las de producto siguen vacías:
 * una foto cuadrada por archivo en public/images/productos/, con el id del producto.
 * waffle-classic.jpg, waffle-caramel-crunch.jpg, waffle-peanut-butter-brownie.jpg,
 * waffle-cheese.jpg, waffle-pizza.jpg, waffle-americana.jpg, waffle-peperoni.jpg,
 * waffle-hawaiana.jpg, frappe-sublime.jpg, frappe-caramel.jpg, frappe-mocaccina.jpg,
 * frappe-brownie.jpg, frappe-oreo.jpg, frappe-pie-limon.jpg, frappe-caramel-frappuccino.jpg,
 * frappe-pie-manzana.jpg, frappe-cheesecake-fresa.jpg, frappe-champ-naranja.jpg,
 * mocca-latte.jpg, caramel-latte.jpg, hot-chocolate.jpg, pre-entreno.jpg,
 * post-entreno.jpg, te-atomic.jpg, te-pink-protein.jpg
 */

export type SiteImage = { src: string; alt: string };

export const heroImage: SiteImage = {
  src: "/images/local/arco.png",
  alt: "Mesa del local de Roots Protein Bar, con el arco iluminado que dice un frappé para cada antojo",
};

export const galleryImages: { src: string; alt: string; caption: string }[] = [
  {
    src: "/images/local/barra.jpg",
    alt: "Barra de Roots Protein Bar con libros, juegos y la frase alto en proteínas, libres de gluten, lactosa y azúcar",
    caption: "Alto en proteínas, libres de gluten, lactosa y azúcar",
  },
  {
    src: "/images/local/arco.png",
    alt: "Arco iluminado de Roots Protein Bar",
    caption: "Un frappé para cada antojo",
  },
  {
    src: "/images/local/antojo.jpg",
    alt: "Waffles en la barra de Roots Protein Bar",
    caption: "En la barra",
  },
];

export const menuBoardImage: SiteImage = {
  src: "/images/local/carta.png",
  alt: "Carta iluminada de waffles y frappés en Roots Protein Bar",
};

export const productImages: Partial<Record<string, SiteImage>> = {};

export function productImage(id: string): SiteImage | null {
  return productImages[id] ?? null;
}
