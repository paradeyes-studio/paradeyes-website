import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionCardVariant = "deep-green" | "cream" | "ivory" | "electric";

type SectionCardProps = {
  children: ReactNode;
  variant?: SectionCardVariant;
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
};

const variantClasses: Record<SectionCardVariant, string> = {
  "deep-green": "bg-deep-green text-cream",
  cream: "bg-cream text-deep-green",
  ivory: "bg-ivory text-deep-green",
  electric: "bg-electric-green text-deep-green",
};

export function SectionCard({
  children,
  variant = "cream",
  className,
  id,
  ariaLabelledBy,
}: SectionCardProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative isolate overflow-hidden rounded-[32px]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
