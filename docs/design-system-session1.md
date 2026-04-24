# Design System — Specs Session 1 (Header + Footer)

> Source : pages 23 et 24 du Design System Paradeyes (Étape 3).
> Ce fichier est la référence pour Claude Code. Toutes les specs et le code
> viennent des pages Notion canoniques du projet.

---

## Tokens CSS à ajouter dans globals.css @theme

```css
/* Spacing */
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 24px;
--spacing-6: 32px;
--spacing-7: 48px;
--spacing-8: 64px;
--spacing-9: 96px;
--spacing-10: 128px;
--spacing-12: 192px;

/* Typography scale */
--text-mono-xs: 0.6875rem;
--text-mono-sm: 0.75rem;
--text-mono-md: 0.875rem;
--text-body-sm: 0.875rem;
--text-body-md: 1rem;
--text-body-lg: 1.125rem;
--text-display-md: 3.5rem;
--text-display-lg: 4.5rem;
--text-display-xl: 6rem;
--text-caption: 0.75rem;

/* Leading */
--leading-heading-1: 1.1;
--leading-body-lg: 1.6;

/* Tracking */
--tracking-tight: -0.02em;

/* Containers */
--container-site: 1440px;
--container-4xl: 1120px;

/* Radius */
--radius-md: 8px;
--radius-section: 60px;
--radius-section-mobile: 32px;

/* Z-index */
--z-header: 40;
--z-modal: 50;

/* Header glass */
--blur-header: 24px;
--color-bg-header-light: rgb(255 255 255 / 0.72);
--color-bg-header-dark: rgb(20 34 46 / 0.64);

/* Semantic colors */
--color-bg-canvas: #ffffff;
--color-bg-inverse: #023236;
--color-text-primary: #023236;
--color-text-secondary: rgb(2 50 54 / 0.7);
--color-text-inverse: #ffffff;
--color-accent-primary: #023236;
--color-accent-on-dark: #57eea1;
--color-accent-special: #57eea1;
--color-border-default: rgb(0 49 53 / 0.12);
--color-border-subtle: rgb(0 49 53 / 0.08);
--color-focus-on-light: #023236;

/* Duration & easing */
--duration-base: 240ms;
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
```

---

## HEADER (Page 23 du Design System)

### Principe

Le Header porte le CTA "Un appel gratuit de 30 min" en permanence. Levier conversion actif du scroll 0 au scroll fin de page. Objectif 10K€ M1.

### Anatomie 5 zones horizontales

1. **Logo Paradeyes.** SVG inline (pas img). 32px desktop, 28px mobile. Retour accueil au clic. Opacity transition au hover.
2. **Liens navigation principale (5 liens).** Agence, Offres, Réalisations, Journal, Contact. Underline glissant layoutId Framer Motion. Desktop uniquement (masqué < 1024px).
3. **Espace central.** Vide, respiration visuelle.
4. **Actions secondaires.** LangSwitch FR/EN + ThemeSwitch light/dark. Pills compactes.
5. **CTA principal.** Button primary-dark avec animatedArrow. Texte "Un appel gratuit de 30 min". Ne disparaît jamais.

**Mobile (< 1024px).** Zone 2 remplacée par burger. Clic ouvre overlay full-screen.

### Comportement scroll (3 états)

- **État 1 (scroll 0).** Transparent. Pas de background, bordure, ni blur.
- **État 2 (scroll > 80px).** Glass apparaît. Background `color-bg-header-light` (0.72) ou `color-bg-header-dark` (0.64). Backdrop-filter blur 24px saturate 180%. Border-bottom 1px. Transition 300ms ease-out-quart.
- **État 3 mobile.** Auto-hide en scroll down après 200px, réapparition en scroll up.

**Desktop : sticky permanent.** Toujours visible. **Mobile : auto-hide scroll down + réapparition scroll up.**

### Glass morphism calibré

