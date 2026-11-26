import { Button } from "@/components/ui/Button";
import { StatusPage } from "@/components/system/StatusPage";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="404"
      title="No encontramos esta página"
      description="El enlace puede haber cambiado o la página ya no existe. Vuelve al inicio o abre la carta."
    >
      <Button href="/">Volver al inicio</Button>
      <Button href="/carta" variant="line">
        Ver la carta
      </Button>
      <Button href={infoWhatsAppUrl()} variant="line">
        Pedir por WhatsApp
      </Button>
    </StatusPage>
  );
}
