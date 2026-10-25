import { categories, products, type CategoryId, type Macros, type Product } from "@/data/menu";
import { formatPrice } from "@/lib/format";

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id);
}

export function resolveMacros(product: Product): Macros | undefined {
  if (product.macros) return product.macros;
  return getCategory(product.category)?.macros;
}

export function lowestPrice(product: Product): number {
  return Math.min(...product.variants.map((variant) => variant.price));
}

export function priceLabel(product: Product): string {
  const min = lowestPrice(product);
  if (product.variants.length > 1) return `Desde ${formatPrice(min)}`;
  return formatPrice(min);
}

export type MenuGroup = { subcategory: string | null; products: Product[] };

export function groupProducts(list: Product[]): MenuGroup[] {
  const groups: MenuGroup[] = [];
  for (const product of list) {
    const key = product.subcategory ?? null;
    const last = groups[groups.length - 1];
    if (last && last.subcategory === key) last.products.push(product);
    else groups.push({ subcategory: key, products: [product] });
  }
  return groups;
}

export function proteinPeak(): number {
  const values = [
    ...categories.map((category) => category.macros?.protein ?? 0),
    ...products.map((product) => product.macros?.protein ?? 0),
  ];
  return Math.max(...values);
}
