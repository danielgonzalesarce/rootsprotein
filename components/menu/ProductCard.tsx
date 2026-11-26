"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useProductMenu } from "@/components/menu/ProductModal";
import type { Product } from "@/data/menu";
import { cn } from "@/lib/cn";
import { getCategory, getProduct, priceLabel, resolveMacros } from "@/lib/menu";
import { resolveProductMedia } from "@/lib/product-media";

function PhotoFrame({ product }: { product: Product }) {
  const image = resolveProductMedia(product);
  const macros = resolveMacros(product);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-savia">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]",
            !image.isProductPhoto && "opacity-80 saturate-[0.9]",
          )}
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-avena/30" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="h-14 w-14">
            <path d="M32 48c0-12 8-20 18-22-3 12-10 20-18 22Z" fill="currentColor" />
            <path d="M32 48c0-12-8-20-18-22 3 12 10 20 18 22Z" fill="currentColor" opacity="0.45" />
          </svg>
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-savia/70 via-savia/10 to-transparent" />
      {macros ? (
        <p className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-avena/95 px-3 py-1.5 text-[0.78rem] font-medium text-savia shadow-[0_8px_20px_-10px_rgba(26,42,22,0.5)] backdrop-blur-sm">
          <span className="nums">{macros.protein} g</span>
          <span className="text-tinta/45">prot.</span>
          {macros.calories != null ? (
            <>
              <span className="text-savia/25" aria-hidden="true">
                ·
              </span>
              <span className="nums text-tinta/55">{macros.calories} kcal</span>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

export function ProductCard({
  product,
  showCategory = true,
}: {
  product: Product;
  showCategory?: boolean;
  /** @deprecated kept for callers; cards share one premium layout */
  compact?: boolean;
}) {
  const openProduct = useProductMenu();
  const category = getCategory(product.category);
  const eyebrow = showCategory ? (product.subcategory ?? category?.name) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_40px_-28px_rgba(26,42,22,0.45)] ring-1 ring-savia/8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_22px_48px_-24px_rgba(26,42,22,0.5)] focus-within:ring-hoja/35">
      <button
        type="button"
        className="flex h-full flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hoja"
        onClick={() => openProduct(product.id)}
        aria-label={`Agregar ${product.name}, ${priceLabel(product)}`}
      >
        <PhotoFrame product={product} />
        <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
          {eyebrow ? (
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-hoja">{eyebrow}</p>
          ) : null}
          <h3
            className={cn(
              "font-display text-[1.4rem] leading-[1.12] tracking-[-0.03em] text-savia transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[1.55rem]",
              eyebrow && "mt-2",
            )}
          >
            {product.name}
          </h3>
          {product.description ? (
            <p className="mt-2 line-clamp-2 text-[0.92rem] leading-snug text-tinta/55">{product.description}</p>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-savia/8 pt-4">
            <p className="nums text-[1.35rem] font-medium tracking-[-0.02em] text-savia">{priceLabel(product)}</p>
            <span className="inline-flex h-11 items-center gap-1.5 rounded-full bg-hoja px-4 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-savia">
              <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Agregar
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

export function ProductCardGrid({ ids, columns = 3 }: { ids: string[]; columns?: 3 | 4 }) {
  const cards = ids.map((id) => getProduct(id)).filter((item): item is Product => Boolean(item));

  return (
    <ul
      className={
        columns === 4
          ? "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      }
    >
      {cards.map((product) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