| Paramètre | Valeur |
|-----------|--------|
| Blur | 24px |
| Saturate | 180% |
| Opacity fond light | 0.72 |
| Opacity fond dark | 0.64 |
| Border bottom | 1px subtle |

### Tokens Header

| Dimension | Token |
|-----------|-------|
| Height desktop | 72px |
| Height mobile | 64px |
| Padding horizontal mobile | `--spacing-5` (24px) |
| Padding horizontal desktop | `--spacing-6` (32px) |
| Max-width inner | `--container-site` (1440px) |
| Gap liens nav | `--spacing-6` (32px) |
| Z-index | `--z-header` (40) |

### Code Header.tsx

```typescript
// src/components/nav/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NavLinks } from "./NavLinks";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: "fr" | "en";
  activeHref: string;
}

export function Header({ locale, activeHref }: HeaderProps) {
  const [scrollState, setScrollState] = useState({ isScrolled: false, isVisible: true });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;
      const isScrolled = currentScrollY > 80;

      if (!isMobile) {
        setScrollState({ isScrolled, isVisible: true });
        setLastScrollY(currentScrollY);
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = isScrollingDown && currentScrollY > 200;
      setScrollState({ isScrolled, isVisible: !shouldHide });
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          const theme = visibleSection.target.getAttribute("data-section-theme") as "light" | "dark";
          setCurrentTheme(theme);
        }
      },
      { threshold: 0.5, rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isDarkSection = currentTheme === "dark";

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrollState.isScrolled
            ? (isDarkSection ? "rgba(20, 34, 46, 0.64)" : "rgba(255, 255, 255, 0.72)")
            : "rgba(0, 0, 0, 0)",
          borderBottomColor: scrollState.isScrolled
            ? (isDarkSection ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 49, 53, 0.12)")
            : "rgba(0, 0, 0, 0)",
          y: scrollState.isVisible ? 0 : "-100%",
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-0 inset-x-0 z-header h-16 lg:h-[72px] border-b border-transparent"
        style={{
          backdropFilter: scrollState.isScrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrollState.isScrolled ? "blur(24px) saturate(180%)" : "none",
        }}
      >
        <div className="max-w-[var(--container-site)] mx-auto h-full px-[var(--spacing-5)] lg:px-[var(--spacing-6)] flex items-center justify-between gap-4">
          <Link href="/" aria-label="Paradeyes, retour à l'accueil" className="transition-opacity duration-base ease-out-quart hover:opacity-70">
            <Logo className={cn("h-7 lg:h-8 w-auto", isDarkSection ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text-primary)]")} />
          </Link>

          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <NavLinks activeHref={activeHref} isDark={isDarkSection} />
            
            <div className="flex items-center gap-2">
              <LangSwitch locale={locale} isDark={isDarkSection} />
              <ThemeSwitch isDarkSection={isDarkSection} />
            </div>

            <Button
              variant="primary-dark"
              size="md"
              suffixIcon={<ArrowRight className="w-4 h-4" />}
              animatedArrow
              className="group"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).plausible) {
                  (window as any).plausible("cta_header_clicked");
                }
                window.location.href = "/contact#appel";
              }}
            >
              Un appel gratuit de 30 min
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)]",
              "transition-colors duration-base ease-out-quart",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              isDarkSection 
                ? "text-[var(--color-text-inverse)] hover:bg-[rgb(255_255_255/0.08)] focus-visible:outline-[var(--color-accent-on-dark)]" 
                : "text-[var(--color-text-primary)] hover:bg-[rgb(0_49_53/0.06)] focus-visible:outline-[var(--color-focus-on-light)]"
            )}
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} activeHref={activeHref} locale={locale} />}
      </AnimatePresence>
    </>
  );
}
```

### Code NavLinks.tsx

