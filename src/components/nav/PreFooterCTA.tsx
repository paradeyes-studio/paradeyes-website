"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Calendar, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { homePreFooter } from "@/content/home-fallback";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Particles } from "@/components/ui/Particles";

type PreFooterVariant = "default" | "offre" | "contact";

interface PreFooterCTAProps {
  variant?: PreFooterVariant;
  locale: "fr" | "en";
}

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

interface PreFooterContent {
  eyebrow: string;
  titleBefore: string;
  titleItalic: string;
  titleAfter: string;
  description: string;
  cta: string;
  ctaHref: string;
}

const CONTENT: Record<PreFooterVariant, PreFooterContent> = {
  default: {
    eyebrow: homePreFooter.eyebrow,
    titleBefore: homePreFooter.headline.before,
    titleItalic: homePreFooter.headline.italic,
    titleAfter: homePreFooter.headline.after,
    description: homePreFooter.sub,
    cta: homePreFooter.cta,
    ctaHref: homePreFooter.ctaHref,
  },
  offre: {
    eyebrow: "Passons à l'étape suivante",
    titleBefore: "Ce que vous venez de lire vous ",
    titleItalic: "parle",
    titleAfter: " ?",
    description:
      "Dites nous en plus sur votre contexte en 30 minutes. On repart avec une idée claire de ce qu'on peut construire ensemble.",
    cta: "Un appel gratuit de 30 min",
    ctaHref: "/contact#appel",
  },
  contact: {
    eyebrow: "Dernière chance",
    titleBefore: "Vous ",
    titleItalic: "hésitez",
    titleAfter: " encore ?",
    description:
      "Un dernier moyen rapide. Appel de 30 minutes, sans engagement. On écoute, on conseille, on avance si ça colle.",
    cta: "Un appel gratuit de 30 min",
    ctaHref: "/contact#appel",
  },
};

const IRIS_CHIPS = [
  "Branding",
  "Site web",
  "Contenus",
  "Déploiement",
  "Acquisition",
  "Événement",
];

type Tab = "iris" | "appel";

export function PreFooterCTA({
  variant = "default",
  locale: _locale,
}: PreFooterCTAProps) {
  void _locale;
  const content = CONTENT[variant];
  const [activeTab, setActiveTab] = useState<Tab>("iris");

  const trackPrefooter = (label: string) => {
    const plausible = (window as PlausibleWindow).plausible;
    if (typeof plausible === "function") {
      plausible("cta_prefooter_clicked", { props: { variant, tab: activeTab, label } });
    }
  };

  return (
    <section
      className="pdy-prefooter pdy-bloc-dark pdy-bloc-dark--pre-footer pdy-section-stacked"
      data-section-theme="dark"
      aria-labelledby="prefooter-title"
    >
      <Particles count={22} variant="green" />
      <div className="pdy-prefooter-inner">
        <header className="pdy-prefooter-header">
          <p className="pdy-prefooter-eyebrow">{content.eyebrow}</p>
          <SectionHeadline
            before={content.titleBefore}
            italic={content.titleItalic}
            after={content.titleAfter}
            className="pdy-prefooter-title"
            id="prefooter-title"
          />
          <p className="pdy-prefooter-sub">{content.description}</p>
        </header>

        <div
          className="pdy-prefooter-tabs"
          role="tablist"
          aria-label="Choisir un mode de contact"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "iris"}
            aria-controls="panel-iris"
            id="tab-iris"
            className={`pdy-prefooter-tab ${activeTab === "iris" ? "pdy-prefooter-tab--active" : ""}`}
            onClick={() => setActiveTab("iris")}
          >
            <Sparkles aria-hidden="true" />
            <span>Parlez à IRIS</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "appel"}
            aria-controls="panel-appel"
            id="tab-appel"
            className={`pdy-prefooter-tab ${activeTab === "appel" ? "pdy-prefooter-tab--active" : ""}`}
            onClick={() => setActiveTab("appel")}
          >
            <Calendar aria-hidden="true" />
            <span>Réservez un appel</span>
          </button>
          <span
            className="pdy-prefooter-tab-indicator"
            data-active={activeTab}
            aria-hidden="true"
          />
        </div>

        <div className="pdy-prefooter-panels">
          <AnimatePresence mode="wait">
            {activeTab === "iris" ? (
              <motion.div
                key="iris"
                role="tabpanel"
                id="panel-iris"
                aria-labelledby="tab-iris"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="pdy-prefooter-panel"
              >
                <div className="pdy-prefooter-iris">
                  <p className="pdy-prefooter-iris-intro">
                    Décrivez votre projet. IRIS vous oriente en 2 minutes.
                  </p>
                  <form
                    className="pdy-prefooter-iris-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      trackPrefooter("iris_submit");
                      window.location.href = "/contact#iris";
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Qu'aimeriez-vous améliorer pour rendre votre business plus performant ?"
                      className="pdy-prefooter-iris-input"
                      aria-label="Décrivez votre projet"
                    />
                    <button
                      type="submit"
                      className="pdy-prefooter-iris-submit"
                      aria-label="Envoyer"
                    >
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </form>
                  <div className="pdy-prefooter-iris-chips" role="list">
                    {IRIS_CHIPS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className="pdy-prefooter-iris-chip"
                        role="listitem"
                        onClick={() => trackPrefooter(`chip_${c}`)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="appel"
                role="tabpanel"
                id="panel-appel"
                aria-labelledby="tab-appel"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="pdy-prefooter-panel"
              >
                <div className="pdy-prefooter-appel">
                  <p className="pdy-prefooter-appel-intro">
                    {content.cta} pour discuter de votre projet de vive voix.
                  </p>
                  <Link
                    href={content.ctaHref}
                    className="pdy-prefooter-appel-cta"
                    onClick={() => trackPrefooter("appel_cta")}
                  >
                    <span className="pdy-prefooter-appel-cta-dot" aria-hidden="true" />
                    <span>{content.cta}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <div className="pdy-prefooter-appel-meta">
                    <a
                      href="mailto:hello@paradeyesagency.com"
                      className="pdy-prefooter-appel-meta-item"
                    >
                      <Mail aria-hidden="true" />
                      <span>hello@paradeyesagency.com</span>
                    </a>
                    <div className="pdy-prefooter-appel-meta-item">
                      <Calendar aria-hidden="true" />
                      <span>Du lundi au vendredi, 9h à 19h</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
