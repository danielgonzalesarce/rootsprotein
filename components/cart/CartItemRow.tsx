"use client";

import { formatPrice } from "@/lib/format";
import { lineTotal, useCartStore, type CartLine } from "@/store/cart";

export function CartItemRow({ line }: { line: CartLine }) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);

  return (
    <li className="border-b border-tinta/15 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{line.name}</p>
          {line.variantLabel !== "Único" ? <p className="text-[0.9375rem]">{line.variantLabel}</p> : null}
          {line.addonOption ? (
            <p className="text-[0.9375rem]">Bubble tea {line.addonOption}</p>
          ) : null}
          {line.note ? <p className="text-[0.9375rem] opacity-75">Nota: {line.note}</p> : null}
        </div>
        <p className="nums shrink-0 font-medium">{formatPrice(lineTotal(line))}</p>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-tinta/25"
          aria-label={`Reducir cantidad de ${line.name}`}
          onClick={() => setQuantity(line.lineId, line.quantity - 1)}
        >
          −
        </button>
        <span className="nums min-w-6 text-center">{line.quantity}</span>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-tinta/25"
          aria-label={`Aumentar cantidad de ${line.name}`}
          onClick={() => setQuantity(line.lineId, line.quantity + 1)}
        >
          +
        </button>
        <button
          type="button"
          className="ml-auto inline-flex min-h-11 items-center px-2 text-[0.9375rem] underline"
          onClick={() => remove(line.lineId)}
        >
          Quitar
        </button>
      </div>
    </li>
  );
}
