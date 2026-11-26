import { Star } from "lucide-react";
import { Chapter } from "@/components/home/Chapter";
import { GoogleReviewInvite } from "@/components/home/GoogleReviewInvite";
import { ResenasQuotes } from "@/components/home/ResenasQuotes";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";

export function ChapterResenas() {
  return (
    <Chapter surface="avena" tone="light">
      <div className="flex flex-col gap-6 border-b border-savia/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-hoja">Google</p>
          <SectionTitle className="mt-3 max-w-[14ch]">Lo que dicen nuestros clientes</SectionTitle>
          <p className="mt-4 flex items-center gap-2 text-sm text-tinta/55">
            <span className="inline-flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#FABB05] text-[#FABB05]" strokeWidth={1.5} />
              ))}
            </span>
            <span className="font-medium text-savia">5.0</span>
            <span>· Reseñas en Google Maps</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {site.googleReviewUrl ? (
            <Button href={site.googleReviewUrl} event="click_google_review" target="_blank" rel="noopener noreferrer">
              Dejar reseña
            </Button>
          ) : null}
          {site.mapsUrl ? (
            <Button href={site.mapsUrl} variant="line" target="_blank" rel="noopener noreferrer">
              Ver en Google Maps
            </Button>
          ) : null}
        </div>
      </div>

      <ResenasQuotes reviews={reviews} />

      <GoogleReviewInvite className="mt-10 sm:mt-12" />
    </Chapter>
  );
}
