"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { StatusPage } from "@/components/system/StatusPage";
import { infoWhatsAppUrl } from "@/lib/whatsapp";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      eyebrow="Error"
      title="Algo no cargó bien"
      description="Hubo un problema al mostrar esta página. Intenta de nuevo o vuelve al inicio."
    >
      <Button type="button" onClick={() => retry()}>
        Intentar de nuevo
      </Button>
      <Button href="/" variant="line">
        Ir al inicio
      </Button>
      <Button href={infoWhatsAppUrl()} variant="line">
        Pedir por WhatsApp
      </Button>
    </StatusPage>
  );
}
