"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

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
  const [isLight, setIsLight] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const underlineRef = useRef<HTMLSpanElement | null>(null);

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

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      { rootMargin: "-72px 0px -85% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    if (!nav || !underline) return;

    const onMouseLeave = () => {
      underline.style.opacity = "0";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[data-nav]");
      if (!target || !nav.contains(target)) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = (target as HTMLElement).getBoundingClientRect();
      underline.style.left = `${linkRect.left - navRect.left}px`;
      underline.style.width = `${linkRect.width}px`;
      underline.style.opacity = "1";
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = (e.target as HTMLElement).closest("a[data-nav]");
      if (!target || !nav.contains(target)) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = (target as HTMLElement).getBoundingClientRect();
      underline.style.left = `${linkRect.left - navRect.left}px`;
      underline.style.width = `${linkRect.width}px`;
      underline.style.opacity = "1";
    };

    nav.addEventListener("mouseover", onMouseOver);
    nav.addEventListener("mouseleave", onMouseLeave);
    nav.addEventListener("focusin", onFocusIn);
    nav.addEventListener("focusout", onMouseLeave);
    return () => {
      nav.removeEventListener("mouseover", onMouseOver);
      nav.removeEventListener("mouseleave", onMouseLeave);
      nav.removeEventListener("focusin", onFocusIn);
      nav.removeEventListener("focusout", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "pdy-header-capsule",
          isScrolled && "pdy-header-capsule--scrolled",
          isLight && "pdy-header-capsule--light",
        )}
        data-scrolled={isScrolled}
        data-theme={isLight ? "light" : "dark"}
      >
        <div className="pdy-header-capsule-inner">
          <Link
            href="/"
            aria-label="Paradeyes, retour à l'accueil"
            className="pdy-header-capsule-logo"
          >
            <Logo />
          </Link>

          <nav
            ref={navRef}
            className="pdy-header-capsule-nav"
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-nav
                aria-current={activeHref.startsWith(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <span
              ref={underlineRef}
              className="pdy-header-capsule-underline"
              aria-hidden="true"
            />
          </nav>

          <div className="pdy-header-capsule-utils">
            <LangSwitch locale={locale} />
            <ThemeSwitch />
          </div>

          <Link
            href="/contact#appel"
            className="pdy-header-capsule-cta"
            onClick={() => {
              const plausible = (window as PlausibleWindow).plausible;
              if (typeof plausible === "function") {
                plausible("cta_header_clicked");
              }
            }}
          >
            <span className="pdy-header-capsule-cta-dot" aria-hidden="true" />
            <span>Un appel gratuit de 30 min</span>
            <ArrowRight aria-hidden="true" />
          </Link>

          <button
            type="button"
            className="pdy-header-capsule-burger"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  );
}
