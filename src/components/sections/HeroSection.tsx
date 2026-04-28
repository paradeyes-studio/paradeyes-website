"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ArrowRight, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Particles } from "@/components/ui/Particles";
import { HeroScrollIndicator } from "./HeroScrollIndicator";

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
  subtitleMobile: string;
  irisLead: string;
  irisPlaceholder: string;
  suggestions: string[];
  trustBadges: string[];
  mobileTrustBadges: string[];
  discover: string;
};

const COPY: Record<"fr" | "en", HeroCopy> = {
  fr: {
    badge: "AGENCE DE COMMUNICATION PREMIUM",
    tagline:
      "On identifie ce qui bloque votre croissance. On construit ce qui performe.",
    subtitle:
      "Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.",
    subtitleMobile:
      "Une agence sur-mesure, pensée pour transformer vos enjeux en résultats.",
    irisLead: "Décrivez votre projet. IRIS vous oriente en 2 minutes.",
    irisPlaceholder:
      "Qu'aimeriez-vous améliorer pour rendre votre business plus performant ?",
    suggestions: [
      "Branding",
      "Site web",
      "Contenus",
      "Déploiement",
      "Acquisition",
      "Événement",
    ],
    trustBadges: [
      "Une seule agence, un seul interlocuteur",
      "Approche sur-mesure, jamais de template",
      "ROI mesurable sur chaque projet",
    ],
    mobileTrustBadges: [
      "Une seule agence",
      "Sur-mesure",
      "ROI mesurable",
    ],
    discover: "Découvrir",
  },
  en: {
    badge: "PREMIUM COMMUNICATION AGENCY",
    tagline: "We identify what blocks your growth. We build what performs.",
    subtitle:
      "An agency that understands your business before proposing. Strategic communication, design, video, web. Custom-built, engineered to convert.",
    subtitleMobile:
      "A bespoke agency, built to turn your challenges into measurable results.",
    irisLead: "Describe your project. IRIS guides you in 2 minutes.",
    irisPlaceholder:
      "What would you like to improve to make your business perform better?",
    suggestions: [
      "Branding",
      "Website",
      "Content",
      "Deployment",
      "Acquisition",
      "Event",
    ],
    trustBadges: [
      "One agency, one single point of contact",
      "Bespoke approach, never a template",
      "Measurable ROI on every project",
    ],
    mobileTrustBadges: [
      "One single agency",
      "Bespoke",
      "Measurable ROI",
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
  const submitRef = useMagnetic<HTMLButtonElement>({ strength: 6, radius: 120 });

  // Scroll-driven parallax on the 3 halos: each layer translates at a different speed
  // creating depth as the user scrolls past the hero.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const scrollY = window.scrollY;
      hero.style.setProperty("--halo-1-y", `${scrollY * 0.35}px`);
      hero.style.setProperty("--halo-2-y", `${scrollY * 0.5}px`);
      hero.style.setProperty("--halo-3-y", `${scrollY * 0.7}px`);
      hero.style.setProperty("--hero-content-y", `${scrollY * 0.15}px`);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fallback strategy: always use FR when Sanity/i18n is empty, to avoid
  // FR/EN mix on /en when only some fields are translated.
  void locale;
  const fallback = COPY.fr;

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

  // Split tagline to emphasize the last word (ex: "performe.") in italic green
  const taglineWords = tagline.trim().split(" ");
  const taglineLast = taglineWords[taglineWords.length - 1] ?? "";
  const taglineLead = taglineWords.slice(0, -1).join(" ");

  // Split IRIS lead to bold "IRIS"
  const irisLeadParts = fallback.irisLead.split("IRIS");
  const irisBefore = irisLeadParts[0] ?? "";
  const irisAfter = irisLeadParts[1] ?? "";

  return (
    <section
      ref={heroRef}
      data-section-theme="dark"
      data-hero-root
      className="pdy-hero relative overflow-hidden flex flex-col pt-[80px] md:pt-[96px] lg:pt-[112px]"
      style={{
        backgroundColor: "var(--color-green-deep)",
        minHeight: "100svh",
      }}
    >
      {/* Grid texture overlay (matches dark sections) */}
      <div className="pdy-hero-grid" aria-hidden="true" />

      {/* Floating particles — very subtle ambient depth */}
      <Particles count={28} variant="green" />

      {/* Halo - Couche 1 ambient, centered */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--halo-1-y, 0), 0)", willChange: "transform" }}
      >
        <div
          className="absolute"
          style={{
            top: "25%",
            left: "50%",
            width: "90%",
            height: "70%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            className="w-full h-full"
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
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(87, 238, 161, 0.55) 0%, rgba(87, 238, 161, 0.2) 30%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
        </div>
      </motion.div>

      {/* Halo - Couche 2 core, centered */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--halo-2-y, 0), 0)", willChange: "transform" }}
      >
        <div
          className="absolute"
          style={{
            top: "40%",
            left: "50%",
            width: "45%",
            height: "60%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            className="w-full h-full"
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
              background:
                "radial-gradient(circle, rgba(87, 238, 161, 0.5) 0%, transparent 55%)",
              filter: "blur(60px)",
            }}
          />
        </div>
      </motion.div>

      {/* Halo - Couche 3 highlight, centered */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        aria-hidden="true"
        style={{ transform: "translate3d(0, var(--halo-3-y, 0), 0)", willChange: "transform" }}
      >
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "20%",
            height: "30%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            className="w-full h-full"
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
              background:
                "radial-gradient(circle, rgba(87, 238, 161, 0.7) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
      </motion.div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      <div className="relative flex-1 flex items-center w-full">
        <div className="w-full max-w-[var(--container-site)] mx-auto px-5 lg:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge positionnement */}
          <motion.div
            variants={variant(0)}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-6"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full pulse-green-dot"
              style={{ backgroundColor: "var(--color-green-electric)" }}
              aria-hidden="true"
            />
            <p
              className="font-mono uppercase font-medium"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              {badge}
            </p>
          </motion.div>

          {/* Titre H1 : italique vert sur le dernier mot */}
          <motion.h1
            variants={variant(0.15, 24)}
            initial="hidden"
            animate="visible"
            className="font-display font-medium mb-4"
            style={{
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              lineHeight: "1.04",
              letterSpacing: "-0.035em",
              color: "white",
              maxWidth: "min(22ch, 100%)",
              textWrap: "balance",
            }}
          >
            {taglineLead}{" "}
            <em
              className="italic font-medium pdy-headline-emphasis"
              style={{
                fontFamily: "var(--font-italic-accent)",
                color: "var(--color-green-electric)",
              }}
            >
              {taglineLast}
            </em>
          </motion.h1>

          {/* Subtitle desktop, conserve le wording dynamique Sanity ou fallback. */}
          <motion.p
            variants={variant(0.4)}
            initial="hidden"
            animate="visible"
            className="pdy-hero-subtitle pdy-hero-subtitle--desktop font-body mb-7 max-w-[min(56ch,100%)]"
            style={{
              fontSize: "clamp(0.875rem, 2.4vw, 0.9375rem)",
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "1.55",
            }}
          >
            {subtitle}
          </motion.p>

          {/* Subtitle mobile, fallback statique uniquement, ignorer data?.heroSubtitle.
              Champ Sanity dedie heroSubtitleMobile a creer plus tard si besoin. */}
          <motion.p
            variants={variant(0.4)}
            initial="hidden"
            animate="visible"
            className="pdy-hero-subtitle pdy-hero-subtitle--mobile font-body mb-7 max-w-[min(56ch,100%)]"
            style={{
              fontSize: "clamp(0.875rem, 2.4vw, 0.9375rem)",
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "1.55",
            }}
          >
            {COPY[locale].subtitleMobile}
          </motion.p>

          {/* Carte IRIS : proportions canoniques 800px max, submit 44px */}
          <motion.div
            variants={variant(0.65, 16)}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="pdy-iris-card">
              {/* Header card avec IRIS en gras */}
              <p
                className="text-center font-body mb-3"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(0, 49, 53, 0.7)",
                  lineHeight: "1.5",
                }}
              >
                {irisBefore}
                <strong
                  className="font-semibold"
                  style={{ color: "var(--color-green-deep)" }}
                >
                  IRIS
                </strong>
                {irisAfter}
              </p>

              {/* Input pill : height 56px / submit 44px enforced via CSS */}
              <div className="pdy-iris-input-wrap">
                <Paperclip
                  className="w-4 h-4 shrink-0"
                  style={{ color: "rgba(0, 49, 53, 0.4)" }}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  disabled
                  placeholder={irisPlaceholder}
                  className="pdy-iris-input"
                  aria-label="IRIS diagnostic"
                />
                <button
                  ref={submitRef}
                  type="button"
                  className="pdy-iris-submit"
                  aria-label="Envoyer"
                >
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>

              {/* Pills suggestions : 6 chips, nowrap desktop, scroll horizontal mobile */}
              <div className="pdy-iris-chips-row">
                {fallback.suggestions.map((suggestion, i) => (
                  <button
                    key={suggestion}
                    type="button"
                    className={cn(
                      "pdy-iris-chip",
                      i === 0 && "pdy-iris-chip--active",
                    )}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>

      {/* Hero bottom band: trust row + scroll indicator. Anchored to the natural
          bottom of the section so the main content above can center cleanly in
          the available height without being pulled up by the bottom weight. */}
      <div className="relative w-full px-5 lg:px-6 pb-5 lg:pb-8 pt-2 md:pt-0">
        <div className="pdy-hero-bottom max-w-4xl mx-auto">
          {/* Trust row desktop, conserve le rendu actuel avec icones Check. */}
          <motion.ul
            variants={variant(0.85)}
            initial="hidden"
            animate="visible"
            className="pdy-trust-row pdy-trust-row--desktop"
          >
            {trustBadges.map((label, i) => (
              <li
                key={`${label}-${i}`}
                className="pdy-trust-item inline-flex items-center gap-2"
              >
                <Check
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: "var(--color-green-electric)" }}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span className="font-mono uppercase pdy-trust-label">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* Trust row mobile, 1 ligne avec separateur point milieu, sans icone. */}
          <motion.ul
            variants={variant(0.85)}
            initial="hidden"
            animate="visible"
            className="pdy-trust-row pdy-trust-row--mobile"
          >
            {COPY[locale].mobileTrustBadges.map((label, i) => (
              <li key={`m-${label}-${i}`}>
                <span className="font-mono uppercase">{label}</span>
              </li>
            ))}
          </motion.ul>

          <HeroScrollIndicator label="Faites défiler" />
        </div>
      </div>
    </section>
  );
}
