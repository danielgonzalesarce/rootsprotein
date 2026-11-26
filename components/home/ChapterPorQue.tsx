import Image from "next/image";
import { Chapter } from "@/components/home/Chapter";
import { PorQueClaims } from "@/components/home/PorQueClaims";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { galleryImages } from "@/data/images";
import { proteinPeak } from "@/lib/menu";

export function ChapterPorQue() {
  const peak = proteinPeak();
  const photo = galleryImages[2] ?? galleryImages[0];

  const points = [
    {
      title: `Hasta ${peak} g`,
      text: "La proteína va en el waffle y en el vaso.",
    },
    {
      title: "Sin gluten, lactosa ni azúcar",
      text: "Macros claros antes de pedir.",
    },
    {
      title: "Pre, post o antojo",
      text: "En local o por WhatsApp, a tu ritmo.",
    },
  ];

  return (
    <Chapter surface="salvia" tone="light">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <figure className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-savia shadow-[0_28px_60px_-36px_rgba(26,42,22,0.45)] lg:aspect-[4/5] lg:min-h-[32rem]">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-savia/70 via-transparent to-transparent" />
          {photo?.caption ? (
            <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16 text-sm text-avena sm:px-6">
              {photo.caption}
            </figcaption>
          ) : null}
        </figure>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Por qué Roots</p>
          <SectionTitle className="mt-3 max-w-[12ch] text-savia">Antojo con propósito</SectionTitle>
          <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-tinta/65">
            Somos un protein bar: comes rico y sumas proteína sin complicarte.
          </p>

          <PorQueClaims points={points} />

          <div className="mt-9">
            <Button href="/carta">Ver la carta</Button>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
