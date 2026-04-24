"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Locale = "fr" | "en";

interface LangSwitchProps {
  locale: Locale;
  isDark: boolean;
}

export function LangSwitch({ locale, isDark }: LangSwitchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label="Sélectionner la langue"
      className={cn(
        "inline-flex items-center gap-1 p-0.5 rounded-full",
        "font-mono text-mono-xs uppercase tracking-wider font-medium",
        isDark
          ? "bg-[rgb(255_255_255/0.08)] border border-[rgb(255_255_255/0.12)]"
          : "bg-[rgb(0_49_53/0.04)] border border-[var(--color-border-subtle)]",
      )}
    >
      {(["fr", "en"] as const).map((lang) => {
        const isActive = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => switchTo(lang)}
            className={cn(
              "px-2 py-1 rounded-full transition-colors duration-base ease-out-quart",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              isActive
                ? isDark
                  ? "bg-[var(--color-accent-on-dark)] text-[var(--color-accent-primary)]"
                  : "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]"
                : isDark
                  ? "text-[rgb(255_255_255/0.6)] hover:text-[var(--color-text-inverse)] focus-visible:outline-[var(--color-accent-on-dark)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-[var(--color-focus-on-light)]",
            )}
            aria-label={`Passer en ${lang === "fr" ? "français" : "anglais"}`}
            aria-pressed={isActive}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
