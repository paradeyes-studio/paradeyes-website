import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary-dark"
  | "primary-light"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  animatedArrow?: boolean;
  children: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  "primary-dark":
    "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)] hover:opacity-90 focus-visible:outline-[var(--color-accent-primary)]",
  "primary-light":
    "bg-[var(--color-accent-on-dark)] text-[var(--color-accent-primary)] hover:opacity-90 focus-visible:outline-[var(--color-accent-on-dark)]",
  secondary:
    "bg-transparent border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[rgb(0_49_53/0.04)] focus-visible:outline-[var(--color-focus-on-light)]",
  ghost:
    "bg-transparent text-[var(--color-text-primary)] hover:bg-[rgb(0_49_53/0.06)] focus-visible:outline-[var(--color-focus-on-light)]",
  link: "bg-transparent p-0 h-auto text-[var(--color-text-primary)] underline underline-offset-4 decoration-1 hover:decoration-2 focus-visible:outline-[var(--color-focus-on-light)]",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-body-sm gap-1.5 rounded-[var(--radius-md)]",
  md: "h-11 px-5 text-body-sm gap-2 rounded-[var(--radius-md)]",
  lg: "h-14 px-6 text-body-md gap-2 rounded-[var(--radius-md)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary-dark",
    size = "md",
    prefixIcon,
    suffixIcon,
    animatedArrow = false,
    className,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  const isLink = variant === "link";

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center font-body font-medium",
        "transition-all duration-base ease-out-quart",
        "active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        !isLink && SIZE_STYLES[size],
        isLink && "text-body-sm gap-1.5",
        VARIANT_STYLES[variant],
        className,
      )}
      {...props}
    >
      {prefixIcon && <span className="inline-flex shrink-0">{prefixIcon}</span>}
      <span>{children}</span>
      {suffixIcon && (
        <span
          className={cn(
            "inline-flex shrink-0",
            animatedArrow &&
              "transition-transform duration-base ease-out-quart group-hover:translate-x-0.5",
          )}
        >
          {suffixIcon}
        </span>
      )}
    </button>
  );
});
