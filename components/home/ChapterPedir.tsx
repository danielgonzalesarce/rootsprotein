import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export function ChapterPedir() {
  return (
    <div>
      <SectionTitle>Pídelo por WhatsApp</SectionTitle>
      <p className="mt-4 max-w-[36ch]">
        Escríbenos al {site.whatsappDisplay}. La cobertura y el costo de envío se confirman por el chat.
      </p>
      {site.deliveryZones.length > 0 ? (
        <ul className="mt-4 max-w-[36ch] list-disc pl-5">
          {site.deliveryZones.map((zone) => (
            <li key={zone}>{zone}</li>
          ))}
        </ul>
      ) : null}
      {site.deliveryNote ? <p className="mt-3 max-w-[36ch]">{site.deliveryNote}</p> : null}
      {site.payments.length > 0 ? <p className="mt-4">Pagos: {site.payments.join(", ")}.</p> : null}
      <div className="mt-8">
        <Button href={infoWhatsAppUrl()} event="click_whatsapp">
          <WhatsAppGlyph className="h-5 w-5" />
          Pedir por WhatsApp
        </Button>
      </div>
      {site.googleReviewUrl ? (
        <div className="mt-10">
          <p>¿Ya nos visitaste? Déjanos tu reseña en Google.</p>
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
