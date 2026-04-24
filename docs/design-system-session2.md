# Design System — Specs Session 2 (Hero Home)

> Source : page 27 du Design System Paradeyes (Étape 3).
> Ce fichier est la référence pour Claude Code.

---

## Principe

Le Hero home est l'endroit où se joue la décision en 3 secondes. Pour
10K€ M1 cibles luxe/immo/startup, il doit simultanément :
1. Signifier premium (badge positionnement + typo + matière glass)
2. Signifier humain et lucide (phrase d'accroche)
3. Proposer une action immédiate (input IRIS placeholder, pas un bouton)
4. Rassurer discrètement (3 trust badges)
5. Permettre au visiteur pressé de shortcut (CTA secondaire Calendly)

---

## Wordings canoniques (depuis Sanity homePage)

Les textes sont dans Sanity (champs heroBadgePositionnement,
heroPhraseAccroche, heroSubtitle, heroPlaceholderIris, heroBadges).
Fallback i18n dans messages/fr.json si Sanity ne renvoie rien.

| Bloc | Version FR |
|------|-----------|
| Badge positionnement | AGENCE DE COMMUNICATION PREMIUM |
| Phrase d'accroche (h1) | On identifie ce qui bloque votre croissance. On construit ce qui performe. |
| Sous-titre | Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir. |
| Introduction IRIS | Décrivez votre projet. IRIS vous oriente en 2 minutes. |
| Trust badge 1 | Une seule agence, un seul interlocuteur |
| Trust badge 2 | Approche sur-mesure, jamais de template |
| Trust badge 3 | ROI mesurable sur chaque projet |
| CTA secondaire | Prendre rendez-vous directement pour un appel gratuit de 30 minutes |

Pas de signature de marque dans le hero (décision 18 avril 2026).

---

## Anatomie verticale (5 rows)

**Row 1.** Badge positionnement avec point vert électrique pulsation.
**Row 2.** Phrase d'accroche Satoshi display-xl, max 18ch.
**Row 3.** Sous-titre body-lg, max 56ch.
**Row 4.** Bloc IRIS hero (placeholder pour l'instant, l'intégration
réelle est Étape 9). Input glass avec le placeholder "Décrivez votre
projet. IRIS vous oriente en 2 minutes."
**Row 5.** 3 trust badges + CTA secondaire text link.

**Halo vert volumétrique** en fond, blur 40px, opacity 40%.
**Section data-section-theme="light"** obligatoire pour que le Header
adapte ses couleurs.

---

## Tokens mappés

| Dimension | Token |
|-----------|-------|
| Padding vertical desktop | spacing-11 top (160px), spacing-9 bottom (96px) |
| Min-height desktop | 100vh min, 720px floor |
| Gap row 1→2 (badge → titre) | spacing-6 (32px) |
| Gap row 2→3 (titre → sous-titre) | spacing-5 (24px) |
| Gap row 3→4 (sous-titre → IRIS) | spacing-7 (48px) |
| Gap row 4→5 (IRIS → trust badges) | spacing-6 (32px) |
| Badge positionnement | text-mono-sm, tracking 0.12em |
| Phrase d'accroche | text-display-xl desktop / text-display-lg mobile |
| Leading phrase | leading-heading-1 (1.1) |
| Sous-titre | text-body-lg |
| Trust badges | text-mono-xs, tracking 0.08em |
| Halo radius | 600px |
| Halo blur | 40px |

Token manquant à ajouter dans globals.css :
```css
--spacing-11: 160px;
```

---

## Séquence d'entrée cascade (animation)

IMPORTANT : GSAP SplitText est un plugin premium payant. Utiliser
Framer Motion comme alternative pour la cascade d'entrée.

Séquence avec Framer Motion (stagger via delay) :
- t=0ms : Badge fade-in + slide-up 16px, 600ms ease-out-quart
- t=100ms : Phrase d'accroche fade-in + slide-up 24px, 800ms
- t=350ms : Sous-titre fade-in + slide-up 16px, 600ms
- t=500ms : Bloc IRIS scale 0.96→1 + halo fade-in, 800ms
- t=700ms : Trust badges + CTA secondaire stagger 60ms, 400ms

Durée totale cascade ≈ 1500ms.

Reduced motion : pas de slide/scale, juste fade-in simple 400ms.

---

## Code HeroSection.tsx

```typescript
// src/components/sections/HeroSection.tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroData {
  heroBadgePositionnement?: string;
  heroPhraseAccroche?: string;
  heroSubtitle?: string;
  heroPlaceholderIris?: string;
  heroBadges?: Array<{ label: string }>;
}

interface HeroSectionProps {
  data: HeroData;
}

const FALLBACK = {
  badge: "AGENCE DE COMMUNICATION PREMIUM",
  tagline: "On identifie ce qui bloque votre croissance. On construit ce qui performe.",
  subtitle: "Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.",
  irisPlaceholder: "Décrivez votre projet. IRIS vous oriente en 2 minutes.",
  trustBadges: [
    "Une seule agence, un seul interlocuteur",
    "Approche sur-mesure, jamais de template",
    "ROI mesurable sur chaque projet",
  ],
  ctaSecondary: "Prendre rendez-vous directement pour un appel gratuit de 30 minutes",
};

// Framer Motion variants for cascade
const fadeSlideUp = (delay: number, y: number = 16) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] },
  },
});

const fadeSlideUpReduced = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay },
  },
});

export function HeroSection({ data }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const badge = data.heroBadgePositionnement || FALLBACK.badge;
  const tagline = data.heroPhraseAccroche || FALLBACK.tagline;
  const subtitle = data.heroSubtitle || FALLBACK.subtitle;
  const irisPlaceholder = data.heroPlaceholderIris || FALLBACK.irisPlaceholder;
  const trustBadges = data.heroBadges?.map((b) => b.label) || FALLBACK.trustBadges;

  const variant = (delay: number, y?: number) =>
    prefersReducedMotion ? fadeSlideUpReduced(delay) : fadeSlideUp(delay, y);

  return (
    <section
      ref={heroRef}
      data-section-theme="light"
      className={cn(
        "relative overflow-hidden flex items-center",
        "min-h-[100vh] min-h-[720px]",
        "pt-[var(--spacing-11)] pb-[var(--spacing-9)]",
        "bg-[var(--color-bg-canvas)]",
      )}
    >
      {/* Halo vert volumétrique */}
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
              "radial-gradient(circle, rgba(87, 238, 161, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
            transform: "translateY(60px)",
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
              animate={
                prefersReducedMotion
                  ? {}
                  : { opacity: [0.4, 1, 0.4] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <p className="font-mono text-mono-sm uppercase tracking-[0.12em] font-medium text-[var(--color-text-primary)]">
              {badge}
            </p>
          </motion.div>

          {/* Row 2 : Phrase d'accroche (h1) */}
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

          {/* Row 3 : Sous-titre */}
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

          {/* Row 4 : Bloc IRIS hero (placeholder) */}
          <motion.div
            variants={
              prefersReducedMotion
                ? fadeSlideUpReduced(0.5)
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
                "bg-[rgb(2_50_54/0.04)]",
                "border border-[var(--color-border-default)]",
                "backdrop-blur-sm",
                "transition-all duration-base ease-out-quart",
                "hover:border-[var(--color-accent-special)]",
                "hover:shadow-[0_0_0_1px_var(--color-accent-special)]",
                "focus-within:border-[var(--color-accent-special)]",
                "focus-within:shadow-[0_0_0_1px_var(--color-accent-special)]",
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
                  "transition-transform duration-base ease-out-quart",
                  "hover:scale-105",
                )}
                aria-hidden="true"
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-center font-mono text-mono-xs text-[var(--color-text-secondary)] tracking-wider">
              Diagnostic gratuit en 2 minutes
            </p>
          </motion.div>

          {/* Row 5 : Trust badges + CTA secondaire */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)] max-w-[var(--container-4xl)]">
            <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
              {trustBadges.map((badge, i) => (
                <motion.li
                  key={i}
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
                    {badge}
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
                  (window as any).plausible
                ) {
                  (window as any).plausible("cta_hero_secondary_clicked");
                }
              }}
              className={cn(
                "group inline-flex items-center gap-1.5",
                "font-body text-body-sm font-medium",
                "text-[var(--color-text-primary)]",
                "underline underline-offset-4 decoration-[var(--color-border-default)]",
                "hover:text-[var(--color-accent-primary)]",
                "hover:decoration-[var(--color-accent-primary)]",
                "transition-colors duration-base ease-out-quart",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-[var(--color-focus-on-light)]",
                "rounded-sm",
              )}
            >
              <span>Prendre rendez-vous directement pour un appel gratuit de 30 minutes</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-base ease-out-quart group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}
```

---

## Traductions i18n (messages/fr.json)

Ajouter ou mettre à jour la clé home.hero :

```json
{
  "home": {
    "hero": {
      "badge": "AGENCE DE COMMUNICATION PREMIUM",
      "tagline": "On identifie ce qui bloque votre croissance. On construit ce qui performe.",
      "subtitle": "Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.",
      "irisPlaceholder": "Décrivez votre projet. IRIS vous oriente en 2 minutes.",
      "trust": {
        "badge1": "Une seule agence, un seul interlocuteur",
        "badge2": "Approche sur-mesure, jamais de template",
        "badge3": "ROI mesurable sur chaque projet"
      },
      "ctaSecondary": "Prendre rendez-vous directement pour un appel gratuit de 30 minutes"
    }
  }
}
```

---

## Règles d'usage

1. Badge positionnement figé, tout caps, point vert pulsation 2s.
2. Phrase d'accroche max-width 18ch pour forcer le retour à la ligne.
3. Sous-titre max-width 56ch, lisibilité optimale.
4. Bloc IRIS = placeholder disabled pour l'instant (Étape 9 l'activera).
5. CTA secondaire text link discret, positionné après trust badges.
6. Trust badges avec Check icon stroke 2.5.
7. Section data-section-theme="light" obligatoire pour Header.
8. Halo vert : 600px, blur 40px, opacity 40%, translateY 60px.
9. Tracking Plausible : cta_hero_secondary_clicked.
10. Accessibilité : h1 unique, ul/li sémantique, aria-hidden sur
    icônes décoratives, focus-visible sur CTA.

---

## Intégration dans la home

Le composant HeroSection remplace le placeholder actuel de la
première section dans app/[locale]/page.tsx. Il reçoit les données
Sanity via les props. Les 6 autres sections restent en placeholder
pour l'instant.

La section Hero doit avoir data-section-theme="light" et un fond
bg-[var(--color-bg-canvas)] (blanc) pour que le Header adapte
automatiquement ses couleurs via l'IntersectionObserver.
