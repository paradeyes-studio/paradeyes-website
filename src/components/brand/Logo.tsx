import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/paradeyes-logo.svg"
      alt="Paradeyes"
      className={cn("w-auto select-none", className)}
      draggable={false}
    />
  );
}
