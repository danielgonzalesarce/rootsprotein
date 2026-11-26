import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

type Props = {
  tone?: "light" | "dark";
  className?: string;
};

export function GoogleReviewInvite({ tone = "light", className }: Props) {
  if (!site.googleReviewUrl) return null;

  const isDark = tone === "dark";

  return (
    <aside
      className={
        className ??
        (isDark
          ? "rounded-[1.5rem] border border-avena/15 bg-avena/5 px-5 py-6 sm:px-7 sm:py-7"
          : "rounded-[1.5rem] bg-salvia/55 px-5 py-6 ring-1 ring-savia/8 sm:px-7 sm:py-7")
      }
    >
      <p
        className={
          isDark
            ? "text-xs font-medium uppercase tracking-[0.18em] text-salvia/80"
            : "text-xs font-medium uppercase tracking-[0.18em] text-hoja"
        }
      >
        Tu opinión cuenta
      </p>
      <h3
        className={
          isDark
            ? "mt-3 max-w-[18ch] font-display text-[1.65rem] leading-[1.1] tracking-[-0.03em] text-avena sm:text-[1.9rem]"
            : "mt-3 max-w-[18ch] font-display text-[1.65rem] leading-[1.1] tracking-[-0.03em] text-savia sm:text-[1.9rem]"
        }
      >
        Déjanos tu reseña en Google
      </h3>
      <p className={isDark ? "mt-3 max-w-[42ch] text-avena/70" : "mt-3 max-w-[42ch] text-tinta/65"}>
        Se publica en Google Maps y ayuda a más gente a encontrarnos. Toma menos de un minuto.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          href={site.googleReviewUrl}
          event="click_google_review"
          surface={isDark ? "dark" : "light"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Star className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden="true" />
          Escribir reseña
          <ExternalLink className="h-4 w-4 opacity-70" strokeWidth={1.5} aria-hidden="true" />
        </Button>
        {site.mapsUrl ? (
          <Button
            href={site.mapsUrl}
            variant="line"
            surface={isDark ? "dark" : "light"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en Maps
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
