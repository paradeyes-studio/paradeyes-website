"use client";

import { Fragment, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Locale = "fr" | "en";

interface LangSwitchProps {
  locale: Locale;
}

export function LangSwitch({ locale }: LangSwitchProps) {
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
      className="inline-flex items-center gap-1.5"
    >
      {(["fr", "en"] as const).map((lang, i) => {
        const isActive = locale === lang;
        return (
          <Fragment key={lang}>
            {i > 0 && (
              <span
                className="text-white/20 select-none"
                aria-hidden="true"
                style={{ fontSize: "0.75rem" }}
              >
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => switchTo(lang)}
              className={cn(
                "font-mono uppercase transition-colors duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#57eea1] rounded-sm",
              )}
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                color: isActive ? "white" : "rgba(255, 255, 255, 0.4)",
              }}
              aria-label={`Passer en ${lang === "fr" ? "français" : "anglais"}`}
              aria-pressed={isActive}
            >
              {lang}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
