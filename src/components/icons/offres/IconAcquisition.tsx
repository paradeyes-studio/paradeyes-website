export function IconAcquisition({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 25 L11 19 L15 22 L21 12 L27 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="25" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="27" cy="7" r="2.5" fill="currentColor" />
      <line x1="5" y1="28" x2="27" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="5" y1="5" x2="5" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
