import { Clock3, MapPin } from "lucide-react";
import { Chapter } from "@/components/home/Chapter";
import { MapEmbed } from "@/components/MapEmbed";
import { Button } from "@/components/ui/Button";
import { PaymentMethods } from "@/components/ui/PaymentMethods";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { directionsUrl } from "@/lib/maps";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export function ChapterLugar() {
  return (
    <Chapter surface="avena" tone="light">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <div className="max-w-xl lg:pt-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Visítanos</p>
          <SectionTitle className="mt-3 max-w-[14ch]">
            {site.streetAddress}, {site.district}
          </SectionTitle>
          <p className="mt-4 max-w-[34ch] text-lg leading-relaxed text-tinta/65">
            Pasa al local o pide por WhatsApp. Estamos abiertos todos los días.
          </p>

          <dl className="mt-9 border-t border-savia/15">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-savia/15 py-5">
              <Clock3 className="mt-0.5 h-5 w-5 text-hoja" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <dt className="text-sm font-medium text-savia">Horario</dt>
                <dd className="mt-1 text-tinta/65">{site.hours}</dd>
              </div>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-savia/15 py-5">
              <MapPin className="mt-0.5 h-5 w-5 text-hoja" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <dt className="text-sm font-medium text-savia">Dirección</dt>
                <dd className="mt-1 text-tinta/65">
                  {site.streetAddress}
                  <br />
                  {site.district}, {site.city}
                </dd>
              </div>
            </div>
            {site.payments.length > 0 ? (
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 py-5">
                <span className="mt-0.5 nums text-sm font-medium tracking-wide text-hoja" aria-hidden="true">
                  S/
                </span>
                <div>
                  <dt className="text-sm font-medium text-savia">Pagos</dt>
                  <dd className="mt-3">
                    <PaymentMethods />
                  </dd>
                </div>
              </div>
            ) : null}
          </dl>
        </div>

        <div>
          <MapEmbed
            tall={false}
            className="aspect-[4/3] rounded-[1.5rem] lg:aspect-[4/5] lg:min-h-[28rem]"
          />

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button href={infoWhatsAppUrl()} event="click_whatsapp">
              <WhatsAppGlyph className="h-5 w-5" />
              Pedir por WhatsApp
            </Button>
            <Button href={directionsUrl()} variant="line" event="click_como_llegar">
              <MapPin aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              Cómo llegar
            </Button>
            <Button href="/contacto" variant="line">
              Contacto
            </Button>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
