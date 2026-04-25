"use client";

import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { useMagnetic } from "@/hooks/useMagnetic";
import { homeFooter } from "@/content/home-fallback";
import { Particles } from "@/components/ui/Particles";
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
  const logoRef = useMagnetic<HTMLAnchorElement>({ strength: 3, radius: 80 });
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
        <div className="pdy-footer-halo-3" aria-hidden="true" />
        <div className="pdy-footer-grain" aria-hidden="true" />
        <Particles count={20} variant="green" />

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
              ref={logoRef}
              href="/"
              aria-label="Paradeyes, retour à l'accueil"
              className="pdy-foot-logo"
            >
              <Logo className="pdy-foot-logo-svg" />
            </Link>
            <p className="pdy-foot-baseline">
              {homeFooter.tagline}
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
              <Link href="/realisations">Réalisations</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/faq">FAQ</Link>
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
            <p className="pdy-foot-address">PARIS - CANNES</p>
            <p className="pdy-foot-hours">Du lundi au vendredi, 9h à 19h</p>
          </div>

          <div className="pdy-foot-col-soc">
            <p className="pdy-foot-col-title">Social</p>
            <nav className="pdy-foot-links" aria-label="Réseaux sociaux">
              <a
                href="https://linkedin.com/company/paradeyesagency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (lien externe)"
              >
                <LinkedinIcon />
                LinkedIn
                <ExternalLink className={`${extIconSize} pdy-ext`} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/paradeyesagency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (lien externe)"
              >
                <InstagramIcon />
                Instagram
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
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
