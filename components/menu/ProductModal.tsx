"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Minus, Plus, X } from "lucide-react";
import { ProductVisual } from "@/components/menu/ProductVisual";
import { track } from "@/lib/analytics";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { getCategory, resolveMacros, getProduct } from "@/lib/menu";
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

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!product) return null;
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];
  if (!variant) return null;

  const category = getCategory(product.category);
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
      <button
        type="button"
        className="absolute inset-0 bg-savia/60 backdrop-blur-[2px]"
        aria-label="Cerrar producto"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="producto-titulo"
        tabIndex={-1}
        className="sheet-in relative z-10 flex max-h-[92svh] w-full flex-col overflow-hidden bg-avena text-tinta outline-none shadow-[0_28px_80px_-28px_rgba(26,42,22,0.65)] md:max-w-lg md:rounded-[1.75rem]"
      >
        <div className="relative shrink-0">
          <ProductVisual
            product={product}
            sizes="(max-width: 768px) 100vw, 512px"
            className="h-56 w-full md:h-64"
            label={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-savia/80 via-savia/20 to-transparent" />

          <button
            type="button"
            className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-avena/95 text-savia shadow-sm transition hover:bg-white"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <X aria-hidden="true" strokeWidth={1.5} />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-16">
            {category ? (
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-salvia/85">
                {product.subcategory ?? category.name}
              </p>
            ) : null}
            <h2
              id="producto-titulo"
              className="mt-2 font-display text-[2.15rem] leading-[0.95] tracking-[-0.04em] text-avena md:text-[2.4rem]"
            >
              {product.name}
            </h2>
            {macros ? (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-avena/95 px-3 py-1.5 text-[0.8rem] font-medium text-savia">
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
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex-1 px-5 py-5 sm:px-6">
            {product.description ? (
              <p className="max-w-[40ch] text-[1.02rem] leading-relaxed text-tinta/65">{product.description}</p>
            ) : null}

            {product.variants.length > 1 ? (
              <fieldset className={cn(product.description ? "mt-6" : "mt-1")}>
                <legend className="text-sm font-medium text-savia">Elige una opción</legend>
                <div className="mt-3 grid gap-2">
                  {product.variants.map((item) => {
                    const selected = variant.id === item.id;
                    return (
                      <label
                        key={item.id}
                        className={cn(
                          "flex min-h-12 cursor-pointer items-center gap-3 rounded-full px-4 ring-1 transition",
                          selected
                            ? "bg-savia text-avena ring-savia"
                            : "bg-white text-savia ring-savia/10 hover:ring-savia/25",
                        )}
                      >
                        <input
                          type="radio"
                          name="variante"
                          value={item.id}
                          checked={selected}
                          onChange={() => setVariantId(item.id)}
                          className="sr-only"
                        />
                        <span className="flex-1 text-[0.98rem]">{item.label}</span>
                        <span className="nums text-[0.98rem]">{formatPrice(item.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            {product.addon ? (
              <label className="mt-6 block">
                <span className="text-sm font-medium text-savia">
                  {product.addon.label}{" "}
                  <span className="font-normal text-tinta/45">(+{formatPrice(product.addon.price)})</span>
                </span>
                <select
                  className="mt-2 h-12 w-full rounded-full border-0 bg-white px-4 outline-none ring-1 ring-savia/10 transition focus:ring-hoja/35"
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

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-savia/10 pt-5">
              <p className="text-sm font-medium text-savia">Cantidad</p>
              <div className="inline-flex items-center gap-1 rounded-full bg-white p-1 ring-1 ring-savia/10">
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full text-savia transition hover:bg-salvia"
                  aria-label="Reducir cantidad"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  <Minus className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <span className="nums min-w-8 text-center text-lg font-medium text-savia">{quantity}</span>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full text-savia transition hover:bg-salvia"
                  aria-label="Aumentar cantidad"
                  onClick={() => setQuantity((current) => Math.min(99, current + 1))}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-savia">Nota para este producto</span>
              <textarea
                className="mt-2 min-h-24 w-full resize-none rounded-[1.1rem] border-0 bg-white px-4 py-3 outline-none ring-1 ring-savia/10 transition placeholder:text-tinta/35 focus:ring-hoja/35"
                maxLength={200}
                value={note}
                placeholder="Sin crema, extra hielo…"
                onChange={(event) => setNote(event.target.value)}
              />
            </label>
          </div>

          <div className="shrink-0 border-t border-savia/10 bg-avena/95 px-5 py-4 backdrop-blur-sm sm:px-6">
            <button
              type="button"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-hoja px-5 text-base font-medium text-white transition hover:bg-savia"
              onClick={submit}
            >
              Agregar al pedido
              <span className="nums opacity-90">· {formatPrice(total)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
