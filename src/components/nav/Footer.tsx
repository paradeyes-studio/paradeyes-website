"use client";

import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";

const socialIconClass = "w-4 h-4";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.777 13.019H3.559V9h3.555v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={socialIconClass}>
      <path d="M7.803 5.731c.73 0 1.4.064 2.008.195.605.13 1.123.333 1.55.613.43.28.759.657.994 1.13.228.47.343 1.06.343 1.757 0 .754-.171 1.384-.513 1.884-.343.504-.85.911-1.517 1.229 1.008.286 1.758.795 2.263 1.514.5.724.75 1.587.75 2.588 0 .811-.156 1.523-.453 2.131-.308.606-.727 1.106-1.253 1.5-.528.39-1.138.683-1.831.876a7.873 7.873 0 01-2.132.291H0V5.731h7.803zm-.442 5.418c.6 0 1.094-.142 1.48-.428.386-.286.577-.748.577-1.391 0-.357-.066-.648-.194-.876-.13-.229-.305-.403-.52-.531-.217-.128-.466-.217-.742-.266a4.64 4.64 0 00-.872-.075H3.343v3.567h4.018zm.2 5.698c.328 0 .646-.03.945-.095.305-.06.577-.17.811-.319.231-.146.42-.35.554-.609.137-.256.206-.59.206-.996 0-.801-.226-1.368-.676-1.71-.451-.339-1.047-.509-1.793-.509H3.343v4.238h4.218zm10.535-.678c.458.445 1.114.667 1.96.667.617 0 1.147-.155 1.594-.466.441-.313.714-.642.818-.993h2.904c-.464 1.44-1.175 2.471-2.135 3.091-.955.62-2.117.93-3.472.93-.942 0-1.792-.15-2.553-.446-.756-.3-1.396-.724-1.933-1.274-.533-.549-.938-1.2-1.233-1.957-.287-.758-.43-1.594-.43-2.507 0-.883.148-1.705.446-2.463a5.765 5.765 0 011.269-1.969 5.868 5.868 0 011.956-1.308c.764-.314 1.6-.473 2.513-.473 1.024 0 1.908.202 2.653.602.744.403 1.36.94 1.842 1.615.481.678.82 1.445 1.026 2.306.195.863.27 1.74.226 2.63H16.24c0 .94.328 1.825.776 2.274zm3.466-6.127c-.367-.399-.958-.599-1.704-.599-.472 0-.868.084-1.182.242a2.483 2.483 0 00-.775.596c-.199.232-.338.484-.415.746a3.104 3.104 0 00-.149.691h5.092c-.072-.8-.35-1.36-.867-1.676zm-4.15-4.632h6.387v1.562h-6.387V5.41z" />
    </svg>
  );
}
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

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

export function Footer({
  locale,
  showPreFooter = true,
  preFooterVariant = "default",
}: FooterProps) {
  return (
    <footer className="relative" data-section-theme="dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>

      {showPreFooter && <PreFooterCTA variant={preFooterVariant} locale={locale} />}

      <div
        className={cn(
          "relative overflow-hidden",
          "bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]",
          "rounded-t-[var(--radius-section-mobile)] lg:rounded-t-[var(--radius-section)]",
          "pt-[var(--spacing-8)] lg:pt-[var(--spacing-10)]",
        )}
      >
        <div
          className="absolute inset-x-0 top-0 h-[600px] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 animate-[halo-pulse-green_16s_ease-in-out_infinite]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(87, 238, 161, 0.20) 0%, transparent 60%)",
              }}
            />
          </div>
          <div className="absolute inset-0 animate-[halo-pulse-violet_16s_ease-in-out_infinite_8s]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(101, 73, 246, 0.10) 0%, transparent 55%)",
              }}
            />
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
                <a
                  href="mailto:hello@paradeyesagency.com"
                  className="group inline-flex items-center gap-2 font-body text-body-sm font-medium text-[var(--color-text-inverse)] hover:text-[var(--color-accent-on-dark)] transition-colors duration-base ease-out-quart"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  hello@paradeyesagency.com
                </a>
                <p className="font-mono text-mono-xs uppercase tracking-wider text-[rgb(255_255_255/0.6)]">
                  Cannes, France
                </p>
              </div>

              <div className="pt-[var(--spacing-3)]">
                <Button
                  variant="primary-light"
                  size="md"
                  suffixIcon={<ArrowRight className="w-4 h-4" />}
                  animatedArrow
                  className="group"
                  onClick={() => {
                    const plausible = (window as PlausibleWindow).plausible;
                    if (typeof plausible === "function") {
                      plausible("cta_footer_clicked");
                    }
                    window.location.href = "/contact#appel";
                  }}
                >
                  Un appel gratuit de 30 min
                </Button>
              </div>
            </div>

            <FooterColumn
              title="Navigation"
              className="lg:col-span-2"
              links={[
                { label: "Agence", href: "/agence" },
                { label: "Réalisations", href: "/realisations" },
                { label: "Journal", href: "/journal" },
                { label: "Contact", href: "/contact" },
              ]}
            />

            <FooterColumn
              title="Offres"
              className="lg:col-span-2"
              links={[
                { label: "Branding et Identité de marque", href: "/offres/branding" },
                {
                  label: "Sites et Plateformes digitales",
                  href: "/offres/sites-et-plateformes",
                },
                {
                  label: "Création et production de contenus",
                  href: "/offres/creation-de-contenus",
                },
                {
                  label: "Déploiement et supports de marque",
                  href: "/offres/deploiement-et-supports",
                },
                {
                  label: "Acquisition et réputation digitale",
                  href: "/offres/acquisition-et-reputation",
                },
              ]}
            />

            <FooterColumn
              title="Ressources"
              className="lg:col-span-2"
              links={[
                { label: "Études de cas", href: "/realisations" },
                { label: "Journal", href: "/journal" },
              ]}
            />

            <FooterColumn
              title="Social"
              className="lg:col-span-2"
              external
              links={[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/paradeyesagency",
                  icon: <LinkedinIcon />,
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/paradeyesagency",
                  icon: <InstagramIcon />,
                },
                {
                  label: "Behance",
                  href: "https://behance.net/paradeyesagency",
                  icon: <BehanceIcon />,
                },
              ]}
            />
          </div>
        </div>

        <FooterBottom locale={locale} />
      </div>
    </footer>
  );
}
