"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
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
  { href: "/carta", label: "Nuestra carta" },
  { href: "/#nosotros", label: "Nosotros" },
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
  const [tone, setTone] = useState<"light" | "dark">("light");
  const menuRef = useRef<HTMLDivElement>(null);
  const hydrated = useCartHydrated();
  const count = useCartStore((state) => cartCount(state.items));
  const pulse = useCartStore((state) => state.pulse);
  const openCart = useCartStore((state) => state.open);
  const closeMenu = () => setMenuOpen(false);

  useFocusTrap(menuOpen, menuRef, closeMenu);

  useEffect(() => {
    const frame = { id: 0 };
    const update = () => {
      const nextRaised = window.scrollY > 8;
      const probeY = 8 + Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 + 16;
      const el = document.elementFromPoint(48, Number.isFinite(probeY) ? probeY : 96);
      const surface = el?.closest("[data-surface]")?.getAttribute("data-surface");
      const nextTone = surface === "dark" ? "dark" : "light";
      setRaised((current) => (current === nextRaised ? current : nextRaised));
      setTone((current) => (current === nextTone ? current : nextTone));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame.id);
      frame.id = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.id);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const overlay = pathname === "/" && !raised && !menuOpen;
  const dark = !overlay && !menuOpen && tone === "dark";
  const ink = dark ? "avena" : "savia";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-[var(--header-h)] motion-reduce:transition-none",
        overlay && "bg-transparent text-tinta",
        !overlay && !dark && "bg-avena/88 text-tinta shadow-[0_8px_24px_rgba(31,51,25,0.06)] backdrop-blur-md",
        dark && "bg-savia/90 text-avena shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-full w-full items-center justify-between gap-2 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Logo tone={ink} onClick={closeMenu} className="lg:justify-self-start" />

        <nav className="hidden items-center gap-1 lg:flex lg:justify-self-center" aria-label="Principal">
          {links.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className="inline-flex min-h-11 items-center px-3 text-base"
              >
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-px",
                      dark ? "bg-avena" : "bg-hoja",
                      !current && "opacity-0",
                    )}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center lg:justify-self-end">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Roots Protein Bar"
            className="hidden h-11 w-11 items-center justify-center rounded-full sm:inline-flex"
          >
            <InstagramGlyph className="h-5 w-5" />
          </a>
          <a
            href={site.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de Roots Protein Bar"
            className="hidden h-11 w-11 items-center justify-center rounded-full sm:inline-flex"
          >
            <TikTokGlyph className="h-5 w-5" />
          </a>
          <Link
            href="/carta#buscar"
            aria-label="Buscar en la carta"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            onClick={(event) => {
              closeMenu();
              if (pathname === "/carta") {
                event.preventDefault();
                document.getElementById("buscar")?.focus();
              }
            }}
          >
            <Search aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full"
            aria-label="Abrir pedido"
            onClick={() => {
              closeMenu();
              openCart();
            }}
          >
            <ShoppingBag aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            {hydrated && count > 0 ? (
              <span className="absolute right-0.5 top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-hoja px-1 text-[0.875rem] leading-none text-white">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" strokeWidth={1.5} /> : <Menu aria-hidden="true" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 lg:hidden" onClick={closeMenu}>
          <div className="absolute inset-0 bg-savia/40" />
          <div
            ref={menuRef}
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            tabIndex={-1}
            className="relative border-t border-hoja/20 bg-avena px-4 py-4 text-tinta outline-none"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="flex flex-col" aria-label="Principal móvil">
              {links.map((link) => {
                const current = isCurrent(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-full px-3 text-base",
                      current && "bg-salvia",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 flex flex-col border-t border-hoja/15 pt-3">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-full px-3"
              >
                <InstagramGlyph className="h-5 w-5" />
                Instagram
              </a>
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-3 rounded-full px-3"
              >
                <TikTokGlyph className="h-5 w-5" />
                TikTok
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
