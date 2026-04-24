"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroData {
  heroBadgePositionnement?: string;
  heroPhraseAccroche?: string;
  heroSubtitle?: string;
  heroPlaceholderIris?: string;
  heroBadges?: Array<{ label: string }>;
}

interface HeroSectionProps {
  data?: HeroData;
  locale?: "fr" | "en";
}

type HeroCopy = {
  badge: string;
  tagline: string;
  subtitle: string;
  irisPlaceholder: string;
  irisHelper: string;
  trustBadges: string[];
  ctaSecondary: string;
};

const COPY: Record<"fr" | "en", HeroCopy> = {
  fr: {
    badge: "AGENCE DE COMMUNICATION PREMIUM",
    tagline:
      "On identifie ce qui bloque votre croissance. On construit ce qui performe.",
    subtitle:
      "Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.",
    irisPlaceholder: "Décrivez votre projet. IRIS vous oriente en 2 minutes.",
    irisHelper: "Diagnostic gratuit en 2 minutes",
    trustBadges: [
      "Une seule agence, un seul interlocuteur",
      "Approche sur-mesure, jamais de template",
      "ROI mesurable sur chaque projet",
    ],
    ctaSecondary:
      "Prendre rendez-vous directement pour un appel gratuit de 30 minutes",
  },
  en: {
    badge: "PREMIUM COMMUNICATION AGENCY",
    tagline: "We identify what blocks your growth. We build what performs.",
    subtitle:
      "An agency that understands your business before proposing. Strategic communication, design, video, web. Custom-built, engineered to convert.",
    irisPlaceholder: "Describe your project. IRIS guides you in 2 minutes.",
    irisHelper: "Free 2-minute diagnostic",
    trustBadges: [
      "One agency, one single point of contact",
      "Bespoke approach, never a template",
      "Measurable ROI on every project",
    ],
    ctaSecondary: "Book a free 30-minute call directly",
  },
};

const fadeSlideUp = (delay: number, y: number = 16): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] },
  },
});

const fadeOnly = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay },
  },
});