```typescript
// src/components/nav/NavLinks.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Agence", href: "/agence" },
  { label: "Offres", href: "/offres" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

interface NavLinksProps {
  activeHref: string;
  isDark: boolean;
}

export function NavLinks({ activeHref, isDark }: NavLinksProps) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <ul className="flex items-center gap-[var(--spacing-6)]">
      {NAV_ITEMS.map((item) => {
        const isActive = hoveredHref === item.href || (!hoveredHref && activeHref.startsWith(item.href));
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
                    isDark ? "bg-[var(--color-accent-on-dark)]" : "bg-[var(--color-accent-primary)]"
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
```

### Code LangSwitch.tsx

```typescript
// src/components/nav/LangSwitch.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LangSwitchProps {
  locale: "fr" | "en";
  isDark: boolean;
}

export function LangSwitch({ locale, isDark }: LangSwitchProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (newLocale: "fr" | "en") => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(/^\/(fr|en)/, `/${newLocale}`);
    router.push(newPath);
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
          : "bg-[rgb(0_49_53/0.04)] border border-[var(--color-border-subtle)]"
      )}
    >
      {(["fr", "en"] as const).map((lang) => {
        const isActive = locale === lang;
        return (
          <button
            key={lang}
            onClick={() => switchTo(lang)}
            className={cn(
              "px-2 py-1 rounded-full transition-colors duration-base ease-out-quart",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              isActive ? [
                isDark 
                  ? "bg-[var(--color-accent-on-dark)] text-[var(--color-accent-primary)]"
                  : "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]"
              ] : [
                isDark 
                  ? "text-[rgb(255_255_255/0.6)] hover:text-[var(--color-text-inverse)] focus-visible:outline-[var(--color-accent-on-dark)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-[var(--color-focus-on-light)]"
              ]
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
```

### Code ThemeSwitch.tsx

```typescript
// src/components/nav/ThemeSwitch.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "paradeyes_theme";

interface ThemeSwitchProps {
  isDarkSection: boolean;
}

export function ThemeSwitch({ isDarkSection }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("theme_switched", { props: { to: newTheme } });
    }
  };

  if (!mounted) return <div className="w-9 h-9" aria-hidden="true" />;

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Passer en mode sombre" : "Passer en mode clair"}
      aria-pressed={theme === "dark"}
      className={cn(
        "relative inline-flex items-center justify-center w-9 h-9 rounded-full",
        "transition-all duration-base ease-out-quart",
        "active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        isDarkSection ? [
          "bg-[rgb(255_255_255/0.08)] text-[var(--color-text-inverse)]",
          "hover:bg-[rgb(255_255_255/0.16)]",
          "focus-visible:outline-[var(--color-accent-on-dark)]",
        ] : [
          "bg-[rgb(0_49_53/0.04)] text-[var(--color-text-primary)]",
          "hover:bg-[rgb(0_49_53/0.08)]",
          "focus-visible:outline-[var(--color-focus-on-light)]",
        ],
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex"
        >
          {theme === "light" ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
```

### Script anti-flash dark mode (obligatoire dans layout.tsx head)

```typescript
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          var stored = localStorage.getItem('paradeyes_theme');
          if (stored === 'dark' || stored === 'light') {
            document.documentElement.setAttribute('data-theme', stored);
          } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        } catch (e) {}
      })();
    `,
  }}
