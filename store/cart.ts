"use client";

import { useEffect, useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartLine = {
  lineId: string;
  productId: string;
  name: string;
  variantId: string;
  variantLabel: string;
  addonOption?: string;
  addonPrice: number;
  unitPrice: number;
  quantity: number;
  note: string;
};

export type CartDraft = Omit<CartLine, "lineId">;

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  pulse: number;
  open: () => void;
  close: () => void;
  add: (line: CartDraft) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
};

function lineIdOf(line: CartDraft): string {
  return [line.productId, line.variantId, line.addonOption ?? "", line.note.trim()].join("|");
}

export function lineTotal(line: CartLine): number {
  return (line.unitPrice + line.addonPrice) * line.quantity;
}

export function cartSubtotal(items: CartLine[]): number {
  return items.reduce((sum, line) => sum + lineTotal(line), 0);
}

export function cartCount(items: CartLine[]): number {
  return items.reduce((sum, line) => sum + line.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      pulse: 0,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (line) => {
        const lineId = lineIdOf(line);
        const items = get().items;
        const existing = items.find((item) => item.lineId === lineId);
        const next = existing
          ? items.map((item) =>
              item.lineId === lineId ? { ...item, quantity: Math.min(99, item.quantity + line.quantity) } : item,
            )
          : [...items, { ...line, lineId, note: line.note.trim(), quantity: Math.min(99, line.quantity) }];
        set({ items: next, pulse: get().pulse + 1 });
      },
      setQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.lineId !== lineId) });
          return;
        }
        set({
          items: get().items.map((item) =>
            item.lineId === lineId ? { ...item, quantity: Math.min(99, quantity) } : item,
          ),
        });
      },
      remove: (lineId) => set({ items: get().items.filter((item) => item.lineId !== lineId) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "roots-pedido",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

export function useCartHydrated(): boolean {
  useEffect(() => {
    if (!useCartStore.persist.hasHydrated()) {
      void useCartStore.persist.rehydrate();
    }
  }, []);

  return useSyncExternalStore(
    (onStoreChange) => useCartStore.persist.onFinishHydration(onStoreChange),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
}
