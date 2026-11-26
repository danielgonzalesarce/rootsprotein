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

const claims = [
  { n: "01", label: "Alto en proteína" },
  { n: "02", label: "Sin gluten" },
  { n: "03", label: "Sin lactosa" },
  { n: "04", label: "Sin azúcar" },
];

function HeroStill({ className }: { className?: string }) {
  if (heroImage) {
    return (
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 70vw"
        className={className ?? "object-cover object-[center_30%]"}
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

function Claims({ className }: { className?: string }) {
  return (
    <ol className={cn(className)}>
      {claims.map((claim, index) => (
        <li
          key={claim.n}
          className={cn(
            "grid grid-cols-[auto_1fr] items-baseline gap-3 py-2.5 sm:gap-4 sm:py-3",
            index < claims.length - 1 && "border-b border-avena/12",
          )}
        >
          <span className="nums text-sm tracking-wide text-hoja">{claim.n}</span>
          <span className="text-[0.98rem] text-avena/88 sm:text-[1.02rem]">{claim.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function Hero() {
  const featured = getProduct(featuredId);
  const featuredMacros = featured ? resolveMacros(featured) : undefined;
  const featuredMedia = featured ? resolveProductMedia(featured) : null;
  const featuredFallback = galleryImages[2] ?? galleryImages[0];
  const sellosPhoto = galleryImages[0];

  return (
    <section
      className="relative bg-avena px-3 pb-3 pt-[calc(var(--header-h)+0.75rem)] text-tinta sm:px-4 md:px-6"
      data-surface="light"
    >
      <div className="mx-auto grid max-w-[1400px] gap-3 lg:min-h-[calc(100svh-var(--header-h)-1.5rem)] lg:grid-cols-12 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-3.5">
        {/* Mobile: flow layout. Desktop: photo panel with overlay */}
        <div className="relative overflow-hidden rounded-[1.5rem] bg-savia text-avena shadow-[0_28px_60px_-36px_rgba(26,42,22,0.55)] sm:rounded-[1.75rem] lg:col-span-8 lg:row-span-2 lg:min-h-0">
          <div className="relative aspect-[5/4] sm:aspect-[16/11] lg:absolute lg:inset-0 lg:aspect-auto">
            <HeroStill className="object-cover object-[center_28%] opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-savia via-savia/55 to-savia/20 lg:bg-gradient-to-r lg:from-savia lg:via-savia/80 lg:to-savia/35" />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-savia via-savia/40 to-transparent lg:block" />
          </div>

          <div className="relative z-10 px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-end lg:p-10 lg:pt-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-salvia/85">{site.name}</p>
                <h1 className="hero-title mt-2 max-w-[12ch] text-[clamp(2.35rem,9vw,3.4rem)] text-avena lg:mt-3 lg:text-[clamp(2.8rem,4.2vw,4.6rem)]">
                  <span className="hero-line block">{titleLead},</span>
                  <span className="hero-line hero-line-2 block">{titleRest}</span>
                </h1>
                <p className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-avena/72 sm:mt-4 sm:text-[1.05rem]">
                  Protein bar en Santa Anita: waffles, frappés y bebidas altas en proteína.
                </p>
                <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap">
                  <Button href={infoWhatsAppUrl()} event="click_whatsapp">
                    <WhatsAppGlyph className="h-4 w-4" />
                    Pedir por WhatsApp
                  </Button>
                  <Button href="/carta" variant="line" surface="dark">
                    Ver carta
                  </Button>
                </div>
              </div>

              <Claims className="border-t border-avena/15 pt-1 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0" />
            </div>
          </div>
        </div>

        <Link
          href="/carta"
          className="group relative flex min-h-[15rem] overflow-hidden rounded-[1.5rem] bg-savia text-avena shadow-[0_22px_48px_-30px_rgba(26,42,22,0.5)] transition-transform duration-500 hover:-translate-y-0.5 sm:min-h-[16rem] sm:rounded-[1.75rem] lg:col-span-4 lg:min-h-0"
        >
          {featuredMedia ? (
            <Image
              src={featuredMedia.src}
              alt={featuredMedia.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className={cn(
                "object-cover transition-transform duration-700 group-hover:scale-[1.05]",
                !featuredMedia.isProductPhoto && "opacity-90 saturate-[0.92]",
              )}
            />
          ) : featuredFallback ? (
            <Image
              src={featuredFallback.src}
              alt={featuredFallback.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-savia via-savia/55 to-savia/10" />
          <div className="relative flex h-full w-full flex-col justify-between p-4 sm:p-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-salvia/85">Lo más pedido</p>
            <div>
              <p className="font-display text-[1.7rem] leading-[1.05] tracking-[-0.035em] sm:text-[2.15rem]">
                {featured?.name ?? "Waffle Caramel Crunch"}
              </p>
              {featured?.description ? (
                <p className="mt-2 max-w-[26ch] text-sm leading-snug text-avena/70">{featured.description}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4">
                {featured ? (
                  <p className="nums text-xl font-medium text-avena">{priceLabel(featured)}</p>
                ) : null}
                {featuredMacros ? (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-avena/95 px-2.5 py-1 text-[0.75rem] font-medium text-savia">
                    <span className="nums">{featuredMacros.protein} g</span>
                    <span className="text-tinta/45">prot.</span>
                  </p>
                ) : null}
              </div>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-hoja px-4 text-sm font-medium text-white transition-colors group-hover:bg-avena group-hover:text-savia sm:mt-5">
                Pedir ahora
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Link>

        <div className="relative overflow-hidden rounded-[1.5rem] bg-savia text-avena shadow-[0_22px_48px_-30px_rgba(26,42,22,0.5)] sm:rounded-[1.75rem] lg:col-span-4">
          {sellosPhoto ? (
            <Image
              src={sellosPhoto.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover opacity-40"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-savia via-savia/85 to-savia/45" />
          <div className="relative flex h-full min-h-[13rem] flex-col justify-between p-4 sm:min-h-[14rem] sm:p-6">
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-salvia/85">{loyalty.name}</p>
              <p className="mt-2 font-display text-[1.85rem] leading-[1.02] tracking-[-0.04em] sm:mt-3 sm:text-[2.05rem]">
                {loyalty.stampsNeeded} sellos.
                <br />
                Un premio.
              </p>
              <ul className="mt-4 grid grid-cols-8 gap-1.5 sm:mt-5" aria-hidden="true">
                {Array.from({ length: loyalty.stampsNeeded }, (_, index) => (
                  <li key={index} className="grid place-items-center">
                    <StampMark
                      filled={index < 3}
                      interactive={false}
                      className="w-full max-w-none"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-avena/65 sm:mt-4">
                Escanea el QR y junta raíces en cada visita.
              </p>
            </div>
            <Link
              href="/cuenta"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-hoja px-4 text-sm font-medium text-white transition hover:bg-avena hover:text-savia sm:mt-5"
            >
              Mis sellos
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
