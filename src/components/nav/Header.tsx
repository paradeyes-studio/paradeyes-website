"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NavLinks } from "./NavLinks";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: "fr" | "en";
}

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const activeHref = pathname || "/";

  const [scrollState, setScrollState] = useState({ isScrolled: false, isVisible: true });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    // Lire le thème de la première section visible en top du viewport
    const sections = document.querySelectorAll("[data-section-theme]");
    for (const section of Array.from(sections)) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom > 80) {
        const theme = section.getAttribute("data-section-theme") as "light" | "dark";
        setCurrentTheme(theme);
        return;
      }
    }
    // Fallback : si aucune section n'est en top, prendre la première
    const firstSection = sections[0];
    if (firstSection) {
      const theme = firstSection.getAttribute("data-section-theme") as "light" | "dark";
      setCurrentTheme(theme);
    }
  }, []);

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
    if (sections.length === 0) return;

    // Sync initial theme from the first section in the viewport before the
    // observer kicks in — avoids a flash of the wrong theme on first paint.
    const firstVisible = Array.from(sections).find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.25 && rect.bottom > 80;
    });
    const firstTheme = firstVisible?.getAttribute("data-section-theme");
    if (firstTheme === "light" || firstTheme === "dark") {
      setCurrentTheme(firstTheme);
    }

    // Thin detection band just below the header. threshold: 0 fires as soon
    // as a section enters the band, regardless of section height.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-section-theme");
            if (theme === "light" || theme === "dark") {
              setCurrentTheme(theme);
            }
          }
        });
      },
      { threshold: 0, rootMargin: "-72px 0px -75% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isDarkSection = currentTheme === "dark";

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrollState.isScrolled
            ? isDarkSection
              ? "rgba(20, 34, 46, 0.64)"
              : "rgba(255, 255, 255, 0.72)"
            : "rgba(0, 0, 0, 0)",
          borderBottomColor: scrollState.isScrolled
            ? isDarkSection
              ? "rgba(255, 255, 255, 0.16)"
              : "rgba(0, 49, 53, 0.12)"
            : "rgba(0, 0, 0, 0)",
          y: scrollState.isVisible ? 0 : "-100%",
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-0 inset-x-0 z-40 h-16 lg:h-[72px] border-b border-transparent"
        style={{
          backdropFilter: scrollState.isScrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrollState.isScrolled
            ? "blur(24px) saturate(180%)"
            : "none",
        }}
      >
        <div className="max-w-[var(--container-site)] mx-auto h-full px-[var(--spacing-5)] lg:px-[var(--spacing-6)] flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Paradeyes, retour à l'accueil"
            className="transition-opacity duration-base ease-out-quart hover:opacity-70"
          >
            <Logo
              className={cn(
                "h-7 lg:h-8 w-auto",
                isDarkSection
                  ? "text-[var(--color-text-inverse)]"
                  : "text-[var(--color-text-primary)]",
              )}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <NavLinks activeHref={activeHref} isDark={isDarkSection} />

            <div className="flex items-center gap-2">
              <LangSwitch locale={locale} isDark={isDarkSection} />
              <ThemeSwitch isDarkSection={isDarkSection} />
            </div>

            <Button
              variant={isDarkSection ? "primary-light" : "primary-dark"}
              size="md"
              suffixIcon={<ArrowRight className="w-4 h-4" />}
              animatedArrow
              className="group"
              onClick={() => {
                const plausible = (window as PlausibleWindow).plausible;
                if (typeof plausible === "function") {
                  plausible("cta_header_clicked");
                }
                window.location.href = "/contact#appel";
              }}
            >
              Un appel gratuit de 30 min
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)]",
              "transition-colors duration-base ease-out-quart",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              isDarkSection
                ? "text-[var(--color-text-inverse)] hover:bg-[rgb(255_255_255/0.08)] focus-visible:outline-[var(--color-accent-on-dark)]"
                : "text-[var(--color-text-primary)] hover:bg-[rgb(0_49_53/0.06)] focus-visible:outline-[var(--color-focus-on-light)]",
            )}
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            activeHref={activeHref}
            locale={locale}
          />
        )}
      </AnimatePresence>
    </>
  );
}
