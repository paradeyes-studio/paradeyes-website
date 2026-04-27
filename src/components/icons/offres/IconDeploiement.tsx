export function IconDeploiement({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="4" ry="11" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}
