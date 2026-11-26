"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/menu/ProductCard";
import { MenuTabs } from "@/components/menu/MenuTabs";
import { categories, products, type CategoryId } from "@/data/menu";
import { groupProducts } from "@/lib/menu";

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function MenuCatalog() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId>(categories[0]?.id ?? "waffles-dulces");
  const needle = normalize(query.trim());
  const searching = needle.length > 0;

  const matched = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          products: products.filter(
            (product) =>
              product.category === category.id &&
              (needle.length === 0 ||
                normalize(product.name).includes(needle) ||
                normalize(product.description ?? "").includes(needle) ||
                normalize(product.subcategory ?? "").includes(needle)),
          ),
        }))
        .filter((block) => block.products.length > 0),
    [needle],
  );

  const tabCategories = useMemo(
    () =>
      (searching ? matched : categories.map((category) => ({
        category,
        products: products.filter((product) => product.category === category.id),
      }))).map((block) => ({
        id: block.category.id,
        name: block.category.name,
        count: block.products.length,
      })),
    [matched, searching],
  );

  const totalResults = useMemo(
    () => matched.reduce((sum, block) => sum + block.products.length, 0),
    [matched],
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
    if (!searching) return;
    if (!matched.some((block) => block.category.id === active)) {
      const first = matched[0]?.category.id;
      if (first) setActive(first);
    }
  }, [searching, matched, active]);

  const current = tabCategories.some((category) => category.id === active)
    ? active
    : (tabCategories[0]?.id ?? active);

  const blocks = searching
    ? matched
    : matched.filter((block) => block.category.id === current);

  const select = (id: CategoryId) => {
    setActive(id);
    if (searching) setQuery("");
    window.requestAnimationFrame(() => {
      document.getElementById("carta-lista")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <div>
      <div className="sticky top-[var(--header-h)] z-30 px-3 pt-4 sm:px-4 md:px-6">
        <div className="mx-auto max-w-[1400px] rounded-[1.35rem] bg-white/95 p-3 shadow-[0_14px_36px_-20px_rgba(26,42,22,0.35)] ring-1 ring-savia/8 backdrop-blur-md sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <label className="relative block min-w-0 flex-1 lg:max-w-sm">
              <span className="sr-only">Buscar en la carta</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta/35"
                strokeWidth={1.75}
              />
              <input
                id="buscar"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && query) {
                    event.preventDefault();
                    setQuery("");
                  }
                }}
                placeholder="Busca un waffle, un frappé…"
                autoComplete="off"
                className="h-11 w-full rounded-full border-0 bg-avena py-0 pl-11 pr-11 outline-none ring-1 ring-savia/8 transition placeholder:text-tinta/40 focus:bg-white focus:ring-hoja/35"
              />
              {query ? (
                <button
                  type="button"
                  className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-tinta/45 transition hover:bg-salvia hover:text-savia"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              ) : null}
            </label>

            <div className="min-w-0 flex-1">
              <MenuTabs categories={tabCategories} active={current} onSelect={select} />
            </div>

            {searching ? (
              <p className="shrink-0 text-sm text-tinta/50 lg:pl-1" aria-live="polite">
                {totalResults} {totalResults === 1 ? "resultado" : "resultados"}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div id="carta-lista" className="scroll-mt-[calc(var(--header-h)+12rem)] sm:scroll-mt-[calc(var(--header-h)+10rem)] lg:scroll-mt-[calc(var(--header-h)+7.5rem)]">
        {blocks.length === 0 ? (
          <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-7 sm:py-16 md:px-10">
            <p className="font-display text-2xl tracking-[-0.03em] text-savia">
              No encontramos “{query.trim()}”
            </p>
            <p className="mt-2 max-w-[36ch] text-tinta/60">Prueba con waffle, frappé, pizza o post entreno.</p>
            <button
              type="button"
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-hoja px-5 text-savia"
              onClick={() => setQuery("")}
            >
              Ver toda la carta
            </button>
          </div>
        ) : (
          blocks.map((block, index) => {
            const groups = groupProducts(block.products);
            const grouped = groups.some((group) => Boolean(group.subcategory));
            const categoryIndex = String(
              categories.findIndex((category) => category.id === block.category.id) + 1,
            ).padStart(2, "0");

            return (
              <section key={block.category.id} data-surface="light" className="bg-avena">
                <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-7 sm:py-9 md:px-10 md:py-11">
                  <div className="grid gap-3 border-b border-savia/15 pb-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-end sm:gap-6 sm:pb-6">
                    <span className="nums text-sm font-medium tracking-wide text-hoja">{categoryIndex}</span>
                    <div className="min-w-0">
                      <h2 className="font-display text-[clamp(1.75rem,5vw,2.85rem)] leading-[0.95] tracking-[-0.04em] text-savia">
                        {block.category.name}
                      </h2>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-tinta/55">
                        {block.category.macros ? (
                          <>
                            <span className="nums">{block.category.macros.protein} g proteína</span>
                            {block.category.macros.calories != null ? (
                              <>
                                <span className="text-savia/20" aria-hidden="true">
                                  ·
                                </span>
                                <span className="nums">{block.category.macros.calories} kcal</span>
                              </>
                            ) : null}
                            <span className="text-savia/20" aria-hidden="true">
                              ·
                            </span>
                          </>
                        ) : null}
                        <span>
                          {block.products.length} {block.products.length === 1 ? "opción" : "opciones"}
                        </span>
                      </div>
                    </div>
                    {searching && index === 0 ? (
                      <p className="text-sm text-tinta/45 sm:text-right">Resultados</p>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    {groups.map((group) => (
                      <div key={group.subcategory ?? "general"} className="mt-10 first:mt-0">
                        {group.subcategory ? (
                          <h3 className="mb-4 flex items-baseline gap-3 font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-savia sm:text-[1.5rem]">
                            <span className="hidden h-px flex-1 bg-savia/12 sm:block" aria-hidden="true" />
                            <span>{group.subcategory}</span>
                            <span className="h-px flex-1 bg-savia/12" aria-hidden="true" />
                          </h3>
                        ) : null}
                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                          {group.products.map((product) => (
                            <li key={product.id} className="h-full">
                              <ProductCard product={product} showCategory={!grouped} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })
        )}
      </div>

      <p className="mx-auto max-w-[1400px] px-4 pb-20 pt-4 text-[0.9375rem] text-tinta/45 sm:px-7 sm:pb-16 md:px-10">
        Elige una categoría arriba para ver solo eso. Gramos de proteína y calorías según la carta del local.
      </p>
    </div>
  );
}
