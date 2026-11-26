import { Clock3, CreditCard, MapPin } from "lucide-react";
import { MapEmbed } from "@/components/MapEmbed";
import { InstagramGlyph } from "@/components/icons/InstagramGlyph";
import { TikTokGlyph } from "@/components/icons/TikTokGlyph";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { Button } from "@/components/ui/Button";
import { PaymentMethods } from "@/components/ui/PaymentMethods";
import { site } from "@/data/site";
import { directionsUrl } from "@/lib/maps";
import { pageMetadata } from "@/lib/seo";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Cómo llegar a Roots Protein Bar | Calle Las Avutardas 194, Santa Anita",
  description:
    "Ubícanos en Calle Las Avutardas 194, Santa Anita, Lima. Horario, mapa, pagos Yape/Plin/efectivo y delivery por WhatsApp. Protein bar con waffles y frappés proteicos.",
  path: "/contacto",
  keywords: [
    "Roots Protein Bar dirección",
    "protein bar Santa Anita ubicación",
    "Calle Las Avutardas 194",
    "delivery protein bar Lima",
    "cómo llegar Roots Protein Bar",
  ],
});

export default function ContactoPage() {
  return (
    <main id="contenido" className="bg-avena text-tinta" data-surface="light">
      <section className="pt-[calc(var(--header-h)+1.5rem)]">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Contacto</p>
          <h1 className="chapter-title mt-3 max-w-[14ch] text-savia">Visítanos o pide por WhatsApp</h1>
          <p className="mt-4 max-w-[40ch] text-base text-tinta/65 sm:text-lg">
            Estamos en {site.district}. Pide delivery, pasa al local o escríbenos.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-8 sm:px-6 sm:py-10 md:gap-10 md:px-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-14 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[1.35rem] bg-white p-6 ring-1 ring-savia/8 sm:col-span-2 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-full bg-salvia text-hoja">
                <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-medium text-savia">Dirección</h2>
                <p className="mt-1 text-tinta/70">
                  {site.streetAddress}
                  <br />
                  {site.district}, {site.city}
                </p>
                {site.addressReference ? (
                  <p className="mt-2 text-sm text-tinta/55">{site.addressReference}</p>
                ) : null}
              </div>
            </div>
          </article>

          <article className="rounded-[1.35rem] bg-white p-6 ring-1 ring-savia/8 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-full bg-salvia text-hoja">
                <Clock3 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-medium text-savia">Horario</h2>
                <p className="mt-1 text-tinta/70">{site.hours}</p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.35rem] bg-white p-6 ring-1 ring-savia/8 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-full bg-salvia">
                <WhatsAppGlyph branded className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-medium text-savia">WhatsApp</h2>
                <p className="mt-1 text-tinta/70">{site.whatsappDisplay}</p>
                <p className="mt-1 text-sm text-tinta/55">Pedidos y delivery</p>
              </div>
            </div>
          </article>

          {site.payments.length > 0 ? (
            <article className="rounded-[1.35rem] bg-white p-6 ring-1 ring-savia/8 sm:col-span-2 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-full bg-salvia text-hoja">
                  <CreditCard className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-medium text-savia">Pagos</h2>
                  <div className="mt-3">
                    <PaymentMethods />
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap">
            <Button href={infoWhatsAppUrl()} event="click_whatsapp">
              <WhatsAppGlyph className="h-5 w-5" />
              Pedir por WhatsApp
            </Button>
            <Button href={directionsUrl()} variant="line" event="click_como_llegar">
              <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              Cómo llegar
            </Button>
            {site.googleReviewUrl ? (
              <Button href={site.googleReviewUrl} variant="line" event="click_google_review">
                Dejar reseña en Google
              </Button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-4 ring-1 ring-savia/10 transition-colors hover:bg-salvia/60"
            >
              <InstagramGlyph className="h-5 w-5" />
              <span className="text-sm font-medium text-savia">Instagram</span>
            </a>
            <a
              href={site.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-4 text-savia ring-1 ring-savia/10 transition-colors hover:bg-salvia/60"
            >
              <TikTokGlyph className="h-5 w-5" />
              <span className="text-sm font-medium">TikTok</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <MapEmbed className="h-80 w-full overflow-hidden rounded-[1.5rem] sm:h-[28rem] lg:h-full lg:min-h-[32rem]" tall={false} />
          <a
            href={directionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-savia px-5 text-sm font-medium text-avena transition-colors hover:bg-hoja"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Abrir en Google Maps
          </a>
        </div>
      </section>
    </main>
  );
}
