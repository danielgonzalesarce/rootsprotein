"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
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
        <div className="absolute inset-x-0 top-[var(--header-h)] z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 -z-10 min-h-[100svh] bg-savia/30 backdrop-blur-[1px]"
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
            className="sheet-in mx-3 overflow-hidden rounded-[1.35rem] bg-avena text-tinta shadow-[0_18px_44px_-18px_rgba(26,42,22,0.35)] outline-none ring-1 ring-savia/10 sm:mx-4"
          >
            <nav className="px-2.5 pt-2.5" aria-label="Principal móvil">
              <ul className="flex flex-col gap-0.5">
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
                          "flex min-h-11 items-center rounded-full px-4 text-[1.02rem] transition-colors",
                          current
                            ? "bg-savia font-medium text-avena"
                            : "text-savia/80 hover:bg-white/80 hover:text-savia",
                        )}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-2 border-t border-savia/10 px-3 pb-3 pt-2.5">
              <div className="flex items-center gap-1.5">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-savia/8 transition hover:bg-salvia/50"
                  onClick={closeMenu}
                >
                  <InstagramGlyph className="h-5 w-5" />
                </a>
                <a
                  href={site.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-savia ring-1 ring-savia/8 transition hover:bg-salvia/50"
                  onClick={closeMenu}
                >
                  <TikTokGlyph className="h-5 w-5" />
                </a>
                <a
                  href={infoWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex min-h-10 items-center gap-1.5 rounded-full bg-hoja px-3.5 text-sm font-medium text-white transition hover:bg-savia"
                  onClick={closeMenu}
                >
                  <WhatsAppGlyph className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
