import { MapPin } from "lucide-react";
import { MapEmbed } from "@/components/MapEmbed";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { directionsUrl } from "@/lib/maps";
import { pageMetadata } from "@/lib/seo";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Cómo llegar a Roots Protein Bar | Santa Anita",
  description:
    "Dirección, horarios y delivery de Roots Protein Bar en Calle Las Avutardas 194, Santa Anita. Escríbenos por WhatsApp.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <main id="contenido" className="bg-avena pt-[var(--header-h)] text-tinta" data-surface="light">
      <section>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-16">
          <div>
            <h1 className="chapter-title max-w-[14ch] text-savia">Visítanos o pide por WhatsApp</h1>
            <p className="mt-6 text-lg">
              {site.streetAddress}, {site.district}, {site.city}
            </p>
            {site.addressReference ? <p className="mt-2 max-w-[42ch]">{site.addressReference}</p> : null}
            <p className="mt-3">{site.hours}</p>
            <p className="mt-5 inline-flex items-center gap-2 font-medium">
              <WhatsAppGlyph className="h-5 w-5 text-hoja" />
              {site.whatsappDisplay}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={infoWhatsAppUrl()} event="click_whatsapp">
                <WhatsAppGlyph className="h-5 w-5" />
                Pedir por WhatsApp
              </Button>
              <Button href={directionsUrl()} variant="line" event="click_como_llegar">
                <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                Cómo llegar
              </Button>
              <Button href={site.instagramUrl} variant="line">
                <InstagramGlyph className="h-5 w-5" />
                Instagram
              </Button>
              <Button href={site.tiktokUrl} variant="line">
                <TikTokGlyph className="h-5 w-5" />
                TikTok
              </Button>
            </div>
            {site.payments.length > 0 ? <p className="mt-8">Pagos: {site.payments.join(", ")}.</p> : null}
          </div>
          <MapEmbed className="h-72 w-full sm:h-96 lg:h-[28rem]" tall={false} />
        </div>
      </section>
    </main>
  );
}
