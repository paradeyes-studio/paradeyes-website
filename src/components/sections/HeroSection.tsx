"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ArrowRight, Paperclip, ChevronDown } from "lucide-react";
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
  irisLead: string;
  irisPlaceholder: string;
  suggestions: string[];
  trustBadges: string[];
  discover: string;
};

const COPY: Record<"fr" | "en", HeroCopy> = {
  fr: {
    badge: "AGENCE DE COMMUNICATION PREMIUM",
    tagline:
      "On identifie ce qui bloque votre croissance. On construit ce qui performe.",
    subtitle:
      "Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.",
    irisLead: "Décrivez votre projet. IRIS vous oriente en 2 minutes.",
    irisPlaceholder:
      "Qu'aimeriez-vous améliorer pour rendre votre business plus performant ?",
    suggestions: [
      "Branding",
      "Site web",
      "Contenus",
      "Déploiement",
      "Acquisition",
    ],
    trustBadges: [
      "Une seule agence, un seul interlocuteur",
      "Approche sur-mesure, jamais de template",
      "ROI mesurable sur chaque projet",
    ],
    discover: "Découvrir",
  },
  en: {
    badge: "PREMIUM COMMUNICATION AGENCY",
    tagline: "We identify what blocks your growth. We build what performs.",
    subtitle:
      "An agency that understands your business before proposing. Strategic communication, design, video, web. Custom-built, engineered to convert.",
    irisLead: "Describe your project. IRIS guides you in 2 minutes.",
    irisPlaceholder:
      "What would you like to improve to make your business perform better?",
    suggestions: [
      "Branding",
      "Website",
      "Content",
      "Deployment",
      "Acquisition",
    ],
    trustBadges: [
      "One agency, one single point of contact",
      "Bespoke approach, never a template",
      "Measurable ROI on every project",
    ],
    discover: "Discover",
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
      data-section-theme="dark"
      className="relative overflow-hidden flex items-center justify-center min-h-screen pt-32 lg:pt-40 pb-16 lg:pb-24"
      style={{
        backgroundColor: "#023236",
        minHeight: "max(100vh, 800px)",
      }}
    >
      {/* Gradient organique - Couche ambient (la plus large) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.05, 1],
                  x: [0, 20, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "20%",
            left: "-15%",
            width: "80%",
            height: "80%",
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(87, 238, 161, 0.45) 0%, rgba(87, 238, 161, 0.15) 30%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Gradient core (plus concentré) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            top: "40%",
            left: "10%",
            width: "45%",
            height: "60%",
            background:
              "radial-gradient(circle, rgba(87, 238, 161, 0.35) 0%, transparent 55%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Gradient highlight (très concentré, subtil) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.6, 0.85, 0.6],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            top: "50%",
            left: "25%",
            width: "20%",
            height: "30%",
            background:
              "radial-gradient(circle, rgba(87, 238, 161, 0.6) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Grain overlay pour texture filmique */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[var(--container-site)] mx-auto px-5 lg:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge positionnement */}
          <motion.div
            variants={variant(0)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-8"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full pulse-green-dot"
              style={{ backgroundColor: "#57eea1" }}
              aria-hidden="true"
            />
            <p
              className="font-mono uppercase font-medium"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              {badge}
            </p>
          </motion.div>

          {/* Titre H1 */}
          <motion.h1
            variants={variant(0.15, 24)}
            initial="hidden"
            animate="visible"
            className="font-display font-medium mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.035em",
              color: "white",
              maxWidth: "22ch",
            }}
          >
            {tagline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={variant(0.4)}
            initial="hidden"
            animate="visible"
            className="font-body text-body-lg mb-14 max-w-[56ch]"
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              lineHeight: "1.6",
            }}
          >
            {subtitle}
          </motion.p>

          {/* Carte IRIS */}
          <motion.div
            variants={variant(0.65, 16)}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl mb-10"
          >
            <div
              className="relative rounded-3xl p-6 lg:p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                boxShadow: [
                  "inset 0 1px 0 rgba(255, 255, 255, 1)",
                  "0 1px 2px rgba(0, 0, 0, 0.04)",
                  "0 20px 50px -10px rgba(0, 0, 0, 0.2)",
                  "0 40px 80px -20px rgba(87, 238, 161, 0.15)",
                ].join(", "),
              }}
            >
              {/* Header card */}
              <p
                className="text-center font-body mb-5"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(2, 50, 54, 0.7)",
                  lineHeight: "1.5",
                }}
              >
                {fallback.irisLead}
              </p>

              {/* Input row */}
              <div
                className="relative flex items-center gap-3 rounded-full p-2 pl-5 mb-5"
                style={{
                  background: "rgba(2, 50, 54, 0.04)",
                  border: "1px solid rgba(2, 50, 54, 0.08)",
                }}
              >
                <Paperclip
                  className="w-4 h-4 shrink-0"
                  style={{ color: "rgba(2, 50, 54, 0.4)" }}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  disabled
                  placeholder={irisPlaceholder}
                  className="flex-1 bg-transparent outline-none font-body"
                  style={{
                    fontSize: "0.9375rem",
                    color: "#023236",
                  }}
                  aria-label="IRIS diagnostic"
                />
                <button
                  type="button"
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #023236 0%, #013235 100%)",
                    boxShadow: [
                      "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      "0 4px 10px -2px rgba(2, 50, 54, 0.3)",
                    ].join(", "),
                  }}
                  aria-label="Envoyer"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Pills suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {fallback.suggestions.map((suggestion, i) => (
                  <button
                    key={suggestion}
                    type="button"
                    className={cn(
                      "px-4 py-1.5 rounded-full",
                      "font-body text-body-sm font-medium",
                      "transition-all duration-200 ease-out",
                    )}
                    style={
                      i === 0
                        ? {
                            background: "#023236",
                            color: "white",
                          }
                        : {
                            background: "transparent",
                            color: "rgba(2, 50, 54, 0.8)",
                            border: "1px solid rgba(2, 50, 54, 0.15)",
                          }
                    }
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            variants={variant(0.85)}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center gap-3 md:gap-6"
          >
            {trustBadges.map((label, i) => (
              <li key={`${label}-${i}`} className="inline-flex items-center gap-2">
                <Check
                  className="w-3 h-3 shrink-0"
                  style={{ color: "#57eea1" }}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Section numbers bottom-left */}
      <div
        className="absolute bottom-8 left-5 lg:left-6 flex items-center gap-6 z-10"
        aria-hidden="true"
      >
        {["01", "02", "03"].map((num, i) => (
          <div key={num} className="relative">
            <span
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color:
                  i === 0
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.3)",
              }}
            >
              {num}.
            </span>
            {i === 0 && (
              <span
                className="absolute -bottom-1 left-0 w-full h-[1px]"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bouton Découvrir bottom-right */}
      <motion.button
        type="button"
        onClick={() => {
          document.getElementById("section-offres")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 right-5 lg:right-6 flex flex-col items-center gap-3 z-10"
        aria-label="Découvrir la suite"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #034045 0%, #023236 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: [
              "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              "0 10px 30px -5px rgba(0, 0, 0, 0.4)",
            ].join(", "),
          }}
        >
          <span
            className="font-body font-medium"
            style={{
              fontSize: "0.8125rem",
              color: "white",
            }}
          >
            {fallback.discover}
          </span>
        </div>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border flex items-center justify-center"
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <ChevronDown
            className="w-4 h-4"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
