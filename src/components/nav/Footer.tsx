"use client";

import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PreFooterCTA } from "./PreFooterCTA";

interface FooterProps {
  locale: "fr" | "en";
  showPreFooter?: boolean;
  preFooterVariant?: "default" | "offre" | "contact";
}

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

const extIconSize = "w-[14px] h-[14px]";
const brandIconSize = "w-[14px] h-[14px]";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={brandIconSize}>
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

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={brandIconSize}>
      <path d="M7.8 11.4H4.4v-3h3.2c1.1 0 1.7.5 1.7 1.5s-.5 1.5-1.5 1.5zm-3.4 1.8h3.6c1.2 0 1.9.6 1.9 1.7s-.7 1.7-1.9 1.7H4.4v-3.4zM1 18.8h7c2.4 0 4.6-1.2 4.6-3.9 0-1.6-.8-2.8-2.5-3.2 1.2-.6 1.9-1.5 1.9-3 0-2.4-1.8-3.2-4.1-3.2H1v13.3zm16.4-9.8c-2.7 0-4.7 2-4.7 4.9s2 4.9 4.7 4.9c2.1 0 3.6-1 4.3-2.9h-2.3c-.3.7-.9 1-1.9 1-1.3 0-2.1-.8-2.2-2.1h6.6c.2-2.9-1.5-5.8-4.5-5.8zm-2 3.8c.2-1.1 1-1.8 2-1.8 1.1 0 1.8.6 2 1.8H15.4zm6.2-6.8h-5.5v-1.3h5.5V6z" />
    </svg>
  );
}

function FootLogoMark() {
  return (
    <svg viewBox="0 0 185 106" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42.4446 13.0044L56.5687 27.6319C56.5687 27.6319 37.941 46.0813 38.5858 53.7144C39.2307 61.3475 56.5687 78.5194 56.5687 78.5194L41.7997 95.0527C41.7997 95.0527 -1.86231 63.2532 0.0617747 54.039C1.98586 44.8143 26.3964 18.7319 42.4446 13.0044Z" fill="#57EEA1" />
      <path d="M78.4103 2.19861C78.4103 2.19861 150.342 -7.97889 184.373 54.039C184.373 54.039 155.469 113.512 78.4103 103.974C78.4103 103.974 123.362 94.8432 148.418 53.2955C148.418 53.2955 130.435 17.4649 78.4103 2.19861Z" fill="#57EEA1" />
      <path d="M119.472 53.2854C98.4018 56.6674 95.6108 59.4316 92.1961 80.2997C88.7814 59.4316 85.9904 56.6674 64.9205 53.2854C85.9904 49.9033 88.7814 47.1391 92.1961 26.271C95.6108 47.1391 98.4018 49.9033 119.472 53.2854Z" fill="#57EEA1" />
    </svg>
  );
}

const MARQUEE_ITEMS = [
  "On comprend.",
  "On conçoit.",
  "On construit.",
] as const;

export function Footer({
  locale,
  showPreFooter = true,
  preFooterVariant = "default",
}: FooterProps) {
  const year = new Date().getFullYear();
  void locale;

  return (
    <>
      {showPreFooter && <PreFooterCTA variant={preFooterVariant} locale={locale} />}

      <footer
        className="pdy-footer"
        data-section-theme="dark"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Pied de page
        </h2>

        <div className="pdy-footer-halo-1" aria-hidden="true" />
        <div className="pdy-footer-halo-2" aria-hidden="true" />
        <div className="pdy-footer-grain" aria-hidden="true" />

        <div className="pdy-footer-marquee" aria-hidden="true">
          <div className="pdy-footer-marquee-track">
            {Array.from({ length: 2 }).flatMap((_, iteration) =>
              MARQUEE_ITEMS.flatMap((item, idx) => [
                <span
                  key={`item-${iteration}-${idx}`}
                  className="pdy-footer-marquee-item"
                >
                  {item}
                </span>,
                <span
                  key={`sep-${iteration}-${idx}`}
                  className="pdy-footer-marquee-sep"
                >
                  ·
                </span>,
              ]),
            )}
          </div>
        </div>

        <div className="pdy-footer-main">
          <div className="pdy-foot-col-id">
            <Link
              href="/"
              aria-label="Paradeyes, retour à l'accueil"
              className="pdy-foot-logo"
            >
              <span className="pdy-foot-logo-mark" aria-hidden="true">
                <FootLogoMark />
              </span>
              <span className="pdy-foot-logo-word">paradeyes</span>
            </Link>
            <p className="pdy-foot-baseline">
              Le cinéma rencontre le tableau de bord.
            </p>
            <Link
              href="/contact#appel"
              className="pdy-foot-cta"
              onClick={() => {
                const plausible = (window as PlausibleWindow).plausible;
                if (typeof plausible === "function") {
                  plausible("cta_footer_clicked");
                }
              }}
            >
              Un appel gratuit de 30 min
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="pdy-foot-col-nav">
            <p className="pdy-foot-col-title">Plan du site</p>
            <nav className="pdy-foot-links" aria-label="Plan du site">
              <Link href="/agence">Agence</Link>
              <Link href="/offres">Offres</Link>
              <Link href="/realisations">Réalisations</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          <div className="pdy-foot-col-contact">
            <p className="pdy-foot-col-title">Contact</p>
            <a
              href="mailto:hello@paradeyesagency.com"
              className="pdy-foot-email"
            >
              <Mail aria-hidden="true" />
              hello@paradeyesagency.com
            </a>
            <p className="pdy-foot-address">Cannes, France</p>
            <p className="pdy-foot-hours">Du lundi au vendredi, 9h à 19h</p>
          </div>

          <div className="pdy-foot-col-soc">
            <p className="pdy-foot-col-title">Social</p>
            <nav className="pdy-foot-links" aria-label="Réseaux sociaux">
              <a
                href="https://linkedin.com/company/paradeyesagency"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon />
                LinkedIn
                <ExternalLink className={`${extIconSize} pdy-ext`} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/paradeyesagency"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
                Instagram
                <ExternalLink className={`${extIconSize} pdy-ext`} aria-hidden="true" />
              </a>
              <a
                href="https://behance.net/paradeyesagency"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BehanceIcon />
                Behance
                <ExternalLink className={`${extIconSize} pdy-ext`} aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>

        <div className="pdy-foot-bottom">
          <p className="pdy-foot-copy">
            © {year} Paradeyes Agency. Tous droits réservés.
          </p>
          <div className="pdy-foot-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/cgv">CGV</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
