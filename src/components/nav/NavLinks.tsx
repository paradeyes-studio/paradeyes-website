"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Agence", href: "/agence" },
  { label: "Offres", href: "/offres" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

interface NavLinksProps {
  activeHref: string;
  isDark: boolean;
}

export function NavLinks({ activeHref, isDark }: NavLinksProps) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <ul className="flex items-center gap-[var(--spacing-6)]">
      {NAV_ITEMS.map((item) => {
        const isActive =
          hoveredHref === item.href ||
          (!hoveredHref && activeHref.startsWith(item.href));

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onMouseEnter={() => setHoveredHref(item.href)}
              onMouseLeave={() => setHoveredHref(null)}
              className={cn(
                "relative py-2 font-body text-body-sm font-medium",
                "transition-colors duration-base ease-out-quart",
                "focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm",
                isDark
                  ? "text-[var(--color-text-inverse)] focus-visible:outline-[var(--color-accent-on-dark)]"
                  : "text-[var(--color-text-primary)] focus-visible:outline-[var(--color-focus-on-light)]",
              )}
            >
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className={cn(
                    "absolute left-0 right-0 bottom-0 h-[1.5px]",
                    isDark
                      ? "bg-[var(--color-accent-on-dark)]"
                      : "bg-[var(--color-accent-primary)]",
                  )}
                  transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
