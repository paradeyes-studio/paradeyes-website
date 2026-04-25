interface VerifiedBadgeProps {
  label?: string;
}

export function VerifiedBadge({ label = "Avis vérifié" }: VerifiedBadgeProps) {
  return (
    <span className="pdy-verified-badge" aria-label={label}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </span>
  );
}
