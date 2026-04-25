"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { X, ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: "fr" | "en";
}

const NAV_ITEMS = [
  { href: "/agence", label: "Agence", num: "01" },
  { href: "/offres", label: "Offres", num: "02" },
  { href: "/realisations", label: "Réalisations", num: "03" },
  { href: "/journal", label: "Journal", num: "04" },
  { href: "/contact", label: "Contact", num: "05" },
] as const;

const brandIconSize = "w-4 h-4";

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={brandIconSize}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={brandIconSize}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function MobileMenu({ open, onClose, locale }: MobileMenuProps) {
  const reduced = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  const easeOut = [0.16, 1, 0.3, 1] as const;
  const easeIn = [0.7, 0, 0.84, 0] as const;

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: easeOut },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.32, ease: easeIn },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.08,
        ease: easeOut,
      },
    }),
  };

  const metaVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.7, ease: easeOut },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.85, ease: easeOut },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="pdy-mobile-menu"
          variants={reduced ? undefined : overlayVariants}
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : "visible"}
          exit={reduced ? undefined : "exit"}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="pdy-mobile-menu-backdrop" aria-hidden="true" />
          <div className="pdy-mobile-menu-halo" aria-hidden="true" />

          <div className="pdy-mobile-menu-inner">
            <div className="pdy-mobile-menu-top">
              <button
                ref={closeButtonRef}
                type="button"
                className="pdy-mobile-menu-close"
                onClick={onClose}
                aria-label="Fermer le menu"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <nav
              className="pdy-mobile-menu-nav"
              aria-label="Navigation principale"
            >
              <ul>
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    custom={i}
                    variants={reduced ? undefined : itemVariants}
                    initial={reduced ? false : "hidden"}
                    animate={reduced ? undefined : "visible"}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="pdy-mobile-menu-link"
                    >
                      <span
                        className="pdy-mobile-menu-link-num"
                        aria-hidden="true"
                      >
                        {item.num}
                      </span>
                      <span className="pdy-mobile-menu-link-label">
                        {item.label}
                      </span>
                      <span
                        className="pdy-mobile-menu-link-arrow"
                        aria-hidden="true"
                      >
                        <ArrowRight />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="pdy-mobile-menu-meta"
              variants={reduced ? undefined : metaVariants}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
            >
              <a
                href="mailto:hello@paradeyesagency.com"
                className="pdy-mobile-menu-meta-item"
              >
                <Mail aria-hidden="true" />
                <span>hello@paradeyesagency.com</span>
              </a>
              <div className="pdy-mobile-menu-meta-item">
                <MapPin aria-hidden="true" />
                <span>PARIS - CANNES</span>
              </div>
              <div className="pdy-mobile-menu-meta-item">
                <Clock aria-hidden="true" />
                <span>Du lundi au vendredi, 9h à 19h</span>
              </div>
              <div className="pdy-mobile-menu-social">
                <a
                  href="https://linkedin.com/company/paradeyesagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Paradeyes (ouverture nouvel onglet)"
                  className="pdy-mobile-menu-social-link"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://instagram.com/paradeyesagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Paradeyes (ouverture nouvel onglet)"
                  className="pdy-mobile-menu-social-link"
                >
                  <InstagramIcon />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="pdy-mobile-menu-cta-wrapper"
              variants={reduced ? undefined : ctaVariants}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
            >
              <Link
                href="/contact#appel"
                onClick={onClose}
                className="pdy-mobile-menu-cta"
              >
                <span
                  className="pdy-mobile-menu-cta-dot"
                  aria-hidden="true"
                />
                <span>Un appel gratuit de 30 min</span>
                <ArrowRight aria-hidden="true" />
              </Link>

              <div className="pdy-mobile-menu-switches">
                <LangSwitch locale={locale} />
                <ThemeSwitch />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
