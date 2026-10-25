import { useId } from "react";

export function Waffle({ className }: { className?: string }) {
  const clipId = useId().replace(/:/g, "");
  const lines = [52, 74, 96, 118, 140];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x="30" y="30" width="140" height="140" rx="36" />
        </clipPath>
      </defs>
      <rect x="30" y="30" width="140" height="140" rx="36" fill="#f4eedd" stroke="#9c6b3c" strokeWidth="5" />
      <g clipPath={`url(#${clipId})`} stroke="#9c6b3c" strokeWidth="2.2">
        {lines.map((position) => (
          <path key={`h-${position}`} d={`M30 ${position} H170`} />
        ))}
        {lines.map((position) => (
          <path key={`v-${position}`} d={`M${position} 30 V170`} />
        ))}
      </g>
      <circle cx="74" cy="74" r="3" fill="#4f6d26" />
      <circle cx="118" cy="118" r="3" fill="#4f6d26" />
    </svg>
  );
}
