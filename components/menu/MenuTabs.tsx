"use client";

import type { CategoryId } from "@/data/menu";
import { cn } from "@/lib/cn";

export function MenuTabs({
  categories,
  active,
  onSelect,
}: {
  categories: { id: CategoryId; name: string }[];
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
}) {
  return (
    <div className="sticky top-[var(--header-h)] z-30 -mx-5 border-b border-savia/10 bg-avena/90 px-5 py-3 backdrop-blur-md md:-mx-10 md:px-10">
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((category) => {
          const current = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              aria-current={current ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-base",
                current ? "bg-savia text-avena" : "border border-savia/20 text-tinta",
              )}
              onClick={() => onSelect(category.id)}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