/>
```

### Code MobileMenu.tsx

```typescript
// src/components/nav/MobileMenu.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Agence", href: "/agence" },
  { label: "Offres", href: "/offres" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  onClose: () => void;
  activeHref: string;
  locale: "fr" | "en";
}

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
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block font-display text-display-md leading-[var(--leading-heading-1)] tracking-[var(--tracking-tight)] font-medium",
                      "transition-colors duration-base ease-out-quart",
                      isActive 
                        ? "text-[var(--color-accent-on-dark)]"
                        : "text-[var(--color-text-inverse)] hover:text-[var(--color-accent-on-dark)]"
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
            variant="primary-dark"
            size="lg"
            suffixIcon={<ArrowRight className="w-4 h-4" />}
            animatedArrow
            className="group w-full justify-center bg-[var(--color-accent-on-dark)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-on-dark)]"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).plausible) {
                (window as any).plausible("cta_header_clicked", { props: { location: "mobile_menu" } });
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
```

### Code Logo.tsx (placeholder à customiser)

```typescript
// src/components/brand/Logo.tsx
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
      <path d="M4 16 Q16 4 28 16 Q16 28 4 16 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 12 L18 16 L16 20 L14 16 Z M12 16 L16 14 L20 16 L16 18 Z" fill="currentColor" />
      {withWordmark && (
        <text x="36" y="22" fontFamily="var(--font-satoshi)" fontSize="18" fontWeight="500" letterSpacing="-0.02em" fill="currentColor">
          paradeyes
        </text>
      )}
    </svg>
  );
}
```

### Règles Header

1. Le CTA header ne disparaît jamais.
2. Wording figé : "Un appel gratuit de 30 min" FR / "A free 30-min call" EN.
3. Navigation active : underline glissant layoutId Framer Motion.
4. Mobile menu : fade overlay full-screen, stagger 60ms, CTA vert électrique sur dark.
5. Accessibility : aria-label burger, aria-expanded, role="dialog" + aria-modal, Escape ferme.
6. Tracking : cta_header_clicked (prop location), theme_switched (prop to).
7. Dark mode : paradeyes_theme localStorage, fallback prefers-color-scheme, script anti-flash SSR.
8. Glass calibré : blur 24px, opacity 0.72/0.64, saturate 180%, border 1px subtle.
9. Sticky : desktop permanent, mobile auto-hide down + réapparition up.

---

## FOOTER (Page 24 du Design System)

### Principe

Le Footer est le dernier moment wow de la home (Moment 5 Passe 3), le dernier levier conversion de chaque page. Arrondi inversé signature.

### Anatomie 4 blocs

1. **Pre-footer conversion (optionnel).** Grande section dernière chance, 3 variants (default/offre/contact).
2. **Marquee signature.** "On comprend. · On conçoit. · On construit." en display-xl Satoshi. 50s cycle, 100s au hover.
3. **Footer principal.** Grille 12 cols desktop. Background color-bg-inverse. 4 colonnes.
4. **Band bas.** Copyright + mentions légales.

### Pre-footer 3 variants

**default** : eyebrow "PRÊT À COMMENCER", titre "On parle de votre projet ?"
**offre** : eyebrow "PASSONS À L'ÉTAPE SUIVANTE", titre "Ce que vous venez de lire vous parle ?"
**contact** : eyebrow "DERNIÈRE CHANCE", titre "Vous hésitez encore ?"

### Halo animé 2 couches

- Couche 1 : radial gradient vert, pulsation 16s, opacity 0.12→0.20, déplacement ±60px
- Couche 2 : radial gradient violet, contre-phase délai 8s, opacity 0.06→0.10

### Keyframes halo (à ajouter dans globals.css)

```css
@keyframes halo-pulse-green {
  0%, 100% {
    opacity: 0.6;
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate3d(60px, -20px, 0) scale(1.08);
  }
}

