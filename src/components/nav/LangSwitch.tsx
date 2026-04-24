"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

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
      className="pdy-lang-switch"
    >
      {(["fr", "en"] as const).map((lang) => {
        const isActive = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => switchTo(lang)}
            className={isActive ? "active" : undefined}
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
