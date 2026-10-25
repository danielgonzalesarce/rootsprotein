"use client";

import Image from "next/image";
import { useProductMenu } from "@/components/menu/ProductModal";
import { productImage } from "@/data/images";
import { getProduct, priceLabel } from "@/lib/menu";
import type { Product } from "@/data/menu";

function PhotoFrame({ product }: { product: Product }) {
  const image = product.image
    ? { src: product.image, alt: `${product.name} de Roots Protein Bar` }
    : productImage(product.id);

  return (
    <div className="relative aspect-[4/3] bg-avena">
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-hoja/50" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="h-10 w-10">
            <path d="M32 48c0-12 8-20 18-22-3 12-10 20-18 22Z" fill="currentColor" />
            <path d="M32 48c0-12-8-20-18-22 3 12 10 20 18 22Z" fill="currentColor" opacity="0.45" />
          </svg>
        </span>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const openProduct = useProductMenu();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-savia/10 bg-white">
      <PhotoFrame product={product} />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.02em] text-savia sm:text-[1.5rem]">
          {product.name}
        </h3>
        {product.description ? (
          <p className="line-clamp-2 text-sm leading-snug text-tinta/75">{product.description}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <p className="nums text-lg font-medium text-tinta">{priceLabel(product)}</p>
          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-hoja px-4 text-sm font-medium text-white"
            onClick={() => openProduct(product.id)}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardGrid({ ids }: { ids: string[] }) {
  const cards = ids.map((id) => getProduct(id)).filter((item): item is Product => Boolean(item));

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((product) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
