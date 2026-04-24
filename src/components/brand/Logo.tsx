import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 160 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M4 16 Q16 4 28 16 Q16 28 4 16 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 12 L18 16 L16 20 L14 16 Z M12 16 L16 14 L20 16 L16 18 Z"
        fill="currentColor"
      />
      {withWordmark && (
        <text
          x="36"
          y="21"
          fontFamily="var(--font-satoshi)"
          fontSize="14"
          fontWeight="500"
          letterSpacing="-0.02em"
          fill="currentColor"
        >
          paradeyes
        </text>
      )}
    </svg>
  );
}
