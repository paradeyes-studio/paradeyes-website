"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Agence", href: "/agence" },
  { label: "Offres", href: "/offres" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

interface MobileMenuProps {
  onClose: () => void;
  activeHref: string;
  locale: "fr" | "en";
}

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

export function MobileMenu({ onClose, activeHref, locale }: MobileMenuProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-modal bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <div className="h-full flex flex-col">
        <div className="h-16 px-[var(--spacing-5)] flex items-center justify-between border-b border-[rgb(255_255_255/0.12)]">
          <Logo className="h-7 w-auto text-[var(--color-text-inverse)]" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] hover:bg-[rgb(255_255_255/0.08)] transition-colors duration-base ease-out-quart focus-visible:outline-2 focus-visible:outline-[var(--color-accent-on-dark)]"
            aria-label="Fermer le menu"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-[var(--spacing-5)] py-[var(--spacing-7)]">
          <ul className="flex flex-col gap-[var(--spacing-5)]">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeHref.startsWith(item.href);
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block font-display text-display-md leading-[var(--leading-heading-1)] tracking-[var(--tracking-tight)] font-medium",
                      "transition-colors duration-base ease-out-quart",
                      isActive
                        ? "text-[var(--color-accent-on-dark)]"
                        : "text-[var(--color-text-inverse)] hover:text-[var(--color-accent-on-dark)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          className="px-[var(--spacing-5)] py-[var(--spacing-5)] border-t border-[rgb(255_255_255/0.12)] flex flex-col gap-[var(--spacing-4)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            variant="primary-light"
            size="lg"
            suffixIcon={<ArrowRight className="w-4 h-4" />}
            animatedArrow
            className="group w-full"
            onClick={() => {
              const plausible = (window as PlausibleWindow).plausible;
              if (typeof plausible === "function") {
                plausible("cta_header_clicked", { props: { location: "mobile_menu" } });
              }
              onClose();
              window.location.href = "/contact#appel";
            }}
          >
            Un appel gratuit de 30 min
          </Button>

          <div className="flex items-center justify-center gap-3">
            <LangSwitch locale={locale} isDark={true} />
            <ThemeSwitch isDarkSection={true} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
