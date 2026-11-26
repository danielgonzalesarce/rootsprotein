import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Frappe } from "@/components/illustrations/Frappe";
import { Waffle } from "@/components/illustrations/Waffle";
import { StampMark } from "@/components/loyalty/StampMark";
import { galleryImages, heroImage } from "@/data/images";
import { loyalty } from "@/data/loyalty";
import { site } from "@/data/site";
import { getProduct, priceLabel, resolveMacros } from "@/lib/menu";
import { resolveProductMedia } from "@/lib/product-media";
import { infoWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const [titleLead, titleRest] = site.tagline.split(", ");
const featuredId = "waffle-caramel-crunch";

function HeroStill({ className }: { className?: string }) {
  if (heroImage) {
    return (
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className={className ?? "object-cover object-center"}
      />
    );
  }

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-hoja to-savia">
      <div className="absolute bottom-[8%] right-[6%] w-[40%] max-w-[14rem]">
        <Frappe className="h-auto w-full" />
      </div>
      <div className="absolute bottom-[18%] right-[40%] w-[32%] max-w-[11rem]">
        <Waffle className="h-auto w-full" />
      </div>
    </div>
  );
}

/** Compacto — móvil */
function FeaturedRow({
  featured,
  featuredMacros,
  media,
}: {
  featured: ReturnType<typeof getProduct>;
  featuredMacros: ReturnType<typeof resolveMacros> | undefined;
  media: { src: string; alt?: string } | null | undefined;
}) {
  return (
    <Link
      href="/carta"
      className="group flex items-center gap-3 overflow-hidden rounded-[1.25rem] bg-avena/95 p-3 text-savia shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/40 backdrop-blur-md transition hover:-translate-y-0.5"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[0.9rem]">
        {media ? (
          <Image
            src={media.src}
            alt={media.alt ?? ""}
            fill
            sizes="56px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-hoja">Lo más pedido</p>
        <p className="mt-0.5 truncate font-display text-[1.05rem] leading-tight tracking-[-0.03em]">
          {featured?.name ?? "Waffle Caramel Crunch"}
        </p>
        <div className="mt-1 flex items-center gap-2">
          {featured ? <span className="nums text-sm">{priceLabel(featured)}</span> : null}
          {featuredMacros ? (
            <span className="rounded-full bg-salvia px-2 py-0.5 text-[0.65rem] font-medium">
              {featuredMacros.protein} g
            </span>
          ) : null}
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-savia/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function RootsRow() {
  return (
    <Link
      href="/cuenta"
      className="group flex items-center gap-3 overflow-hidden rounded-[1.25rem] bg-avena/95 p-3 text-savia shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/40 backdrop-blur-md transition hover:-translate-y-0.5"
    >
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[0.9rem] bg-salvia">
        <StampMark filled interactive={false} className="max-w-[2.55rem]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-hoja">{loyalty.name}</p>
        <p className="mt-0.5 font-display text-[1.05rem] leading-tight tracking-[-0.03em]">
          <span className="nums">{loyalty.stampsNeeded}</span> visitas = premio
        </p>
        <p className="mt-1 truncate text-[0.75rem] text-tinta/50">{loyalty.prizeLabel}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-savia/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/** Desktop — tarjeta con foto dominante */
function FeaturedPanel({
  featured,
  featuredMacros,
  media,
}: {
  featured: ReturnType<typeof getProduct>;
  featuredMacros: ReturnType<typeof resolveMacros> | undefined;
  media: { src: string; alt?: string; isProductPhoto?: boolean } | null | undefined;
}) {
  return (
    <Link
      href="/carta"
      className="hero-float group relative block overflow-hidden rounded-[1.35rem] bg-savia text-avena shadow-[0_24px_50px_-24px_rgba(0,0,0,0.55)] ring-1 ring-avena/20"
      style={{ ["--hero-float-i" as string]: 0 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {media ? (
          <Image
            src={media.src}
            alt={media.alt ?? ""}
            fill
            sizes="340px"
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-105",
              media.isProductPhoto === false && "saturate-[0.92]",
            )}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-savia via-savia/30 to-transparent" />
      </div>
      <div className="relative -mt-8 px-4 pb-4">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-salvia/75">Lo más pedido</p>
        <p className="mt-1 font-display text-[1.35rem] leading-[1.05] tracking-[-0.035em]">
          {featured?.name ?? "Waffle Caramel Crunch"}
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          {featured ? <span className="nums text-base font-medium">{priceLabel(featured)}</span> : null}
          {featuredMacros ? (
            <span className="rounded-full bg-avena px-2.5 py-0.5 text-[0.7rem] font-medium text-savia">
              {featuredMacros.protein} g prot.
            </span>
          ) : null}
          <span className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-hoja text-white transition group-hover:bg-avena group-hover:text-savia">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function RootsPanel() {
  return (
    <Link
      href="/cuenta"
      className="hero-float group relative flex items-center gap-3.5 overflow-hidden rounded-[1.35rem] bg-avena px-4 py-3.5 text-savia shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/50"
      style={{ ["--hero-float-i" as string]: 1 }}
    >
      <div className="relative grid h-[3.75rem] w-[3.75rem] shrink-0 place-items-center rounded-full bg-salvia shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <StampMark
          filled
          interactive={false}
          className="max-w-[2.5rem] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-hoja">{loyalty.name}</p>
        <p className="mt-0.5 font-display text-[1.2rem] leading-tight tracking-[-0.03em]">
          <span className="nums">{loyalty.stampsNeeded}</span> visitas = premio
        </p>
        <p className="mt-1 truncate text-[0.78rem] text-tinta/50">{loyalty.prizeLabel}</p>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-savia/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function Hero() {
  const featured = getProduct(featuredId);
  const featuredMacros = featured ? resolveMacros(featured) : undefined;
  const featuredMedia = featured ? resolveProductMedia(featured) : null;
  const featuredFallback = galleryImages[2] ?? galleryImages[0];
  const media = featuredMedia
    ? { src: featuredMedia.src, alt: featuredMedia.alt, isProductPhoto: featuredMedia.isProductPhoto }
    : featuredFallback
      ? { src: featuredFallback.src, alt: featuredFallback.alt }
      : null;

  return (
    <section
      className="relative overflow-hidden px-3 pb-7 pt-[calc(var(--header-h)+0.55rem)] text-tinta sm:px-4 sm:pb-9 md:px-6"
      data-surface="dark"
    >
      <div className="absolute inset-0 bg-[#0f1a0e]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-28 -top-10 h-[32rem] w-[32rem] rounded-full bg-hoja/40 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-[26rem] w-[26rem] rounded-full bg-[#c6a37a]/28 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-full -translate-x-1/2 bg-gradient-to-t from-avena via-avena/80 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.55rem] bg-savia text-avena shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-avena/20 sm:rounded-[1.85rem] lg:min-h-[calc(100svh-var(--header-h)-1.5rem)] lg:max-h-[46rem]">
        <div className="absolute inset-0">
          <HeroStill className="object-cover object-[center_28%] scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c140b] via-[#0c140b]/55 to-[#0c140b]/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c140b]/92 via-[#0c140b]/45 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(12,20,11,0.35)_70%)]" />
        </div>

        {/* Luz suave */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-0 h-40 w-[28rem] -translate-x-1/2 bg-hoja/20 blur-3xl"
        />

        {/* Desktop floats */}
        <div className="absolute bottom-6 right-6 z-10 hidden w-[20.5rem] flex-col gap-3 lg:flex xl:bottom-7 xl:right-7 xl:w-[21.5rem]">
          <FeaturedPanel featured={featured} featuredMacros={featuredMacros} media={media} />
          <RootsPanel />
        </div>

        <div className="relative z-10 flex flex-col justify-end px-4 py-5 sm:px-6 sm:py-7 lg:min-h-[calc(100svh-var(--header-h)-1.5rem)] lg:max-h-[46rem] lg:max-w-[44rem] lg:px-9 lg:pb-11 lg:pt-12 xl:px-11">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-salvia/75">{site.name}</p>

          <h1 className="mt-3 max-w-[11ch] font-display text-[clamp(2.55rem,8.5vw,4.35rem)] leading-[0.96] tracking-[-0.05em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
            <span className="hero-line block">{titleLead},</span>
            <span className="hero-line hero-line-2 block">{titleRest}</span>
          </h1>

          <p className="mt-4 max-w-[34ch] text-[0.98rem] leading-relaxed text-white/70 sm:text-[1.05rem]">
            Protein bar en Santa Anita: waffles, frappés y bebidas altas en proteína.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Button href={infoWhatsAppUrl()} event="click_whatsapp">
              <WhatsAppGlyph className="h-4 w-4" />
              Pedir por WhatsApp
            </Button>
            <Button href="/carta" variant="line" surface="dark">
              Ver carta
            </Button>
          </div>

          <div className="mt-6 grid gap-2.5 lg:hidden">
            <FeaturedRow featured={featured} featuredMacros={featuredMacros} media={media} />
            <RootsRow />
          </div>
        </div>
      </div>
    </section>
  );
}
