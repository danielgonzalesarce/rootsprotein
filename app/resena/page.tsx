import { ExternalLink, Star } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Deja tu reseña en Google | ${site.name}`,
  description:
    "Cuéntanos cómo te fue en Roots Protein Bar. Tu reseña se publica en Google Maps y ayuda a más personas a encontrarnos en Santa Anita.",
  path: "/resena",
  keywords: ["reseña Roots Protein Bar", "opinión Google Maps", "protein bar Santa Anita reseñas"],
});

export default function ResenaPage() {
  return (
    <main id="contenido" className="bg-avena text-tinta" data-surface="light">
      <section className="mx-auto flex min-h-[75svh] w-full max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-xl text-center">
          <div className="flex justify-center">
            <Logo tone="savia" imageClassName="!h-14 sm:!h-16" />
          </div>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-hoja">Google Maps</p>
          <h1 className="chapter-title mx-auto mt-3 max-w-[14ch] text-savia">¿Cómo estuvo tu visita?</h1>
          <p className="mx-auto mt-4 max-w-[36ch] text-base text-tinta/65 sm:text-lg">
            Tu reseña se publica directo en Google Maps. También la destacamos en nuestra web.
          </p>

          <div className="mx-auto mt-8 flex justify-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-6 w-6 fill-[#FABB05] text-[#FABB05]" strokeWidth={1.5} />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              href={site.googleReviewUrl}
              event="click_google_review"
              className="min-w-[16rem]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden="true" />
              Escribir reseña en Google
              <ExternalLink className="h-4 w-4 opacity-70" strokeWidth={1.5} aria-hidden="true" />
            </Button>
            <p className="max-w-[32ch] text-sm text-tinta/50">
              Te llevamos al formulario oficial de Google. Inicia sesión con tu cuenta de Google si te lo pide.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
