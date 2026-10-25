import Link from "next/link";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Nuestra carta" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="relative bg-savia text-avena" data-surface="dark">
      <svg
        className="absolute inset-x-0 top-0 h-12 w-full -translate-y-[calc(100%-1px)] text-savia md:h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 80 L0 34 C150 8 280 70 470 28 C690 0 830 66 1060 30 C1240 8 1360 54 1440 22 L1440 80 Z"
        />
      </svg>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <Logo tone="avena" />
          <p className="mt-5 max-w-[36ch]">{site.tagline}</p>
          <p className="mt-2 max-w-[40ch] text-[0.9375rem] text-avena/80">{site.supportLine}</p>
        </div>
        <div>
          <p className="font-medium">Horario</p>
          <p className="mt-2 text-avena/85">{site.hours}</p>
          <p className="mt-5 font-medium">Visítanos</p>
          <p className="mt-2 text-avena/85">
            {site.streetAddress}
            <br />
            {site.district}, {site.city}
          </p>
        </div>
        <div>
          <nav className="flex flex-col" aria-label="Pie de página">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            <a className="inline-flex min-h-11 items-center gap-2" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstagramGlyph className="h-5 w-5" />
              Instagram
            </a>
            <a className="inline-flex min-h-11 items-center gap-2" href={site.tiktokUrl} target="_blank" rel="noopener noreferrer">
              <TikTokGlyph className="h-5 w-5" />
              TikTok
            </a>
          </div>
          {site.payments.length > 0 ? (
            <p className="mt-4 text-[0.9375rem] text-avena/85">Pagos: {site.payments.join(", ")}</p>
          ) : null}
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-avena/15 px-5 py-5 text-[0.875rem] text-avena/75 md:px-10">
        <p>© 2026 {site.name}</p>
        <p>{site.hashtag}</p>
      </div>
    </footer>
  );
}
