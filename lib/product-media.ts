import { productImage } from "@/data/images";
import type { CategoryId, Product } from "@/data/menu";

const categoryFallback: Partial<Record<CategoryId, { src: string; alt: string }>> = {
  "waffles-dulces": {
    src: "/images/local/antojo.jpg",
    alt: "Waffles de Roots Protein Bar",
  },
  "waffles-salados": {
    src: "/images/local/antojo.jpg",
    alt: "Waffles de Roots Protein Bar",
  },
  frappes: {
    src: "/images/local/arco.png",
    alt: "Frappés de Roots Protein Bar",
  },
  "bebidas-calientes": {
    src: "/images/local/barra.jpg",
    alt: "Bebidas de Roots Protein Bar",
  },
  fitness: {
    src: "/images/local/barra.jpg",
    alt: "Bebidas fitness de Roots Protein Bar",
  },
  tes: {
    src: "/images/local/barra.jpg",
    alt: "Tés de Roots Protein Bar",
  },
};

export function resolveProductMedia(product: Product): {
  src: string;
  alt: string;
  isProductPhoto: boolean;
} | null {
  if (product.image) {
    return {
      src: product.image,
      alt: `${product.name} de Roots Protein Bar`,
      isProductPhoto: true,
    };
  }

  const mapped = productImage(product.id);
  if (mapped) {
    return { ...mapped, isProductPhoto: true };
  }

  const fallback = categoryFallback[product.category];
  if (fallback) {
    return { ...fallback, isProductPhoto: false };
  }

  return null;
}
