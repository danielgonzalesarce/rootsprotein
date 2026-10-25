export function Te({ atomic = false, className }: { atomic?: boolean; className?: string }) {
  const liquid = atomic ? "#e07a2f" : "#4f6d26";
  return (
    <svg viewBox="0 0 180 240" className={className} aria-hidden="true">
      <path d="M88 6h6l5 42h-16l5-42z" fill="#f4eedd" />
      <path d="M48 52h84l-8 156c-1 12-12 20-24 20H80c-12 0-23-8-24-20L48 52z" fill="#f4eedd" stroke="#1f3319" strokeWidth="2.5" />
      <path d="M56 92h68l-6 104c-1 8-8 14-16 14H78c-8 0-15-6-16-14L56 92z" fill={liquid} />
      <circle cx="78" cy="150" r="5" fill="#f4eedd" opacity="0.85" />
      <circle cx="108" cy="168" r="7" fill="#f4eedd" opacity="0.8" />
      <circle cx="90" cy="188" r="4" fill="#cfddb6" />
      <path d="M132 78h16a18 18 0 0 1 0 36h-12" fill="none" stroke="#1f3319" strokeWidth="2.5" />
    </svg>
  );
}