@keyframes halo-pulse-violet {
  0%, 100% {
    opacity: 0.8;
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    opacity: 0.4;
    transform: translate3d(-40px, 15px, 0) scale(0.95);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-\[halo-pulse-green_16s_ease-in-out_infinite\],
  .animate-\[halo-pulse-violet_16s_ease-in-out_infinite_8s\] {
    animation: none !important;
  }
}
```

### Tokens Footer

| Dimension | Token |
|-----------|-------|
| Radius top desktop | `--radius-section` (60px) |
| Radius top mobile | `--radius-section-mobile` (32px) |
| Background | `--color-bg-inverse` |
| Marquee duration | 50s (100s hover) |
| Marquee text | display-xl (96px) / display-md mobile (56px) |

### Code Footer.tsx

```typescript
// src/components/nav/Footer.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Mail, Linkedin, Instagram, Dribbble } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { FooterMarquee } from "./FooterMarquee";
import { FooterColumn } from "./FooterColumn";
import { FooterBottom } from "./FooterBottom";
import { PreFooterCTA } from "./PreFooterCTA";
import { cn } from "@/lib/utils";

interface FooterProps {
  locale: "fr" | "en";
  showPreFooter?: boolean;
  preFooterVariant?: "default" | "offre" | "contact";
}

export function Footer({ locale, showPreFooter = true, preFooterVariant = "default" }: FooterProps) {
  return (
    <footer className="relative" data-section-theme="dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pied de page</h2>

      {showPreFooter && <PreFooterCTA variant={preFooterVariant} locale={locale} />}

      <div className={cn(
        "relative overflow-hidden",
        "bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]",
        "rounded-t-[var(--radius-section-mobile)] lg:rounded-t-[var(--radius-section)]",
        "pt-[var(--spacing-8)] lg:pt-[var(--spacing-10)]",
      )}>
        <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 animate-[halo-pulse-green_16s_ease-in-out_infinite]">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(87, 238, 161, 0.20) 0%, transparent 60%)" }} />
          </div>
          <div className="absolute inset-0 animate-[halo-pulse-violet_16s_ease-in-out_infinite_8s]">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(101, 73, 246, 0.10) 0%, transparent 55%)" }} />
          </div>
        </div>

        <FooterMarquee />

        <div className="relative max-w-[var(--container-site)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)] pt-[var(--spacing-9)] lg:pt-[var(--spacing-10)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--spacing-6)] lg:gap-[var(--spacing-5)]">
            
            <div className="lg:col-span-4 flex flex-col gap-[var(--spacing-5)]">
              <Link href="/" aria-label="Paradeyes, retour à l'accueil">
                <Logo className="h-10 w-auto text-[var(--color-text-inverse)]" />
              </Link>
              
              <p className="font-display text-body-lg leading-[var(--leading-body-lg)] text-[var(--color-text-inverse)] max-w-[32ch]">
                Le cinéma rencontre le tableau de bord.
              </p>
              
              <div className="flex flex-col gap-2">
                <a href="mailto:hello@paradeyesagency.com" className="group inline-flex items-center gap-2 font-body text-body-sm font-medium text-[var(--color-text-inverse)] hover:text-[var(--color-accent-on-dark)] transition-colors duration-base ease-out-quart">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  hello@paradeyesagency.com
                </a>
                <p className="font-mono text-mono-xs uppercase tracking-wider text-[rgb(255_255_255/0.6)]">Cannes, France</p>
              </div>

              <div className="pt-[var(--spacing-3)]">
                <Button
                  variant="primary-dark"
                  size="md"
                  suffixIcon={<ArrowRight className="w-4 h-4" />}
                  animatedArrow
                  className="group bg-[var(--color-accent-on-dark)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-on-dark)]"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).plausible) {
                      (window as any).plausible("cta_footer_clicked");
                    }
                    window.location.href = "/contact#appel";
                  }}
                >
                  Un appel gratuit de 30 min
                </Button>
              </div>
            </div>

            <FooterColumn title="Navigation" className="lg:col-span-2" links={[
              { label: "Agence", href: "/agence" },
              { label: "Réalisations", href: "/realisations" },
              { label: "Journal", href: "/journal" },
              { label: "Contact", href: "/contact" },
            ]} />

            <FooterColumn title="Offres" className="lg:col-span-2" links={[
              { label: "Branding et Identité de marque", href: "/offres/branding" },
              { label: "Sites et Plateformes digitales", href: "/offres/sites-et-plateformes" },
              { label: "Création et production de contenus", href: "/offres/creation-de-contenus" },
              { label: "Déploiement et supports de marque", href: "/offres/deploiement-et-supports" },
              { label: "Acquisition et réputation digitale", href: "/offres/acquisition-et-reputation" },
            ]} />

            <FooterColumn title="Ressources" className="lg:col-span-2" links={[
              { label: "Études de cas", href: "/realisations" },
              { label: "Journal", href: "/journal" },
            ]} />

            <FooterColumn title="Social" className="lg:col-span-2" external links={[
              { label: "LinkedIn", href: "https://linkedin.com/company/paradeyes", icon: <Linkedin className="w-4 h-4" /> },
              { label: "Instagram", href: "https://instagram.com/paradeyesagency", icon: <Instagram className="w-4 h-4" /> },
              { label: "Behance", href: "https://behance.net/paradeyes", icon: <Dribbble className="w-4 h-4" /> },
            ]} />
          </div>
        </div>

        <FooterBottom locale={locale} />
      </div>
    </footer>
  );
}
```

### Code FooterMarquee.tsx

```typescript
// src/components/nav/FooterMarquee.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PHRASES = ["On comprend.", "On conçoit.", "On construit."];
const SEPARATOR = "·";

