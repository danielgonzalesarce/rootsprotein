"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { ProductVisual } from "@/components/menu/ProductVisual";
import { MacroChip } from "@/components/menu/MacroChip";
import { track } from "@/lib/analytics";
import { formatPrice } from "@/lib/format";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { resolveMacros } from "@/lib/menu";
import { getProduct } from "@/lib/menu";
import { useCartStore } from "@/store/cart";

const ProductContext = createContext<(id: string) => void>(() => {});

export function useProductMenu(): (id: string) => void {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState<string | null>(null);
  const product = productId ? getProduct(productId) : undefined;

  return (
    <ProductContext.Provider value={setProductId}>
      {children}
      {product ? <ProductDialog key={product.id} productId={product.id} onClose={() => setProductId(null)} /> : null}
    </ProductContext.Provider>
  );
}

function ProductDialog({ productId, onClose }: { productId: string; onClose: () => void }) {
  const product = getProduct(productId);
  const add = useCartStore((state) => state.add);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [variantId, setVariantId] = useState(product?.variants[0]?.id ?? "");
  const [addon, setAddon] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  useFocusTrap(true, dialogRef, onClose);

  if (!product) return null;
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  if (!variant) return null;
  const macros = resolveMacros(product);
  const addonPrice = addon && product.addon ? product.addon.price : 0;
  const total = (variant.price + addonPrice) * quantity;

  const submit = () => {
    add({
      productId: product.id,
      name: product.name,
      variantId: variant.id,
      variantLabel: variant.label,
      addonOption: addon || undefined,
      addonPrice,
      unitPrice: variant.price,
      quantity,
      note,
    });
    track("add_to_cart", { item_name: product.name, value: total });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6">
      <button type="button" className="absolute inset-0 bg-savia/55" aria-label="Cerrar producto" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="producto-titulo"
        tabIndex={-1}
        className="sheet-in relative flex max-h-[92svh] w-full flex-col overflow-y-auto bg-avena text-tinta outline-none md:max-w-lg md:rounded-2xl"
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-avena/90"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <X aria-hidden="true" strokeWidth={1.5} />
        </button>
        <ProductVisual product={product} sizes="(max-width: 768px) 100vw, 480px" className="h-56 w-full md:h-64" />
        <div className="px-5 py-6">
          <h2 id="producto-titulo" className="font-display text-[2rem] leading-none tracking-[-0.03em]">
            {product.name}
          </h2>
          {product.description ? <p className="mt-3 max-w-[62ch]">{product.description}</p> : null}
          {macros ? (
            <div className="mt-3">
              <MacroChip macros={macros} />
            </div>
          ) : null}

          {product.variants.length > 1 ? (
            <fieldset className="mt-6">
              <legend className="font-medium">Elige una opción</legend>
              <div className="mt-2 grid gap-2">
                {product.variants.map((item) => (
                  <label key={item.id} className="flex min-h-11 items-center gap-3">
                    <input
                      type="radio"
                      name="variante"
                      value={item.id}
                      checked={variant.id === item.id}
                      onChange={() => setVariantId(item.id)}
                    />
                    <span className="flex-1">{item.label}</span>
                    <span className="nums">{formatPrice(item.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          {product.addon ? (
            <label className="mt-6 block">
              <span className="font-medium">
                {product.addon.label} (+{formatPrice(product.addon.price)})
              </span>
              <select
                className="mt-2 h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-3"
                value={addon}
                onChange={(event) => setAddon(event.target.value)}
              >
                <option value="">Sin bubble tea</option>
                {product.addon.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-tinta/30"
              aria-label="Reducir cantidad"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              −
            </button>
            <span className="nums min-w-8 text-center">{quantity}</span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-tinta/30"
              aria-label="Aumentar cantidad"
              onClick={() => setQuantity((current) => Math.min(99, current + 1))}
            >
              +
            </button>
          </div>

          <label className="mt-6 block">
            <span className="font-medium">Nota para este producto</span>
            <textarea
              className="mt-2 min-h-24 w-full rounded-[10px] border border-tinta/20 bg-white px-3 py-2"
              maxLength={200}
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>

          <button
            type="button"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-hoja px-5 font-medium text-white"
            onClick={submit}
          >
            Agregar al pedido · {formatPrice(total)}
          </button>
        </div>
      </div>
    </div>
  );
}
