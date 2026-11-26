import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { PaymentMethods } from "@/components/ui/PaymentMethods";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export function ChapterPedir() {
  return (
    <div>
      <SectionTitle className="text-avena">Pídelo por WhatsApp</SectionTitle>
      <p className="mt-4 max-w-[36ch] text-avena/75">
        Escríbenos al {site.whatsappDisplay}. La cobertura y el costo de envío se confirman por el chat.
      </p>
      {site.deliveryZones.length > 0 ? (
        <ul className="mt-4 max-w-[36ch] list-disc pl-5 text-avena/75">
          {site.deliveryZones.map((zone) => (
            <li key={zone}>{zone}</li>
          ))}
        </ul>
      ) : null}
      {site.deliveryNote ? <p className="mt-3 max-w-[36ch] text-avena/75">{site.deliveryNote}</p> : null}
      {site.payments.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-salvia/70">Pagos</p>
          <PaymentMethods className="mt-3" chipClassName="border-avena/15 bg-avena/10 text-avena" />
        </div>
      ) : null}
      <div className="mt-8">
        <Button href={infoWhatsAppUrl()} event="click_whatsapp">
          <WhatsAppGlyph className="h-5 w-5" />
          Pedir por WhatsApp
        </Button>
      </div>
      {site.googleReviewUrl ? (
        <div className="mt-10">
          <p className="text-avena/80">¿Ya nos visitaste? Déjanos tu reseña en Google.</p>
          <div className="mt-4">
            <Button href={site.googleReviewUrl} variant="line" surface="dark">
              Dejar una reseña
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