export function FooterMarquee() {
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (prefersReducedMotion) {
    return (
      <div className="overflow-hidden py-[var(--spacing-6)]">
        <div className="flex items-center gap-8 justify-center">
          {PHRASES.map((phrase, i) => (
            <span key={i} className="font-display text-display-md lg:text-display-xl font-medium text-[var(--color-text-inverse)]">
              {phrase}
              {i < PHRASES.length - 1 && <span className="mx-6 text-[var(--color-accent-on-dark)]" aria-hidden="true">{SEPARATOR}</span>}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden py-[var(--spacing-6)]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: isHovering ? 100 : 50, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center gap-12 shrink-0">
            {PHRASES.map((phrase, i) => (
              <div key={`${setIndex}-${i}`} className="flex items-center gap-12 shrink-0">
                <span className="font-display text-display-md lg:text-display-xl font-medium text-[var(--color-text-inverse)] leading-none">{phrase}</span>
                <span className="font-display text-display-md lg:text-display-xl text-[var(--color-accent-on-dark)] leading-none shrink-0">{SEPARATOR}</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
```

### Code FooterColumn.tsx

```typescript
// src/components/nav/FooterColumn.tsx
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
  external?: boolean;
  className?: string;
}

export function FooterColumn({ title, links, external = false, className }: FooterColumnProps) {
  return (
    <div className={cn("flex flex-col gap-[var(--spacing-4)]", className)}>
      <h3 className="font-mono text-mono-sm uppercase tracking-[0.08em] font-medium text-[rgb(255_255_255/0.6)]">{title}</h3>
      
      <ul className="flex flex-col gap-[var(--spacing-2)]">
        {links.map((link) => {
          const LinkComponent = external ? "a" : Link;
          const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
          
          return (
            <li key={link.href}>
              <LinkComponent
                href={link.href}
                {...externalProps}
                className={cn(
                  "group inline-flex items-center gap-2",
                  "font-body text-body-sm font-medium",
                  "text-[var(--color-text-inverse)]",
                  "transition-colors duration-base ease-out-quart",
                  "hover:text-[var(--color-accent-on-dark)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-on-dark)] rounded-sm",
                )}
              >
                {link.icon && <span className="opacity-60 group-hover:opacity-100 transition-opacity">{link.icon}</span>}
                <span>{link.label}</span>
                {external && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />}
              </LinkComponent>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

### Code FooterBottom.tsx

```typescript
// src/components/nav/FooterBottom.tsx
import Link from "next/link";

interface FooterBottomProps {
  locale: "fr" | "en";
}

export function FooterBottom({ locale }: FooterBottomProps) {
  const year = new Date().getFullYear();

  return (
    <div className="relative mt-[var(--spacing-9)] lg:mt-[var(--spacing-10)] border-t border-[rgb(255_255_255/0.12)]">
      <div className="max-w-[var(--container-site)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)] py-[var(--spacing-5)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[var(--spacing-4)]">
          <p className="font-mono text-mono-xs tracking-wider text-[rgb(255_255_255/0.6)]">
            © {year} Paradeyes Agency. Tous droits réservés.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              { label: "Mentions légales", href: "/mentions-legales" },
              { label: "Confidentialité", href: "/confidentialite" },
              { label: "CGV", href: "/cgv" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-caption text-[rgb(255_255_255/0.6)] hover:text-[var(--color-text-inverse)] transition-colors duration-base ease-out-quart focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-on-dark)] rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

### Code PreFooterCTA.tsx

```typescript
// src/components/nav/PreFooterCTA.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PreFooterCTAProps {
  variant?: "default" | "offre" | "contact";
  locale: "fr" | "en";
}

const CONTENT = {
  default: {
    eyebrow: "PRÊT À COMMENCER",
    title: "On parle de votre projet ?",
    description: "Un appel de 30 minutes pour comprendre vos enjeux, partager notre vision, et voir si on est faits pour travailler ensemble.",
    primaryLabel: "Un appel gratuit de 30 min",
    secondaryLabel: "Écrire un message",
  },
  offre: {
    eyebrow: "PASSONS À L'ÉTAPE SUIVANTE",
    title: "Ce que vous venez de lire vous parle ?",
    description: "Dites nous en plus sur votre contexte en 30 minutes. On repart avec une idée claire de ce qu'on peut construire ensemble.",
    primaryLabel: "Réserver un appel",
    secondaryLabel: "Voir nos autres offres",
  },
  contact: {
    eyebrow: "DERNIÈRE CHANCE",
    title: "Vous hésitez encore ?",
    description: "Un dernier moyen rapide. Appel de 30 minutes, sans engagement. On écoute, on conseille, on avance si ça colle.",
    primaryLabel: "Réserver maintenant",
    secondaryLabel: "Revenir plus tard",
  },
};

export function PreFooterCTA({ variant = "default", locale }: PreFooterCTAProps) {
  const content = CONTENT[variant];
  
  return (
    <section className="relative bg-[var(--color-bg-canvas)] py-[var(--spacing-10)] lg:py-[var(--spacing-12)] overflow-hidden" data-section-theme="light">
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(87, 238, 161, 0.3) 0%, transparent 50%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[var(--container-4xl)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)] text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-mono-md uppercase tracking-[0.08em] font-medium text-[var(--color-accent-special)] mb-[var(--spacing-5)]"
        >
          {content.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-md lg:text-display-lg leading-[var(--leading-heading-1)] tracking-[var(--tracking-tight)] font-medium text-[var(--color-text-primary)] mb-[var(--spacing-5)] max-w-[24ch] mx-auto"
        >
          {content.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-body-lg leading-[var(--leading-body-lg)] text-[var(--color-text-secondary)] max-w-[56ch] mx-auto mb-[var(--spacing-7)]"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            variant="primary-dark"
            size="lg"
            suffixIcon={<ArrowRight className="w-4 h-4" />}
            animatedArrow
            className="group"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).plausible) {
                (window as any).plausible("cta_prefooter_clicked", { props: { variant } });
              }
              window.location.href = "/contact#appel";
            }}
          >
            {content.primaryLabel}
          </Button>
          <Button variant="link" size="md">{content.secondaryLabel}</Button>
        </motion.div>
      </div>
    </section>
  );
}
```

### Règles Footer

1. Pre-footer activé sur home, offres, agence. Désactivé sur légales, 404, blog.
2. Marquee 3 phrases figées. Séparateur · vert électrique. Pause 100s hover. aria-hidden.
3. Social : LinkedIn, Instagram, Behance. Nouvel onglet.
4. Email : hello@paradeyesagency.com.
5. Halo 2 couches 16s. Reduced motion : animation none.
6. CTA footer inversé : vert électrique sur green-deep.
7. Tracking : cta_footer_clicked, cta_prefooter_clicked (prop variant).
