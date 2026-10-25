"use client";

import { useEffect, useMemo, useState } from "react";
import { MacroChip } from "@/components/menu/MacroChip";
import { ProductCard } from "@/components/menu/ProductCard";
import { MenuTabs } from "@/components/menu/MenuTabs";
import { categories, products, type CategoryId } from "@/data/menu";
import { cn } from "@/lib/cn";
import { groupProducts } from "@/lib/menu";

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function MenuCatalog() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId>(categories[0]?.id ?? "waffles-dulces");
  const needle = normalize(query.trim());

  const visible = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          products: products.filter(
            (product) =>
              product.category === category.id &&
              (needle.length === 0 || normalize(product.name).includes(needle)),
          ),
        }))
        .filter((block) => block.products.length > 0),
    [needle],
  );

  useEffect(() => {
    const focus = () => {
      if (window.location.hash === "#buscar") document.getElementById("buscar")?.focus();
    };
    focus();
    window.addEventListener("hashchange", focus);
    return () => window.removeEventListener("hashchange", focus);
  }, []);

  useEffect(() => {
    if (needle.length > 0) return;
    const nodes = categories
      .map((category) => document.getElementById(category.id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id as CategoryId);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [needle]);

  const select = (id: CategoryId) => {
    setActive(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const current = visible.some((block) => block.category.id === active)
    ? active
    : (visible[0]?.category.id ?? active);

  return (
    <div>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <label className="block max-w-md">
          <span className="sr-only">Buscar en la carta</span>
          <input
            id="buscar"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca un waffle, un frappé…"
            className="h-12 w-full rounded-[10px] border border-tinta/20 bg-white px-4"
          />
        </label>
      </div>

      <div className="mx-auto mt-6 w-full max-w-6xl px-5 md:px-10">
        <MenuTabs categories={visible.map((block) => block.category)} active={current} onSelect={select} />
      </div>

      {visible.length === 0 ? (
        <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-10">
          <p className="text-lg">No encontramos resultados</p>
          <button type="button" className="mt-4 inline-flex min-h-11 items-center underline" onClick={() => setQuery("")}>
            Ver toda la carta
          </button>
        </div>
      ) : (
        visible.map((block, index) => {
          const soft = index % 2 === 1;
          const groups = groupProducts(block.products);
          return (
            <section
              key={block.category.id}
              id={block.category.id}
              data-surface="light"
              className={cn("relative scroll-mt-40", soft ? "bg-salvia" : "bg-avena")}
            >
              <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-10 md:py-16">
                <h2 className="chapter-title">{block.category.name}</h2>
                {block.category.macros ? (
                  <div className="mt-4">
                    <MacroChip macros={block.category.macros} />
                  </div>
                ) : null}
                <div className="mt-8">
                  {groups.length > 1 && groups.every((group) => group.products.length === 1) ? (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {groups.map((group) =>
                        group.products.map((product) => (
                          <li key={product.id} className="h-full">
                            {group.subcategory ? (
                              <h3 className="mb-3 font-display text-[1.45rem] leading-tight tracking-[-0.02em]">
                                {group.subcategory}
                              </h3>
                            ) : null}
                            <ProductCard product={product} />
                          </li>
                        )),
                      )}
                    </ul>
                  ) : (
                    groups.map((group) => (
                      <div key={group.subcategory ?? "general"} className="mt-8 first:mt-0">
                        {group.subcategory ? (
                          <h3 className="font-display text-[1.6rem] leading-tight tracking-[-0.02em]">{group.subcategory}</h3>
                        ) : null}
                        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {group.products.map((product) => (
                            <li key={product.id} className="h-full">
                              <ProductCard product={product} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          );
        })
      )}

      <p className="mx-auto w-full max-w-6xl bg-avena px-5 pb-16 pt-8 text-[0.9375rem] text-tinta md:px-10 md:pb-28">
        Gramos de proteína y calorías según la carta del local. Precios en soles.
      </p>
    </div>
  );
}
