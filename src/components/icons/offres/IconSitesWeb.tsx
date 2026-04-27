export function IconSitesWeb({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="24" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="11.5" x2="28" y2="11.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="9.25" r="0.75" fill="currentColor" />
      <circle cx="10" cy="9.25" r="0.75" fill="currentColor" />
      <line x1="9" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
