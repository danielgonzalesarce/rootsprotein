import { ChapterCurve } from "@/components/home/Chapter";
import { ChapterPedir } from "@/components/home/ChapterPedir";
import { MapEmbed } from "@/components/MapEmbed";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { directionsUrl } from "@/lib/maps";

export function ChapterLugar() {
  return (
    <section data-surface="dark" className="on-dark relative bg-savia text-avena">
      <ChapterCurve variant="f" fill="savia" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
        <div className="lg:col-span-6">
          <SectionTitle>
            {site.streetAddress}, {site.district}
          </SectionTitle>
          <p className="mt-4 max-w-[36ch]">
            {site.name} es una cafetería de {site.district} donde el antojo y la proteína van juntos.
          </p>
          {site.addressReference ? <p className="mt-4">{site.addressReference}</p> : null}
          <p className="mt-6">{site.hours}</p>
          <div className="mt-8">
            <Button href={directionsUrl()} variant="line" surface="dark" event="click_como_llegar">
              Cómo llegar
            </Button>
          </div>
          <div className="mt-12 border-t border-avena/25 pt-10">
            <ChapterPedir />
          </div>
        </div>
        <div className="lg:col-span-6">
          <MapEmbed className="mx-auto h-[26rem] w-full max-w-md lg:mx-0 lg:ml-auto lg:h-[34rem]" />
        </div>
      </div>
    </section>
  );
}
