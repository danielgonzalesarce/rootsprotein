import Link from "next/link";
import { MapPin } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Logo } from "@/components/Logo";
import { PaymentGlyph } from "@/components/icons/PaymentGlyphs";
import { site } from "@/data/site";
import { directionsUrl } from "@/lib/maps";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Nuestra carta" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cuenta", label: "Mis sellos" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-savia text-avena" data-surface="dark">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-8 border-b border-avena/12 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo tone="avena" imageClassName="!h-14 sm:!h-16" />
            <p className="mt-5 max-w-[22ch] font-display text-[1.75rem] leading-[1.1] tracking-[-0.035em] text-avena sm:text-[2rem]">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.975rem] leading-relaxed text-avena/60">
              {site.supportLine}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              className="inline-flex h-11 items-center gap-2 rounded-full bg-hoja px-4 text-sm font-medium text-white transition-colors hover:bg-avena hover:text-savia"
              href={infoWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              Pedir
            </a>
            <a
              className="inline-flex h-11 items-center gap-2 rounded-full border border-avena/20 px-4 text-sm text-avena transition-colors hover:border-avena/40 hover:bg-avena/5"
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramGlyph className="h-5 w-5" />
              Instagram
            </a>
            <a
              className="inline-flex h-11 items-center gap-2 rounded-full border border-avena/20 px-4 text-sm text-avena transition-colors hover:border-avena/40 hover:bg-avena/5"
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokGlyph className="h-5 w-5" />
              TikTok
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-salvia/70">Visítanos</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-avena/85">
              {site.streetAddress}
              <br />
              {site.district}, {site.city}
            </p>
            <a
              href={directionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm text-hoja transition-colors hover:text-avena"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Cómo llegar
            </a>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-salvia/70">Horario</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-avena/85">{site.hours}</p>
          </div>

          {site.payments.length > 0 ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-salvia/70">Pagos</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {site.payments.map((method) => (
                  <li key={method} className="inline-flex items-center gap-2.5 text-[1.02rem] text-avena/85">
                    <PaymentGlyph method={method} className="h-6 w-6 shrink-0" />
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-salvia/70">Explorar</p>
            <nav className="mt-3 flex flex-col" aria-label="Pie de página">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-[1.02rem] text-avena/80 transition-colors hover:text-avena"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-avena/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-[0.875rem] text-avena/45 sm:px-6 md:px-8 lg:px-10">
          <p>© 2026 {site.name}</p>
          <p className="tracking-wide">{site.hashtag}</p>
        </div>
      </div>
    </footer>
  );
}
