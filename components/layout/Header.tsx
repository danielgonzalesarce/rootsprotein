"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { Logo } from "@/components/Logo";
import { Hojas } from "@/components/illustrations/Hojas";
import { site } from "@/data/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/cn";
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
        <div className="absolute inset-x-0 top-[var(--header-h)] z-50 lg:hidden">
          <div className="absolute inset-0 -z-10 min-h-[100svh] bg-savia/25" onClick={closeMenu} />
          <div
            ref={menuRef}
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            tabIndex={-1}
            className="border-b border-savia/10 bg-avena px-3 py-3 text-tinta shadow-[0_16px_40px_rgba(26,42,22,0.12)] outline-none sm:px-4"
          >
            <nav className="mx-auto flex max-w-[1400px] flex-col gap-0.5" aria-label="Principal móvil">
              {links.map((link) => {
                const current = isCurrent(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 text-base",
                      current ? "bg-savia text-avena" : "hover:bg-white/80",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mx-auto mt-2 flex max-w-[1400px] flex-col border-t border-savia/10 pt-2">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-xl px-4"
              >
                <InstagramGlyph className="h-6 w-6" />
                Instagram
              </a>
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-xl px-4 text-savia"
              >
                <TikTokGlyph className="h-6 w-6" />
                TikTok
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
