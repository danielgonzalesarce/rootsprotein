"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/lib/menu";
import { resolveProductMedia } from "@/lib/product-media";
import { cn } from "@/lib/cn";
import { lineTotal, useCartStore, type CartLine } from "@/store/cart";

export function CartItemRow({ line }: { line: CartLine }) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);
  const product = getProduct(line.productId);
  const media = product ? resolveProductMedia(product) : null;
  const details = [
    line.variantLabel !== "Único" ? line.variantLabel : null,
    line.addonOption ? `Bubble tea ${line.addonOption}` : null,
    line.note ? `Nota: ${line.note}` : null,
  ].filter(Boolean);

  return (
    <li className="border-b border-savia/10 py-3.5">
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[0.9rem] bg-savia sm:h-[4.5rem] sm:w-[4.5rem]">
          {media ? (
            <Image
              src={media.src}
              alt=""
              fill
              sizes="72px"
              className={cn("object-cover", !media.isProductPhoto && "opacity-85 saturate-[0.92]")}
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display text-[1.1rem] leading-tight tracking-[-0.02em] text-savia">{line.name}</p>
              {details.length > 0 ? (
                <p className="mt-1 text-[0.85rem] leading-snug text-tinta/55">{details.join(" · ")}</p>
              ) : null}
            </div>
            <p className="nums shrink-0 text-[1.05rem] font-medium text-savia">{formatPrice(lineTotal(line))}</p>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <div className="inline-flex items-center rounded-full bg-white p-0.5 ring-1 ring-savia/10">
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full text-savia transition hover:bg-salvia"
                aria-label={`Reducir cantidad de ${line.name}`}
                onClick={() => setQuantity(line.lineId, line.quantity - 1)}
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
              <span className="nums min-w-7 text-center text-sm font-medium text-savia">{line.quantity}</span>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full text-savia transition hover:bg-salvia"
                aria-label={`Aumentar cantidad de ${line.name}`}
                onClick={() => setQuantity(line.lineId, line.quantity + 1)}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </div>
            <button
              type="button"
              className="ml-auto text-sm text-tinta/45 transition hover:text-savia"
              onClick={() => remove(line.lineId)}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
