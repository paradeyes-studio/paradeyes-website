"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
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
  void activeHref;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Initial theme sync from the DOM (avoids flash-of-wrong-theme).
  // Legitimate external-to-React read (DOM rects + data attribute).
  useLayoutEffect(() => {
    const sections = document.querySelectorAll("[data-section-theme]");
    let initial: boolean | null = null;
    for (const section of Array.from(sections)) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom > 80) {
        initial = section.getAttribute("data-section-theme") === "light";
        break;
      }
    }
    if (initial === null) {
      const first = sections[0];
      if (first) {
        initial = first.getAttribute("data-section-theme") === "light";
      }
    }
    if (initial !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLight(initial);
    }
  }, []);

  // Scroll state (transparent <= 80, scrolled > 80).
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme detection per section via IntersectionObserver (v5.1 logic).
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section-theme]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-section-theme");
            setIsLight(theme === "light");
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Nav underline slide on hover (JS-driven, not layoutId).
  useEffect(() => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    if (!nav || !underline) return;

    const links = nav.querySelectorAll<HTMLAnchorElement>("a[data-nav]");
    const move = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const nr = nav.getBoundingClientRect();
      underline.style.left = `${r.left - nr.left}px`;
      underline.style.width = `${r.width}px`;
    };
    const reset = () => {
      underline.style.width = "0px";
    };

    const enterHandlers: Array<[HTMLAnchorElement, () => void]> = [];
    const focusHandlers: Array<[HTMLAnchorElement, () => void]> = [];

    links.forEach((a) => {
      const enter = () => move(a);
      const focus = () => move(a);
      a.addEventListener("mouseenter", enter);
      a.addEventListener("focus", focus);
      enterHandlers.push([a, enter]);
      focusHandlers.push([a, focus]);
    });
    nav.addEventListener("mouseleave", reset);
    nav.addEventListener("blur", reset, true);

    return () => {
      enterHandlers.forEach(([a, h]) => a.removeEventListener("mouseenter", h));
      focusHandlers.forEach(([a, h]) => a.removeEventListener("focus", h));
      nav.removeEventListener("mouseleave", reset);
      nav.removeEventListener("blur", reset, true);
    };
  }, []);

  // Body scroll lock while mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const headerClass = [
    "pdy-header",
    isScrolled ? "scrolled" : "",
    isLight ? "light" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header
        id="site-header"
        className={headerClass}
        data-theme={isLight ? "light" : "dark"}
      >
        <div className="pdy-header-inner">
          <Link
            href="/"
            aria-label="Paradeyes, retour à l'accueil"
            className="pdy-header-logo"
          >
            <Logo />
          </Link>

          <nav ref={navRef} className="pdy-header-nav" aria-label="Principale">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} data-nav>
                {item.label}
              </Link>
            ))}
            <span
              ref={underlineRef}
              className="pdy-nav-underline"
              aria-hidden="true"
            />
          </nav>

          <div className="pdy-header-tools">
            <LangSwitch locale={locale} />
            <ThemeSwitch />
            <Link
              href="/contact#appel"
              className="pdy-header-cta"
              onClick={() => {
                const plausible = (window as PlausibleWindow).plausible;
                if (typeof plausible === "function") {
                  plausible("cta_header_clicked");
                }
              }}
            >
              <span className="pdy-cta-dot" aria-hidden="true" />
              <span className="pdy-cta-label">Un appel gratuit de 30 min</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="pdy-header-burger"
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

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
