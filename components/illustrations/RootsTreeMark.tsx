import { cn } from "@/lib/cn";

/** Emblema del árbol del logo de Roots, para sellos y marcas. */
export function RootsTreeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("overflow-visible", className)} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {/* Copa */}
      <ellipse cx="32" cy="22" rx="14" ry="11" fill="currentColor" opacity="0.92" />
      <circle cx="24" cy="20" r="4.2" fill="currentColor" opacity="0.55" />
      <circle cx="40" cy="19" r="4" fill="currentColor" opacity="0.55" />
      <circle cx="32" cy="15" r="3.6" fill="currentColor" opacity="0.4" />
      <circle cx="28" cy="25" r="3.2" fill="currentColor" opacity="0.35" />
      <circle cx="36" cy="25" r="3.2" fill="currentColor" opacity="0.35" />
      {/* Tronco */}
      <path
        d="M30.2 30c.4 4 .6 7.5.8 11.5h2c.2-4 .4-7.5.8-11.5-.8-.2-1.8-.3-1.8-.3s-1 .1-1.8.3Z"
        fill="currentColor"
      />
      {/* Ramas */}
      <path
        d="M31 31.5c-3.5-1.5-6.5-1.2-9 .8M33 31.5c3.5-1.5 6.5-1.2 9 .8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Raíces */}
      <path
        d="M31 42c-3 2.5-6.5 4-10 4.5M33 42c3 2.5 6.5 4 10 4.5M32 42c0 3.5-.2 6.5-.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M27 45c-2.5 1.8-4.5 2.2-7 2M37 45c2.5 1.8 4.5 2.2 7 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
