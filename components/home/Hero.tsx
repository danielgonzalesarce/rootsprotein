import Image from "next/image";
import { Bike, Dumbbell, Leaf, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Frappe } from "@/components/illustrations/Frappe";
import { Waffle } from "@/components/illustrations/Waffle";
import { heroImage } from "@/data/images";
import { site } from "@/data/site";
import { proteinPeak } from "@/lib/menu";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

const [titleLead, titleRest] = site.tagline.split(", ");

function HeroStill() {
  if (heroImage) {
    return (
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 58vw"
        className="object-cover object-[center_30%]"
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 1000" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <path
          fill="#e4ebd8"
          d="M230 30c80-50 240 40 330-20 160-70 270 90 240 270-24 190 50 260-20 430-60 180-190 270-350 240-190-36-220-210-270-360-55-190-70-300 70-560z"
        />
      </svg>
      <div className="absolute bottom-[6%] right-[4%] w-[42%] max-w-[16rem]">
        <Frappe className="h-auto w-full" />
      </div>
      <div className="absolute bottom-[16%] right-[40%] w-[36%] max-w-[13rem]">
        <Waffle className="h-auto w-full" />
      </div>
    </div>
  );
}

const benefits = [
  { icon: Dumbbell, label: `Hasta ${proteinPeak()} g de proteína` },
  { icon: Leaf, label: "Sin gluten, lactosa ni azúcar" },
  { icon: Bike, label: "Delivery por WhatsApp" },
];

export function Hero() {
  return (
    <section className="relative bg-avena text-tinta" data-surface="light">
      <div className="hero-bleed-mobile relative h-[42svh] min-h-52 lg:hidden">
        <HeroStill />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-avena/80 to-transparent" />
      </div>

      <div className="relative lg:min-h-dvh">
        <div className="hero-bleed absolute inset-y-0 right-0 hidden w-[54%] lg:block">
          <HeroStill />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-avena via-avena/45 to-transparent" />
        </div>

        <div className="relative z-10 flex w-full min-w-0 max-w-full flex-col justify-center px-4 pb-16 pt-6 sm:px-6 lg:min-h-dvh lg:w-[58%] lg:px-10 lg:py-28">
          <h1 className="hero-title text-savia">
            <span className="hero-line block">{titleLead},</span>
            <span className="hero-line hero-line-2 block">{titleRest}</span>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.0625rem]">
            Waffles, frappés y bebidas altas en proteína, en {site.district}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={infoWhatsAppUrl()} event="click_whatsapp">
              <WhatsAppGlyph className="h-5 w-5" />
              Pedir por WhatsApp
            </Button>
            <Button href="/carta" variant="line">
              Ver nuestra carta
            </Button>
          </div>
          <ul className="mt-8 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <li key={benefit.label} className="flex items-center gap-3 lg:gap-0">
                  {index > 0 ? <span className="mr-4 hidden h-8 w-px bg-tinta/20 lg:block" aria-hidden="true" /> : null}
                  <Icon aria-hidden="true" className="h-7 w-7 shrink-0 text-hoja" strokeWidth={1.5} />
                  <span className="lg:ml-3">{benefit.label}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 inline-flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-6 w-6 shrink-0 text-hoja" strokeWidth={1.5} />
            Estamos en {site.district}, {site.city}
          </p>
        </div>
      </div>
    </section>
  );
}
