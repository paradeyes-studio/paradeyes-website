"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type PreFooterVariant = "default" | "offre" | "contact";

interface PreFooterCTAProps {
  variant?: PreFooterVariant;
  locale: "fr" | "en";
}

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
};

const CONTENT: Record<
  PreFooterVariant,
  {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  }
> = {
  default: {
    eyebrow: "PRÊT À COMMENCER",
    title: "On parle de votre projet ?",
    description:
      "Un appel de 30 minutes pour comprendre vos enjeux, partager notre vision, et voir si on est faits pour travailler ensemble.",
    primaryLabel: "Un appel gratuit de 30 min",
    secondaryLabel: "Écrire un message",
  },
  offre: {
    eyebrow: "PASSONS À L'ÉTAPE SUIVANTE",
    title: "Ce que vous venez de lire vous parle ?",
    description:
      "Dites nous en plus sur votre contexte en 30 minutes. On repart avec une idée claire de ce qu'on peut construire ensemble.",
    primaryLabel: "Réserver un appel",
    secondaryLabel: "Voir nos autres offres",
  },
  contact: {
    eyebrow: "DERNIÈRE CHANCE",
    title: "Vous hésitez encore ?",
    description:
      "Un dernier moyen rapide. Appel de 30 minutes, sans engagement. On écoute, on conseille, on avance si ça colle.",
    primaryLabel: "Réserver maintenant",
    secondaryLabel: "Revenir plus tard",
  },
};

export function PreFooterCTA({
  variant = "default",
  locale: _locale,
}: PreFooterCTAProps) {
  const content = CONTENT[variant];

  return (
    <section
      className="relative bg-[var(--color-bg-canvas)] py-[var(--spacing-10)] lg:py-[var(--spacing-12)] overflow-hidden"
      data-section-theme="light"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(87, 238, 161, 0.3) 0%, transparent 50%)",
        }}
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
              const plausible = (window as PlausibleWindow).plausible;
              if (typeof plausible === "function") {
                plausible("cta_prefooter_clicked", { props: { variant } });
              }
              window.location.href = "/contact#appel";
            }}
          >
            {content.primaryLabel}
          </Button>
          <Button variant="link" size="md">
            {content.secondaryLabel}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
