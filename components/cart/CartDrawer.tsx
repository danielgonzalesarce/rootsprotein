"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { formatPrice } from "@/lib/format";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cartSubtotal, useCartStore } from "@/store/cart";

export function CartDrawer() {
  const pathname = usePathname();
  const router = useRouter();
  const open = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const items = useCartStore((state) => state.items);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, dialogRef, close);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const continueOrdering = () => {
    close();
    if (pathname !== "/carta") router.push("/carta");
  };

  const subtotal = cartSubtotal(items);

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-savia/55 backdrop-blur-[2px]"
        aria-label="Cerrar pedido"
        onClick={close}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pedido-titulo"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-avena text-tinta outline-none shadow-[-24px_0_60px_-28px_rgba(26,42,22,0.45)]"
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-hoja">Pedido</p>
            <h2 id="pedido-titulo" className="mt-1 font-display text-[2rem] leading-none tracking-[-0.035em] text-savia">
              Tu pedido
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-savia ring-1 ring-savia/10 transition hover:bg-salvia"
            aria-label="Cerrar pedido"
            onClick={close}
          >
            <X aria-hidden="true" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col px-5 pb-6">
            <div className="rounded-[1.25rem] bg-white px-5 py-8 text-center ring-1 ring-savia/10">
              <p className="font-display text-xl tracking-[-0.03em] text-savia">Aún no hay nada</p>
              <p className="mt-2 text-sm text-tinta/55">Agrega waffles o frappés desde la carta.</p>
              <button
                type="button"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-hoja px-5 text-sm font-medium text-white"
                onClick={continueOrdering}
              >
                Ver la carta
              </button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="shrink-0 border-y border-savia/10 bg-white/70 px-5 py-1">
              <ul>
                {items.map((line) => (
                  <CartItemRow key={line.lineId} line={line} />
                ))}
              </ul>
              <div className="flex items-center justify-between gap-3 py-3">
                <p className="nums text-lg font-medium text-savia">Subtotal {formatPrice(subtotal)}</p>
                <button
                  type="button"
                  className="text-sm text-hoja transition hover:text-savia"
                  onClick={continueOrdering}
                >
                  Seguir pidiendo
                </button>
              </div>
            </div>

            <CheckoutForm items={items} />
          </div>
        )}
      </div>
    </div>
  );
}
