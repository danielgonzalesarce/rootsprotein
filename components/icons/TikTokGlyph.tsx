import { cn } from "@/lib/cn";

const note =
  "M15.05 2.2c.45 2.35 1.85 3.9 4.15 4.25v2.35a6.4 6.4 0 0 1-3.85-1.2v6.05c0 3.15-2.5 5.55-5.65 5.55S4.05 17 4.05 13.85c0-3.05 2.4-5.4 5.45-5.55v2.5c-1.55.15-2.75 1.45-2.75 3.05 0 1.7 1.35 3.05 3.05 3.05s3.05-1.35 3.05-3.05V2.2h2.2Z";

export function TikTokGlyph({ className, branded = true }: { className?: string; branded?: boolean }) {
  if (!branded) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d={note} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={cn("overflow-visible", className)} aria-hidden="true">
      <path fill="#25F4EE" d={note} transform="translate(0.55 0.55)" />
      <path fill="#FE2C55" d={note} transform="translate(-0.55 -0.55)" />
      <path fill="currentColor" d={note} />
    </svg>
  );
}
