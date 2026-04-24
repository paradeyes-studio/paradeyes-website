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
    ctaSecondary: "Appel direct de 30 minutes",
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
    ctaSecondary: "Direct 30-minute call",
  },
};

const fadeSlideUp = (delay: number, y: number = 16): Variants => ({
  hidden: {
    opacity: 0,
    y,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const fadeSlideUpReduced = (delay: number): Variants => ({
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
    prefersReducedMotion ? fadeSlideUpReduced(delay) : fadeSlideUp(delay, y);

  return (
    <section
      ref={heroRef}
      data-section-theme="light"
      className={cn(
        "relative overflow-hidden flex items-center min-h-[100vh] max-h-[1080px]",
        "pt-[calc(64px+var(--spacing-6))] pb-[var(--spacing-8)]",
        "lg:pt-[var(--spacing-10)] lg:pb-[var(--spacing-8)]",
        "bg-[var(--color-bg-canvas)]",
      )}
    >
      {/* Halo vert volumétrique multi-couches */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Couche 1 : ambient (la plus large) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.03, 1] }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[1400px] h-[900px]"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 65%, rgba(87, 238, 161, 0.35) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>

        {/* Couche 2 : core (moyen) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.05, 1] }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(87, 238, 161, 0.5) 0%, transparent 60%)",
              filter: "blur(30px)",
              transform: "translateY(40px)",
            }}
          />
        </motion.div>

        {/* Couche 3 : highlight (concentré) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.08, 1] }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="w-[320px] h-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(87, 238, 161, 0.75) 0%, transparent 70%)",
              filter: "blur(18px)",
              transform: "translateY(30px)",
            }}
          />
        </motion.div>
      </div>

      <div className="relative w-full max-w-[var(--container-site)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)]">
        <div className="flex flex-col items-center text-center">
          {/* Row 1 : Badge positionnement */}
          <motion.div
            variants={variant(0)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-[var(--spacing-7)]"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-special)] pulse-green-dot"
              aria-hidden="true"
            />
            <p className="font-mono text-mono-sm uppercase tracking-[0.12em] font-medium text-[var(--color-text-primary)]">
              {badge}
            </p>
          </motion.div>

          {/* Row 2 : Phrase d'accroche (h1) — Satoshi via font-display */}
          <motion.h1
            variants={variant(0.15, 24)}
            initial="hidden"
            animate="visible"
            className={cn(
              "font-display font-semibold",
              "text-display-lg lg:text-display-xl",
              "leading-[var(--leading-heading-1)]",
              "tracking-[-0.035em]",
              "text-[var(--color-text-primary)]",
              "max-w-[18ch]",
              "mb-[var(--spacing-6)]",
            )}
          >
            {tagline}
          </motion.h1>

          {/* Row 3 : Sous-titre — DM Sans via font-body */}
          <motion.p
            variants={variant(0.4)}
            initial="hidden"
            animate="visible"
            className={cn(
              "font-body text-body-lg",
              "leading-[var(--leading-body-lg)]",
              "text-[var(--color-text-secondary)]",
              "max-w-[56ch]",
              "mb-[var(--spacing-8)]",
            )}
          >
            {subtitle}
          </motion.p>

          {/* Row 4 : Bloc IRIS — glass placeholder */}
          <motion.div
            variants={
              prefersReducedMotion
                ? fadeSlideUpReduced(0.6)
                : {
                    hidden: { opacity: 0, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.6,
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
                "transition-all duration-300 ease-out",
                "group/iris",
              )}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(2, 50, 54, 0.12)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                  "0 1px 2px rgba(2, 50, 54, 0.04)",
                  "0 20px 40px -10px rgba(2, 50, 54, 0.1)",
                  "0 0 0 1px rgba(2, 50, 54, 0.02)",
                ].join(", "),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(87, 238, 161, 0.5)";
                e.currentTarget.style.boxShadow = [
                  "inset 0 1px 0 rgba(255, 255, 255, 1)",
                  "0 1px 2px rgba(2, 50, 54, 0.04)",
                  "0 30px 60px -10px rgba(2, 50, 54, 0.15)",
                  "0 0 0 1px rgba(87, 238, 161, 0.3)",
                ].join(", ");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(2, 50, 54, 0.12)";
                e.currentTarget.style.boxShadow = [
                  "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                  "0 1px 2px rgba(2, 50, 54, 0.04)",
                  "0 20px 40px -10px rgba(2, 50, 54, 0.1)",
                  "0 0 0 1px rgba(2, 50, 54, 0.02)",
                ].join(", ");
              }}
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
                  "w-11 h-11 rounded-xl",
                  "text-[var(--color-text-inverse)]",
                  "transition-transform duration-300 ease-out",
                  "group-hover/iris:scale-105",
                )}
                style={{
                  background:
                    "linear-gradient(135deg, #023236 0%, #013235 100%)",
                  boxShadow: [
                    "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    "0 4px 12px -2px rgba(2, 50, 54, 0.4)",
                    "0 0 0 1px rgba(255, 255, 255, 0.05)",
                  ].join(", "),
                }}
                aria-hidden="true"
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/iris:translate-x-0.5" />
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
                  variants={variant(0.85 + i * 0.08)}
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
              variants={variant(1.05)}
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
              <span>Appel direct de 30 minutes</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      {/* Transition douce vers la section suivante */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(2, 50, 54, 0.02) 50%, rgba(2, 50, 54, 0.08) 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
