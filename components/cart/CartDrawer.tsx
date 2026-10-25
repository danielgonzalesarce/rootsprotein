"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
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

  if (!open) return null;

  const continueOrdering = () => {
    close();
    if (pathname !== "/carta") router.push("/carta");
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" className="absolute inset-0 bg-savia/45" aria-label="Cerrar pedido" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pedido-titulo"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-avena text-tinta outline-none"
      >
        <div className="flex items-center justify-between border-b border-tinta/10 px-5 py-4">
          <h2 id="pedido-titulo" className="font-display text-3xl tracking-[-0.03em]">
            Tu pedido
          </h2>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full" aria-label="Cerrar pedido" onClick={close}>
            <X aria-hidden="true" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p>Tu pedido está vacío.</p>
          ) : (
            <>
              <ul>
                {items.map((line) => (
                  <CartItemRow key={line.lineId} line={line} />
                ))}
              </ul>
              <p className="nums mt-4 text-lg font-medium">Subtotal {formatPrice(cartSubtotal(items))}</p>
              <button type="button" className="mt-4 inline-flex min-h-11 items-center underline" onClick={continueOrdering}>
                Seguir pidiendo
              </button>
              <CheckoutForm items={items} />
            </>
          )}
          {items.length === 0 ? (
            <button type="button" className="mt-4 inline-flex min-h-11 items-center underline" onClick={continueOrdering}>
              Seguir pidiendo
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
