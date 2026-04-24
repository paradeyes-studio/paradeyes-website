"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: "fr" | "en";
}

const NAV_ITEMS = [
  { label: "Agence", href: "/agence" },
  { label: "Offres", href: "/offres" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const activeHref = pathname || "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const sections = document.querySelectorAll("[data-section-theme]");
    for (const section of Array.from(sections)) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom > 80) {
        const theme = section.getAttribute("data-section-theme") as "light" | "dark";
        setCurrentTheme(theme);
        return;
      }
    }
    const firstSection = sections[0];
    if (firstSection) {
      const theme = firstSection.getAttribute("data-section-theme") as "light" | "dark";
      setCurrentTheme(theme);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section-theme]");
    if (sections.length === 0) return;

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
  void locale;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isScrolled ? -4 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-40 pt-5 lg:pt-6"
      >
        <div className="max-w-[calc(var(--container-site)_-_80px)] mx-auto px-5 lg:px-6 flex items-center justify-between gap-4">
          {/* Logo gauche */}
          <Link
            href="/"
            aria-label="Paradeyes, retour à l'accueil"
            className="transition-opacity duration-300 ease-out hover:opacity-70"
          >
            <Logo
              className={cn(
                "h-8 w-auto",
                isDarkSection ? "text-white" : "text-[#023236]",
              )}
            />
          </Link>

          {/* Nav pill centrale */}
          <nav className="hidden lg:block">
            <ul
              className="flex items-center gap-1 p-1.5 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255, 255, 255, 1)",
                  "0 4px 20px rgba(0, 0, 0, 0.08)",
                  "0 1px 2px rgba(0, 0, 0, 0.04)",
                ].join(", "),
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeHref.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center px-4 py-2 rounded-full",
                        "font-body text-body-sm font-medium",
                        "transition-all duration-300 ease-out",
                        isActive
                          ? "bg-[#023236] text-white"
                          : "text-[#023236] hover:bg-[rgba(2,50,54,0.06)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA droite desktop */}
          <Link
            href="/contact#appel"
            onClick={() => {
              const plausible = (window as PlausibleWindow).plausible;
              if (typeof plausible === "function") {
                plausible("cta_header_clicked");
              }
            }}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-3 rounded-full font-body text-body-sm font-medium transition-all duration-300 ease-out"
            style={{
              border: "1px solid rgba(87, 238, 161, 0.5)",
              color: "#57eea1",
              background: "rgba(87, 238, 161, 0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(87, 238, 161, 0.15)";
              e.currentTarget.style.borderColor = "rgba(87, 238, 161, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(87, 238, 161, 0.05)";
              e.currentTarget.style.borderColor = "rgba(87, 238, 161, 0.5)";
            }}
          >
            Un appel gratuit de 30 min
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Burger mobile dans pill blanche */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition-transform duration-300 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#023236]"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow: [
                "inset 0 1px 0 rgba(255, 255, 255, 1)",
                "0 4px 20px rgba(0, 0, 0, 0.08)",
                "0 1px 2px rgba(0, 0, 0, 0.04)",
              ].join(", "),
              color: "#023236",
            }}
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            activeHref={activeHref}
          />
        )}
      </AnimatePresence>
    </>
  );
}
