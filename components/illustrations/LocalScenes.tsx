export function ArcoIluminado({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true">
      <path d="M28 230 V110 C28 48 172 48 172 110 V230" fill="#f4eedd" stroke="#1f3319" strokeWidth="3" />
      <path d="M48 230 V118 C48 70 152 70 152 118 V230" fill="#cfddb6" />
      <path d="M78 150h44v80H78z" fill="#f4eedd" />
      <path d="M92 168h16M100 160v16" stroke="#4f6d26" strokeWidth="2" />
    </svg>
  );
}

export function BarraTaburetes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true">
      <path d="M16 78h188v16H16z" fill="#9c6b3c" />
      <path d="M16 94h188v10H16z" fill="#1f3319" />
      <path d="M46 104h18v70H46zM156 104h18v70h-18z" fill="#4f6d26" />
      <circle cx="55" cy="168" r="10" fill="none" stroke="#1f3319" strokeWidth="3" />
      <circle cx="165" cy="168" r="10" fill="none" stroke="#1f3319" strokeWidth="3" />
      <path d="M70 62c16-22 64-22 80 0" fill="none" stroke="#4f6d26" strokeWidth="3" />
    </svg>
  );
}

export function JuegosYLibros({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden="true">
      <path d="M28 48h28v96H28z" fill="#4f6d26" />
      <path d="M60 40h24v104H60z" fill="#1f3319" />
      <path d="M88 56h22v88H88z" fill="#9c6b3c" />
      <rect x="128" y="78" width="68" height="52" rx="6" fill="#f4eedd" stroke="#1f3319" strokeWidth="2.5" />
      <path d="M140 96h44M140 110h28" stroke="#4f6d26" strokeWidth="2" />
    </svg>
  );
}