export function HeroSection({ data, locale = "fr" }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const fallback = COPY[locale] ?? COPY.fr;

  const badge = data?.heroBadgePositionnement || fallback.badge;
  const tagline = data?.heroPhraseAccroche || fallback.tagline;
  const subtitle = data?.heroSubtitle || fallback.subtitle;
  const irisPlaceholder =
    data?.heroPlaceholderIris || fallback.irisPlaceholder;
  const trustBadges =
    data?.heroBadges && data.heroBadges.length > 0
      ? data.heroBadges.map((b) => b.label)
      : fallback.trustBadges;

  const variant = (delay: number, y?: number): Variants =>
    prefersReducedMotion ? fadeOnly(delay) : fadeSlideUp(delay, y);

  return (
    <section
      ref={heroRef}
      data-section-theme="light"
      className={cn(
        "relative overflow-hidden flex items-center min-h-screen",
        "pt-[calc(64px+var(--spacing-6))] pb-[var(--spacing-8)]",
        "lg:pt-[calc(72px+var(--spacing-9))] lg:pb-[var(--spacing-9)]",
        "bg-[var(--color-bg-canvas)]",
      )}
    >
      {/* Halo vert volumétrique — opacity 0.5, blur 60px, vertically centered */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(87, 238, 161, 0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-[var(--container-site)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)]">
        <div className="flex flex-col items-center text-center">
          {/* Row 1 : Badge positionnement */}
          <motion.div
            variants={variant(0)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-[var(--spacing-6)]"
          >
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-special)]"
              animate={prefersReducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <p className="font-mono text-mono-sm uppercase tracking-[0.12em] font-medium text-[var(--color-text-primary)]">
              {badge}
            </p>
          </motion.div>

          {/* Row 2 : Phrase d'accroche (h1) — Satoshi via font-display */}
          <motion.h1
            variants={variant(0.1, 24)}
            initial="hidden"
            animate="visible"
            className={cn(
              "font-display font-medium",
              "text-display-lg lg:text-display-xl",
              "leading-[var(--leading-heading-1)]",
              "tracking-[var(--tracking-tight)]",
              "text-[var(--color-text-primary)]",
              "max-w-[18ch]",
              "mb-[var(--spacing-5)]",
            )}
          >
            {tagline}
          </motion.h1>

          {/* Row 3 : Sous-titre — DM Sans via font-body */}
          <motion.p
            variants={variant(0.35)}
            initial="hidden"
            animate="visible"
            className={cn(
              "font-body text-body-lg",
              "leading-[var(--leading-body-lg)]",
              "text-[var(--color-text-secondary)]",
              "max-w-[56ch]",
              "mb-[var(--spacing-7)]",
            )}
          >
            {subtitle}
          </motion.p>

          {/* Row 4 : Bloc IRIS — glass placeholder */}
          <motion.div
            variants={
              prefersReducedMotion
                ? fadeOnly(0.5)
                : {
                    hidden: { opacity: 0, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }
            }
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl mb-[var(--spacing-6)]"
          >
            <div
              className={cn(
                "relative flex items-center gap-3",
                "px-5 py-4 rounded-2xl",
                "bg-[rgb(255_255_255/0.6)]",
                "border border-[rgb(2_50_54/0.18)]",
                "backdrop-blur-md",
                "shadow-[0_4px_24px_-8px_rgb(2_50_54/0.12)]",
                "transition-all duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                "hover:border-[var(--color-accent-primary)]",
                "hover:shadow-[0_8px_32px_-8px_rgb(2_50_54/0.18)]",
                "focus-within:border-[var(--color-accent-primary)]",
                "focus-within:shadow-[0_0_0_2px_rgb(2_50_54/0.12),0_8px_32px_-8px_rgb(2_50_54/0.18)]",
              )}
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={irisPlaceholder}
                  disabled
                  className={cn(
                    "w-full bg-transparent",
                    "font-body text-body-md",
                    "text-[var(--color-text-primary)]",
                    "placeholder:text-[var(--color-text-secondary)]",
                    "outline-none cursor-default",
                  )}
                  aria-label="IRIS diagnostic"
                />
              </div>
              <div
                className={cn(
                  "shrink-0 flex items-center justify-center",
                  "w-10 h-10 rounded-xl",
                  "bg-[var(--color-accent-primary)]",
                  "text-[var(--color-text-inverse)]",
                  "shadow-[0_2px_8px_-2px_rgb(2_50_54/0.35)]",
                  "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                  "hover:scale-105",
                )}
                aria-hidden="true"
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-center font-mono text-mono-xs text-[var(--color-text-secondary)] tracking-wider">
              {fallback.irisHelper}
            </p>
          </motion.div>

          {/* Row 5 : Trust badges + CTA secondaire */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)] max-w-[var(--container-4xl)]">
            <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
              {trustBadges.map((label, i) => (
                <motion.li
                  key={`${label}-${i}`}
                  variants={variant(0.7 + i * 0.06)}
                  initial="hidden"
                  animate="visible"
                  className="inline-flex items-center gap-2"
                >
                  <Check
                    className="w-3.5 h-3.5 text-[var(--color-accent-primary)] shrink-0"
                    aria-hidden="true"
                    strokeWidth={2.5}
                  />
                  <span className="font-mono text-mono-xs uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              variants={variant(0.88)}
              initial="hidden"
              animate="visible"
              href="/contact#appel"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  typeof (window as unknown as { plausible?: (event: string) => void }).plausible === "function"
                ) {
                  (window as unknown as { plausible: (event: string) => void }).plausible(
                    "cta_hero_secondary_clicked",
                  );
                }
              }}
              className={cn(
                "group inline-flex items-center gap-1.5",
                "font-body text-body-sm font-medium",
                "text-[var(--color-text-primary)]",
                "underline underline-offset-4 decoration-[var(--color-border-default)]",
                "hover:text-[var(--color-accent-primary)]",
                "hover:decoration-[var(--color-accent-primary)]",
                "transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-[var(--color-focus-on-light)]",
                "rounded-sm",
              )}
            >
              <span>{fallback.ctaSecondary}</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
