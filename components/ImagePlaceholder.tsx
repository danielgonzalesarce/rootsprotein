import { cn } from "@/lib/cn";

function LeafMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M32 44c0-10 6-16 14-18-2 10-8 16-14 18z"
        fill="currentColor"
      />
      <path d="M32 44c0-10-6-16-14-18 2 10 8 16 14 18z" fill="currentColor" opacity="0.55" />
      <path d="M32 44V28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function ImagePlaceholder({
  label,
  className,
}: {
  label?: string;
  className?: string;
  scene?: string;
}) {
  return (
    <div className={cn("arch relative flex flex-col items-center justify-center gap-2 bg-salvia px-4 text-center text-hoja", className)}>
      <LeafMark />
      {label ? <span className="max-w-[8rem] text-xs font-medium leading-snug">{label}</span> : null}
    </div>
  );
}
