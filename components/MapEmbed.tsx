import { ArchFrame } from "@/components/ArchFrame";
import { mapEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/cn";

export function MapEmbed({ className, tall = true }: { className?: string; tall?: boolean }) {
  return (
    <ArchFrame className={cn("w-full overflow-hidden bg-salvia", tall && "aspect-[3/4]", className)}>
      <iframe
        title="Mapa de Roots Protein Bar en Calle Las Avutardas 194, Santa Anita"
        src={mapEmbedUrl()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </ArchFrame>
  );
}
