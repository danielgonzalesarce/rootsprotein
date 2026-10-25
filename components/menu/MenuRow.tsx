"use client";

import { MacroChip } from "@/components/menu/MacroChip";
import { ProductVisual } from "@/components/menu/ProductVisual";
import { useProductMenu } from "@/components/menu/ProductModal";
import { cn } from "@/lib/cn";
import { getProduct, priceLabel, resolveMacros } from "@/lib/menu";
import type { Product } from "@/data/menu";

export function MenuRow({
  product,
  surface = "light",
  action = "plus",
  visual = false,
  heading = "h3",
}: {
  product: Product;
  surface?: "light" | "dark";
  action?: "plus" | "text";
  visual?: boolean;
  heading?: "h3" | "h4";
}) {
  const openProduct = useProductMenu();
  const macros = resolveMacros(product);
  const Title = heading;

  return (
    <article className="flex gap-3 border-b border-current/15 py-4 md:gap-5 md:py-5">
      {visual ? (
        <ProductVisual product={product} label={false} sizes="120px" className="h-28 w-24 shrink-0 shadow-[0_10px_24px_rgba(31,51,25,0.08)]" />
      ) : null}
      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <Title className="min-w-0 flex-1 font-display text-[1.45rem] leading-tight tracking-[-0.02em] md:text-[1.7rem]">
              {product.name}
            </Title>
            <span className="mb-1 hidden flex-1 border-b border-dotted border-current/30 md:block" aria-hidden="true" />
            <p className="nums shrink-0 font-medium">{priceLabel(product)}</p>
          </div>
          {product.description ? <p className="mt-1 max-w-[62ch] text-[0.9375rem] opacity-80">{product.description}</p> : null}
          {macros ? (
            <div className="mt-2">
              <MacroChip macros={macros} surface={surface} />
            </div>
          ) : null}
        </div>
        {action === "plus" ? (
          <button
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-current text-xl leading-none"
            aria-label={`Agregar ${product.name} al pedido`}
            onClick={() => openProduct(product.id)}
          >
            +
          </button>
        ) : (
          <button
            type="button"
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full border border-current px-4 text-base",
            )}
            onClick={() => openProduct(product.id)}
          >
            Agregar
          </button>
        )}
      </div>
    </article>
  );
}

export function MenuList({
  ids,
  surface = "light",
}: {
  ids: string[];
  surface?: "light" | "dark";
}) {
  const rows = ids.map((id) => getProduct(id)).filter((item): item is Product => Boolean(item));
  return (
    <ul>
      {rows.map((product) => (
        <li key={product.id}>
          <MenuRow product={product} surface={surface} action="text" />
        </li>
      ))}
    </ul>
  );
}
