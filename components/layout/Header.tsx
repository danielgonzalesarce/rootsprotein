"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Logo } from "@/components/Logo";
import { Hojas } from "@/components/illustrations/Hojas";
import { site } from "@/data/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/cn";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { cartCount, useCartHydrated, useCartStore } from "@/store/cart";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Carta" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cuenta", label: "Sellos" },
  { href: "/contacto", label: "Contacto" },
];

function isCurrent(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hydrated = useCartHydrated();
  const count = useCartStore((state) => cartCount(state.items));
  const pulse = useCartStore((state) => state.pulse);
  const openCart = useCartStore((state) => state.open);
  const closeMenu = () => setMenuOpen(false);

  useFocusTrap(menuOpen, menuRef, closeMenu);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const homeStage = pathname === "/" && !raised && !menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "border-b transition-[background,box-shadow,border-color] duration-300",
          homeStage
            ? "border-transparent bg-transparent"
            : raised || menuOpen
              ? "border-savia/10 bg-avena/95 shadow-[0_10px_28px_rgba(26,42,22,0.08)] backdrop-blur-md"
              : "border-transparent bg-avena",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1400px] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-5 lg:px-6">
          <Logo
            tone={homeStage ? "avena" : "savia"}
            onClick={closeMenu}
            className="min-w-0 shrink"
            imageClassName="!h-10 sm:!h-14 lg:!h-[3.75rem]"
          />

          <nav
            className={cn(
              "hidden items-center gap-0.5 rounded-full p-1.5 lg:flex",
              homeStage
                ? "bg-avena/12 ring-1 ring-avena/15 backdrop-blur-md"
                : "bg-white/80 ring-1 ring-savia/8",
            )}
            aria-label="Principal"
          >
            {links.map((link) => {
              const current = isCurrent(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-full px-4 text-[0.95rem] transition-colors",
                    homeStage
                      ? current
                        ? "bg-avena font-medium text-savia"
                        : "text-avena/75 hover:bg-avena/15 hover:text-avena"
                      : current
                        ? "bg-savia font-medium text-avena"
                        : "text-tinta/55 hover:bg-salvia/70 hover:text-savia",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Roots Protein Bar"
              className={cn(
                "hidden h-11 w-11 items-center justify-center rounded-full transition-colors sm:inline-flex",
                homeStage ? "text-avena hover:bg-avena/15" : "hover:bg-white",
              )}
            >
              <InstagramGlyph className="h-6 w-6" />
            </a>
            <a
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Roots Protein Bar"
              className={cn(
                "hidden h-11 w-11 items-center justify-center rounded-full transition-colors sm:inline-flex",
                homeStage ? "text-avena hover:bg-avena/15" : "text-savia hover:bg-white",
              )}
            >
              <TikTokGlyph className="h-6 w-6" />
            </a>
            <button
              type="button"
              className={cn(
                "relative ml-0.5 inline-flex h-11 items-center justify-center gap-2 rounded-full px-3.5 transition-colors sm:px-4",
                homeStage
                  ? "bg-avena text-savia hover:bg-white"
                  : "bg-savia text-avena hover:bg-hoja",
              )}
              aria-label="Abrir pedido"
              onClick={() => {
                closeMenu();
                openCart();
              }}
            >
              <ShoppingBag aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              <span className="hidden text-sm font-medium sm:inline">Pedido</span>
              {hydrated && count > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-hoja px-1 text-[0.75rem] leading-none text-white sm:static sm:ml-0.5 sm:h-5 sm:min-w-5">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
              {hydrated && pulse > 0 ? (
                <Hojas key={pulse} className="sprout-leaf pointer-events-none absolute -right-1 -top-2 h-4 w-7 text-hoja" />
              ) : null}
            </button>
            <p className="sr-only" aria-live="polite">
              {hydrated ? `${count} ${count === 1 ? "producto" : "productos"} en el pedido` : ""}
            </p>
            <button
              type="button"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
                homeStage ? "text-avena hover:bg-avena/15" : "text-savia hover:bg-white",
              )}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" strokeWidth={1.5} /> : <Menu aria-hidden="true" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-savia/45 backdrop-blur-[3px]"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />
          <div
            ref={menuRef}
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            tabIndex={-1}
            className="sheet-in absolute inset-x-0 top-0 flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-avena text-tinta outline-none"
          >
            <div
              className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-hoja/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-20 bottom-28 h-64 w-64 rounded-full bg-salvia/80 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex h-[var(--header-h)] shrink-0 items-center justify-between gap-2 px-3 sm:px-5">
              <Logo
                tone="savia"
                onClick={closeMenu}
                className="min-w-0 shrink"
                imageClassName="!h-10 sm:!h-14"
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="relative inline-flex h-11 items-center justify-center gap-2 rounded-full bg-savia px-3.5 text-avena transition-colors hover:bg-hoja"
                  aria-label="Abrir pedido"
                  onClick={() => {
                    closeMenu();
                    openCart();
                  }}
                >
                  <ShoppingBag aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                  {hydrated && count > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-hoja px-1 text-[0.75rem] leading-none text-white">
                      {count > 9 ? "9+" : count}
                    </span>
                  ) : null}
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-savia transition-colors hover:bg-white"
                  aria-label="Cerrar menú"
                  onClick={closeMenu}
                >
                  <X aria-hidden="true" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <nav
              className="relative flex min-h-0 flex-1 flex-col justify-center px-5 pb-4 sm:px-8"
              aria-label="Principal móvil"
            >
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-hoja">
                Navegar
              </p>
              <ul className="flex flex-col gap-1">
                {links.map((link, index) => {
                  const current = isCurrent(pathname, link.href);
                  return (
                    <li
                      key={link.href}
                      className="menu-link-in"
                      style={{ ["--menu-i" as string]: index }}
                    >
                      <Link
                        href={link.href}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "group flex min-h-14 items-center justify-between gap-3 rounded-[1.15rem] px-4 py-2 transition-colors",
                          current
                            ? "bg-savia text-avena"
                            : "text-savia hover:bg-white/70",
                        )}
                        onClick={closeMenu}
                      >
                        <span
                          className={cn(
                            "font-display text-[2rem] leading-none tracking-[-0.04em] sm:text-[2.25rem]",
                            !current && "text-savia",
                          )}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                            current ? "text-avena/70" : "text-savia/30",
                          )}
                          strokeWidth={1.5}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative shrink-0 border-t border-savia/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
              <a
                href={infoWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-hoja px-5 text-[0.98rem] font-medium text-white transition hover:bg-savia"
                onClick={closeMenu}
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Pedir por WhatsApp
              </a>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/80 text-sm text-savia ring-1 ring-savia/10 transition hover:bg-white"
                  onClick={closeMenu}
                >
                  <InstagramGlyph className="h-5 w-5" />
                  Instagram
                </a>
                <a
                  href={site.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/80 text-sm text-savia ring-1 ring-savia/10 transition hover:bg-white"
                  onClick={closeMenu}
                >
                  <TikTokGlyph className="h-5 w-5" />
                  TikTok
                </a>
              </div>
              <p className="mt-3 text-center text-[0.78rem] text-tinta/45">
                {site.streetAddress}, {site.district}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
