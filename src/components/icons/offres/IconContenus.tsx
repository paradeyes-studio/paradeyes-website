export function IconContenus({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="17" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11.5" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11.5" cy="16" r="1.25" fill="currentColor" />
      <path d="M20 13 L29 8 L29 24 L20 19 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
