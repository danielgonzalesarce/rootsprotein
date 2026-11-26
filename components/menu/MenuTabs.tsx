"use client";

import { useEffect, useRef } from "react";
import type { CategoryId } from "@/data/menu";
import { cn } from "@/lib/cn";

export function MenuTabs({
  categories,
  active,
  onSelect,
}: {
  categories: { id: CategoryId; name: string; count?: number }[];
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const current = scroller.querySelector<HTMLElement>('[aria-current="true"]');
    current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div
      ref={scrollerRef}
      role="tablist"
      aria-label="Categorías de la carta"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const current = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={current}
            aria-current={current ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.95rem] transition-colors",
              current ? "bg-savia text-avena" : "bg-white text-savia/70 ring-1 ring-savia/10 hover:text-savia",
            )}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
            {typeof category.count === "number" ? (
              <span
                className={cn(
                  "nums text-[0.78rem]",
                  current ? "text-avena/70" : "text-tinta/40",
                )}
              >
                {category.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
