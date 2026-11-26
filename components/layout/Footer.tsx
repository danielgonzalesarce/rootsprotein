import Link from "next/link";
import { Clock3, MapPin, Star } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { PaymentGlyph } from "@/components/icons/PaymentGlyphs";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";
import { directionsUrl } from "@/lib/maps";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "/carta", label: "Carta" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cuenta", label: "Sellos" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-savia text-avena" data-surface="dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-hoja/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-avena/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 py-8 pb-24 sm:px-6 sm:pb-10 md:px-8 md:py-9 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <Logo tone="avena" imageClassName="!h-10 sm:!h-11" />
            <p className="mt-3 max-w-[20ch] font-display text-[1.35rem] leading-[1.1] tracking-[-0.035em] text-avena sm:text-[1.5rem]">
              {site.tagline}
            </p>
            <p className="mt-2 max-w-[36ch] text-sm text-avena/50">{site.supportLine}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              className="inline-flex h-10 items-center gap-2 rounded-full bg-hoja px-4 text-sm font-medium text-white transition-colors hover:bg-avena hover:text-savia"
              href={infoWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              Pedir
            </a>
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-avena/8 text-avena ring-1 ring-avena/15 transition hover:bg-avena/14"
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramGlyph className="h-4 w-4" />
            </a>
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-avena/8 text-avena ring-1 ring-avena/15 transition hover:bg-avena/14"
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <TikTokGlyph className="h-4 w-4" />
            </a>
            {site.googleReviewUrl ? (
              <a
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-avena/8 px-3.5 text-sm text-avena ring-1 ring-avena/15 transition hover:bg-avena/14"
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="h-3.5 w-3.5 fill-current" strokeWidth={1.5} aria-hidden="true" />
                Reseña
              </a>
            ) : null}
          </div>
        </div>

        <nav
          className="mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-avena/[0.06] p-1 ring-1 ring-avena/10"
          aria-label="Pie de página"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-9 items-center rounded-full px-3.5 text-sm text-avena/70 transition hover:bg-avena/10 hover:text-avena"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 flex flex-col gap-3 border-t border-avena/10 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-col gap-2 text-sm text-avena/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            <a
              href={directionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-avena"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-hoja" strokeWidth={1.5} aria-hidden="true" />
              {site.streetAddress}, {site.district}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 shrink-0 text-hoja" strokeWidth={1.5} aria-hidden="true" />
              {site.hours}
            </span>
          </div>

          {site.payments.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {site.payments.map((method) => (
                <li
                  key={method}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-avena/[0.07] px-2.5 text-xs text-avena/75 ring-1 ring-avena/10"
                >
                  <PaymentGlyph method={method} className="h-4 w-4" />
                  {method}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-avena/10 pt-4 text-[0.78rem] text-avena/40">
          <p>© 2026 {site.name}</p>
          <p className="tracking-[0.12em]">{site.hashtag}</p>
        </div>
      </div>
    </footer>
  );
}
