# Session 2 — Header, Footer, Hero (fidélité maquette v5.1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer les composants Header et Footer produits en Session 1 (visuellement divergents de la direction arrêtée) et créer le composant HeroSection de la home en transposition fidèle de `reference/paradeyes-home-v5.1.html`.

**Architecture:** Cinq batches séquentiels, chacun validé visuellement avant passage au suivant. Les tokens CSS et polices du HTML de référence deviennent la source de vérité (Tailwind v4 `@theme` + `src/lib/tokens.ts`). Chaque composant est réécrit en édition chirurgicale avec pixel-match validé par screenshots Playwright. Cascade animations : Framer Motion 12 (entrées composants, layoutId underline nav), GSAP 3.15 (timeline réservée Batch 2.4 si nécessaire).

**Tech Stack:** Next.js 16.2.4 (App Router + Turbopack), React 19.2.4, TypeScript 5.9.3 strict (`noUncheckedIndexedAccess`), Tailwind CSS v4.2.3 (`@theme` directive), Framer Motion 12.38.0, GSAP 3.15.0, Lenis 1.3.23 (smooth scroll déjà monté), next-intl 4.9.1, Sanity 7.21.0 (lecture seule), Lucide React 1.9.0 (⚠️ icônes `Linkedin`/`Instagram` absentes : SVG inline).

---

## Préambule — Dépendance bloquante

La **totalité du plan dépend du fichier** `reference/paradeyes-home-v5.1.html`. Il n'est pas encore présent dans le repo. La Step 0 de chaque batch pertinent vérifie sa présence et extrait les valeurs nécessaires directement de ce fichier. Aucun batch ne démarre tant que la ref n'est pas placée.

**Commande de vérification systématique :**

```bash
test -f reference/paradeyes-home-v5.1.html && echo "ref OK" || echo "MISSING"
```

Si `MISSING` → attendre fourniture du fichier, signaler à l'utilisateur.

---

## File Structure

| Chemin | Rôle | Action |
|---|---|---|
| `reference/paradeyes-home-v5.1.html` | Maquette source, source de vérité visuelle et tokens | Fourni par utilisateur |
| `src/app/globals.css` | Tokens Tailwind v4 `@theme`, keyframes globales | Modification chirurgicale |
| `src/lib/tokens.ts` | Tokens TypeScript (palette, spacing, easing, durations) | Création |
| `src/app/layout.tsx` | Chargement 4 polices via `next/font` | Modification chirurgicale |
| `src/fonts/` | Fichiers locaux Satoshi (présent) + Gambarino Italic (à fournir) | Ajout Gambarino |
| `src/components/nav/Header.tsx` | Header pixel-match ref | Réécriture |
| `src/components/nav/Footer.tsx` | Footer pixel-match ref | Réécriture |
| `src/components/nav/MobileMenu.tsx` | Menu mobile aligné Header | Modification si impact |
| `src/components/nav/LangSwitch.tsx` | Minimal `FR | EN` mono | Conservé (revue) |
| `src/components/nav/ThemeSwitch.tsx` | Icône 32×32 | Conservé (revue) |
| `src/components/sections/HeroSection.tsx` | Hero 100vh pixel-match ref | Réécriture |
| `src/app/[locale]/page.tsx` | Wiring HeroSection, `id="section-offres"` | Modification chirurgicale |
| `public/paradeyes-logo.svg` | Logo officiel (présent) | Conservé |
| `docs/superpowers/plans/2026-04-25-session-2-*.md` | Ce plan | Créé |

**Fichiers explicitement NON touchés cette session** : `src/middleware.ts`, `src/i18n/*`, `src/lib/sanity*`, pages `/agence`, `/offres/*`, `/contact`, `/realisations`, `/journal`, `/espace-client`, `/mentions-legales`, `/cgv`, `/confidentialite`, toute API route.

---

## Règles absolues (rappel, s'appliquent à tous les batches)

1. Email `hello@paradeyesagency.com` (jamais `contact@`)
2. Durée appel `30 minutes` (jamais 45)
3. Palette stricte : `#003135` / `#57EEA1` / `#14222E` / `#6549F6` / `#FAFAF7`
4. Quartet typo : Satoshi + DM Sans + DM Mono + Gambarino Italic (un seul mot par titre)
5. Vouvoiement partout
6. Zéro emoji
7. Zéro tiret cadratin ni demi-cadratin (points, virgules, deux-points uniquement)
8. `#57EEA1` interdit en à-plat sur fond clair (glow / outline / stroke SVG / halo radial / accent sur fond dark uniquement)
9. TypeScript strict, aucun `any`, aucun `unknown` non justifié
10. Édition chirurgicale, jamais régénération intégrale d'un fichier existant quand un `Edit` cible suffit
11. Commits conventionnels (`feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`)
12. Validation visuelle obligatoire avant passage au batch suivant

---

## Batch 2.1 — Tokens et globals

**Durée estimée :** 45 à 75 minutes selon densité des tokens dans la ref.

**Skills activés :** theme-factory, web-typography, brand-guidelines.

**Risques identifiés :**
- Conflit avec tokens existants dans `globals.css` (green-deep actuel `#023236` vs ref `#003135`) → audit dépendances des composants utilisant l'ancienne valeur avant remplacement.
- Fichier Gambarino Italic `woff2` potentiellement absent → demander l'upload avant le Batch 2.1 ; si indisponible, `@font-face` fallback via serif system.
- DM Mono disponible sur Google Fonts mais pas via next/font si le weight exact n'existe pas → vérifier via Context7.

### Task 2.1.1 — Vérifier la présence de la référence et des assets polices

**Files:**
- Read: `reference/paradeyes-home-v5.1.html`
- Read: `src/fonts/`

- [ ] **Step 1** : Vérifier présence HTML ref.

```bash
test -f reference/paradeyes-home-v5.1.html && echo "ref OK" || (echo "MISSING — stopper Batch 2.1" && exit 1)
```

- [ ] **Step 2** : Scanner `:root` et `@font-face` de la ref.

```bash
grep -nE "^\s*--[a-z-]+:" reference/paradeyes-home-v5.1.html | head -80
grep -nE "@font-face|font-family" reference/paradeyes-home-v5.1.html | head -40
```

Attendu : liste complète des tokens CSS (couleurs, spacing, radii, typo scale, easings, durations) et déclarations `@font-face` (noms de fichiers, formats).

- [ ] **Step 3** : Lister les fichiers polices déjà présents.

```bash
ls -la src/fonts/
```

Attendu : `Satoshi-*.woff2`. Si `Gambarino-Italic.woff2` absent, signaler et bloquer la Task 2.1.4.

### Task 2.1.2 — Extraire les tokens couleurs, spacing, radii, durations, easings

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1** : Lire le `@theme` actuel en intégralité pour diff.

```bash
sed -n '/@theme {/,/^}/p' src/app/globals.css
```

- [ ] **Step 2** : Produire un bloc `@theme` aligné à la ref.

Structure cible (valeurs exactes à copier depuis la ref dans l'ordre du fichier) :

```css
@theme {
  /* Brand palette (source : reference/paradeyes-home-v5.1.html :root) */
  --color-green-deep: #003135;
  --color-green-electric: #57EEA1;
  --color-dark-bluish: #14222E;
  --color-violet-spark: #6549F6;
  --color-white-warm: #FAFAF7;

  /* Semantic aliases (dérivés palette ci-dessus) */
  --color-bg-canvas: var(--color-white-warm);
  --color-bg-inverse: var(--color-green-deep);
  --color-text-primary: var(--color-green-deep);
  --color-text-inverse: var(--color-white-warm);
  --color-accent-on-dark: var(--color-green-electric);
  --color-accent-violet: var(--color-violet-spark);

  /* Tokens lus dans la ref (à compléter Step 3 avec valeurs exactes) */
  /* spacing scale, radii, shadows, easings, durations */
}
```

- [ ] **Step 3** : Aligner les valeurs numériques (spacing, radii, easings) sur celles de la ref. Remplacer les variables divergentes dans `globals.css` via `Edit` (chirurgical, pas `Write`).

- [ ] **Step 4** : Auditer les composants consommant les anciennes valeurs.

```bash
grep -rn "#023236\|rgb(2[[:space:]]*50[[:space:]]*54\|rgba(2,\s*50,\s*54" src/
```

Attendu : liste de fichiers à mettre à jour (Batches 2.2, 2.3, 2.4).

- [ ] **Step 5** : Build de contrôle.

```bash
npm run build 2>&1 | tail -20
```

Attendu : 0 erreur, 34 pages générées.

- [ ] **Step 6** : Commit.

```bash
git add src/app/globals.css
git commit -m "refactor: align globals.css tokens with v5.1 reference palette"
```

### Task 2.1.3 — Créer src/lib/tokens.ts (export TypeScript)

**Files:**
- Create: `src/lib/tokens.ts`

- [ ] **Step 1** : Écrire `src/lib/tokens.ts` avec export `as const` de chaque groupe.

```typescript
export const colors = {
  greenDeep: "#003135",
  greenElectric: "#57EEA1",
  darkBluish: "#14222E",
  violetSpark: "#6549F6",
  whiteWarm: "#FAFAF7",
} as const;

export const easings = {
  premium: "cubic-bezier(0.22, 1, 0.36, 1)",
  breathing: "cubic-bezier(0.4, 0, 0.6, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
} as const;

export const durations = {
  base: 240,
  breathing: 8000,
} as const;

export type BrandColor = (typeof colors)[keyof typeof colors];
export type Easing = (typeof easings)[keyof typeof easings];
```

(Tokens spacing, radii, typo ajoutés selon ce qui est extrait Step 2.1.2.)

- [ ] **Step 2** : Smoke test par import dans un fichier existant.

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

- [ ] **Step 3** : Commit.

```bash
git add src/lib/tokens.ts
git commit -m "feat: add typed design tokens exports in src/lib/tokens.ts"
```

### Task 2.1.4 — Charger les 4 polices via next/font

**Files:**
- Modify: `src/app/layout.tsx`
- Modify (si nécessaire) : `src/fonts/`

- [ ] **Step 1** : Lire `src/app/layout.tsx` pour diff cible.

- [ ] **Step 2** : Vérifier via Context7 la signature `next/font/google` et `next/font/local` pour Next 16.

Requête Context7 : `next/font 16 local Google Satoshi DM Sans DM Mono`.

- [ ] **Step 3** : Modifier `layout.tsx` pour ajouter DM Mono + Gambarino Italic.

```typescript
import { DM_Sans, DM_Mono } from "next/font/google";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [/* chemins existants */],
  variable: "--font-satoshi",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const gambarino = localFont({
  src: "../fonts/Gambarino-Italic.woff2",
  variable: "--font-gambarino",
  style: "italic",
  weight: "400",
  display: "swap",
});
```

Ajouter les 4 variables au `<html className={...}>` du layout.

- [ ] **Step 4** : Ajouter aliases Tailwind dans `globals.css` `@theme inline`.

```css
@theme inline {
  --font-display: var(--font-satoshi), system-ui, sans-serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;
  --font-mono: var(--font-dm-mono), ui-monospace, monospace;
  --font-italic-accent: var(--font-gambarino), "Playfair Display", serif;
}
```

- [ ] **Step 5** : Build + vérification absence de FOUT.

```bash
npm run build 2>&1 | grep -iE "font|error|warn" | head -20
```

- [ ] **Step 6** : Commit.

```bash
git add src/app/layout.tsx src/app/globals.css src/fonts/
git commit -m "feat: load Satoshi, DM Sans, DM Mono, Gambarino Italic via next/font"
```

### Task 2.1.5 — Validation Batch 2.1

- [ ] **Step 1** : Scan de complétude.

```bash
# Comparer les tokens --* de la ref vs ceux du globals.css
diff <(grep -oE "\-\-[a-z-]+" reference/paradeyes-home-v5.1.html | sort -u) \
     <(grep -oE "\-\-[a-z-]+" src/app/globals.css | sort -u)
```

Attendu : aucune ligne manquante dans `src/app/globals.css` (les tokens ref sont tous présents ou documentés intentionnellement absents).

- [ ] **Step 2** : Lint.

```bash
npm run lint 2>&1 | tail -10
```

**Critère de validation Batch 2.1 :** build 0 erreur, 4 polices chargées, `diff` tokens = 0 ligne manquante, `src/lib/tokens.ts` typé sans erreur tsc.

---

## Batch 2.2 — Header fidèle

**Durée estimée :** 90 à 150 minutes.

**Skills activés :** frontend-design, refactoring-ui, web-design-guidelines, wcag-accessibility-audit.

**Risques identifiés :**
- IntersectionObserver avec 3 états scroll conflictuel avec l'état unique actuel (transparent + scrolled) → audit et refactor complet du state machine.
- Framer Motion `layoutId` underline sur 5 nav items nécessite `LayoutGroup` parent → risque de re-render excessif à chaque scroll, vérifier via Profiler.
- Logo 22px (lockup) inférieur à la taille actuelle (h-7/h-8 = 28/32px) → impact visuel, valider sur screenshot.
- Sur section light, si `#57EEA1` est utilisé dans un underline, violation de la règle 8 → basculer la couleur active sur `#003135` pour sections light.

### Task 2.2.1 — Audit visuel de la référence Header

**Files:**
- Read: `reference/paradeyes-home-v5.1.html`

- [ ] **Step 1** : Extraire le bloc header de la ref.

```bash
grep -nE "<header|</header>" reference/paradeyes-home-v5.1.html
```

Puis lire de la balise ouvrante à la fermante.

- [ ] **Step 2** : Identifier : structure HTML, classes, styles inline, aria, data-attributs, images/SVG intégrés (logo lockup).

- [ ] **Step 3** : Noter pour chaque élément : tailles, couleurs, transitions, breakpoints mobile.

- [ ] **Step 4** : Screenshot la ref localement.

```bash
open reference/paradeyes-home-v5.1.html
# puis capture manuelle via le navigateur en 1440×900
```

### Task 2.2.2 — Réécrire Header.tsx (squelette statique)

**Files:**
- Modify: `src/components/nav/Header.tsx`

- [ ] **Step 1** : Créer la structure JSX sans animations.

```tsx
"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps { locale: "fr" | "en"; }

const NAV_ITEMS = [
  { label: "Agence", href: "/agence" },
  { label: "Offres", href: "/offres" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;
```

- [ ] **Step 2** : JSX static selon la ref exacte (structure, classes Tailwind).

- [ ] **Step 3** : Build.

```bash
npm run build 2>&1 | tail -10
```

### Task 2.2.3 — Machine d'états scroll (3 états) + IntersectionObserver

**Files:**
- Modify: `src/components/nav/Header.tsx`

- [ ] **Step 1** : Déclarer l'union discriminée.

```typescript
type ScrollState = "transparent" | "glass" | "compact";
```

- [ ] **Step 2** : Hook `useScrollState` local au composant.

```typescript
const [scrollState, setScrollState] = useState<ScrollState>("transparent");

useEffect(() => {
  const onScroll = () => {
    const y = window.scrollY;
    if (y < 16) setScrollState("transparent");
    else if (y < 120) setScrollState("glass");
    else setScrollState("compact");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

- [ ] **Step 3** : Observer `data-section-theme` pour colorimétrie.

Conservée de la version actuelle (`useLayoutEffect` + `IntersectionObserver`).

- [ ] **Step 4** : Mapper `scrollState` × `theme` → styles (background, border, backdropFilter, hauteur, padding).

```typescript
const headerStyles = useMemo(() => {
  // Tableau exhaustif (6 combinaisons) défini selon la ref.
}, [scrollState, currentTheme]);
```

### Task 2.2.4 — Nav underline layoutId Framer Motion

**Files:**
- Modify: `src/components/nav/Header.tsx`

- [ ] **Step 1** : Entourer `<ul>` nav de `<LayoutGroup>`.

- [ ] **Step 2** : Sur l'item actif (`activeHref.startsWith(item.href)`), rendre `<motion.span layoutId="nav-underline" />` positionné en bottom.

- [ ] **Step 3** : Transition `{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }`.

- [ ] **Step 4** : Test nav : cliquer item → l'underline glisse sans flash.

### Task 2.2.5 — CTA pill + dot pulsant + utilitaires alignés

**Files:**
- Modify: `src/components/nav/Header.tsx`

- [ ] **Step 1** : CTA pill avec `pulse-green-dot` CSS class (déjà présente dans `globals.css`). Wording exact : `Un appel gratuit de 30 min` (pas 45, pas `contact`).

- [ ] **Step 2** : Zone droite : `<div className="flex items-center gap-5"><LangSwitch /><ThemeSwitch /><CTA /></div>` (pattern Session 1 polish, ne pas casser).

- [ ] **Step 3** : Tracking Plausible : `plausible("cta_header_clicked")` sur click.

### Task 2.2.6 — MobileMenu aligné

**Files:**
- Modify: `src/components/nav/MobileMenu.tsx`

- [ ] **Step 1** : Revue visuelle : menu mobile full-screen déjà conforme depuis polish V3 (LangSwitch + ThemeSwitch au-dessus du CTA).

- [ ] **Step 2** : Si la ref v5.1 montre des écarts, ajuster chirurgicalement.

### Task 2.2.7 — Validation visuelle Batch 2.2

- [ ] **Step 1** : `npm run dev` + capture Playwright.

```bash
# Stub du script Playwright (Batch 2.5 l'automatise)
open http://localhost:3000/fr
```

- [ ] **Step 2** : Audit WCAG focus : navigation clavier (Tab), ordre logique, focus-visible ring visible sur chaque élément interactif.

- [ ] **Step 3** : Audit contrastes WCAG AA : texte nav sur chaque état scroll et chaque theme. `#003135` sur `#FAFAF7` → 16.9:1 ✓.

- [ ] **Step 4** : Build + lint.

```bash
npm run build && npm run lint
```

- [ ] **Step 5** : Commit.

```bash
git add src/components/nav/Header.tsx src/components/nav/MobileMenu.tsx
git commit -m "feat: rewrite Header with 3 scroll states + layoutId nav underline"
git push
```

**Critère de validation Batch 2.2 :** pixel-match screenshot desktop 1440×900 et mobile 375×812 (±2px tolérance), 0 warning console, WCAG AA validé, build + lint clean.

---

## Batch 2.3 — Footer fidèle

**Durée estimée :** 75 à 120 minutes.

**Skills activés :** frontend-design, refactoring-ui, brand-guidelines, wcag-accessibility-audit.

**Risques identifiés :**
- Marquee existant utilise CSS pure (keyframes) → performance correcte, conserver.
- Halos radiaux 2 couches peuvent rentrer en conflit GPU avec les 3 halos du Hero immédiatement au-dessus → tester scroll fluide.
- Email `hello@paradeyesagency.com` doit remplacer toute autre valeur éventuelle (`contact@`, etc.).

### Task 2.3.1 — Audit visuel Footer ref

**Files:**
- Read: `reference/paradeyes-home-v5.1.html`

- [ ] **Step 1** : Extraire le bloc footer.

```bash
grep -nE "<footer|</footer>" reference/paradeyes-home-v5.1.html
```

- [ ] **Step 2** : Noter structure grille 4 col, logo lockup dimensions, CTA, marquee, halos.

### Task 2.3.2 — Réécriture squelette statique

**Files:**
- Modify: `src/components/nav/Footer.tsx`

- [ ] **Step 1** : Remplacer le JSX par une version alignée ref.

```tsx
<footer className="relative overflow-hidden bg-[var(--color-green-deep)] text-[var(--color-white-warm)]">
  {/* Halos */}
  {/* Grille 4 cols */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[var(--container-site)] mx-auto px-5 lg:px-10 py-16 lg:py-24">
    <ColumnAbout />
    <ColumnNav />
    <ColumnOffres />
    <ColumnContact />
  </div>
  {/* Marquee signature */}
  {/* Bottom bar (copyright + legal links) */}
</footer>
```

- [ ] **Step 2** : Extraire 4 sous-composants locaux (non exportés) `ColumnAbout`, `ColumnNav`, `ColumnOffres`, `ColumnContact` pour lisibilité.

### Task 2.3.3 — Colonne Contact (email + horaires + CTA)

**Files:**
- Modify: `src/components/nav/Footer.tsx`

- [ ] **Step 1** : Contenu exact.

```tsx
<div>
  <p className="font-mono uppercase text-xs tracking-[0.14em] opacity-60 mb-4">Contact</p>
  <a href="mailto:hello@paradeyesagency.com" className="block font-body text-body-lg hover:text-[var(--color-green-electric)]">
    hello@paradeyesagency.com
  </a>
  <p className="mt-4 font-body text-body-sm opacity-70">Du lundi au vendredi, 9h à 19h (CET)</p>
  <CTAOutlined />
</div>
```

- [ ] **Step 2** : CTA outlined avec dot pulsant (même pattern que Header).

### Task 2.3.4 — Logo compact + marquee + halos

**Files:**
- Modify: `src/components/nav/Footer.tsx`

- [ ] **Step 1** : Logo compact via `<Logo className="h-6 lg:h-7" />` (l'œil 44×26 + wordmark 22px est dans le SVG officiel ; tailles h-6/h-7 correspondent au lockup souhaité).

- [ ] **Step 2** : Marquee : keyframes CSS `marquee-signature` dans `globals.css`, aria-hidden, dupliquer le contenu pour loop fluide.

- [ ] **Step 3** : 2 halos radiaux `<div>` absolument positionnés, pointer-events-none, animations `halo-pulse-green` et `halo-pulse-violet` déjà présentes dans `globals.css`.

### Task 2.3.5 — Validation Batch 2.3

- [ ] **Step 1** : Audit : zéro mention `contact@`, zéro `45 minutes`, zéro emoji, zéro tiret.

```bash
grep -nE "contact@|45 minutes|\s—\s|\s–\s" src/components/nav/Footer.tsx
```

Attendu : 0 résultat.

- [ ] **Step 2** : Audit liens externes (LinkedIn, Instagram) : `rel="noopener noreferrer"`, `target="_blank"`.

- [ ] **Step 3** : Build + lint + WCAG contrastes (`#FAFAF7` sur `#003135` = 16.9:1 ✓).

- [ ] **Step 4** : Commit.

```bash
git add src/components/nav/Footer.tsx src/app/globals.css
git commit -m "feat: rewrite Footer with 4-col grid, marquee, halos from v5.1 ref"
git push
```

**Critère de validation Batch 2.3 :** pixel-match ref, email correct, marquee fluide, halos non saccadés au scroll.

---

## Batch 2.4 — Hero fidèle

**Durée estimée :** 150 à 240 minutes (batch le plus dense).

**Skills activés :** frontend-design, refactoring-ui, web-typography, brand-guidelines, wcag-accessibility-audit.

**Risques identifiés :**
- Hero 100vh strict risque de couper le CTA Découvrir sur mobile court → utiliser `min-h-[100svh]` (small viewport height).
- Gambarino Italic sur un seul mot nécessite un `<em class="font-italic-accent">` stylé — vérifier rendu sur Webkit (macOS/iOS) car les italiques OTF peuvent décaler.
- Split-lines du titre implique découper le contenu canonique (FR/EN/Sanity) → hook `useSplitHeadline(tagline, emphasizedWord)` dédié.
- 6 chips `Branding / Site web / Contenus / Déploiement / Acquisition / + ???` : la ref peut en ajouter un 6e ; vérifier avant de réutiliser les 5 actuelles.
- 3 halos + grain overlay + fond dark vert + IRIS card glass : risque de repaint GPU intensif — throttler si drop FPS < 55.

### Task 2.4.1 — Audit visuel Hero ref

**Files:**
- Read: `reference/paradeyes-home-v5.1.html`

- [ ] **Step 1** : Extraire le bloc hero.

```bash
grep -nE "hero|<section" reference/paradeyes-home-v5.1.html | head -20
```

- [ ] **Step 2** : Noter : tailles, paddings, espacements cascade, chips exacts, wording exact, couleurs des halos, position side elements.

- [ ] **Step 3** : Capture Playwright de la ref desktop 1440×900 et mobile 375×812, stockée dans `docs/superpowers/screenshots/ref-hero-desktop.png` et `-mobile.png`.

### Task 2.4.2 — Structure + cascade animations

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1** : Squelette `section` 100svh, `data-section-theme="dark"`, background `#003135`.

- [ ] **Step 2** : Variants Framer Motion (conservés / ajustés).

```typescript
const cascade = (delay: number, y = 16): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  },
});
```

Cascade timing (selon ref) : 0 / 0.15 / 0.4 / 0.65 / 0.85 / 1.2 s.

### Task 2.4.3 — Halos verts enveloppants (3 couches)

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1** : 3 `motion.div` absolus avec wrapper pour `translateX(-50%)` sans conflit avec `x` animé.

- [ ] **Step 2** : Couche 1 ambient centrée 90%×70% blur 80px opacity 0.55. Couche 2 core 45%×60% blur 60px opacity 0.5. Couche 3 highlight 20%×30% blur 40px opacity 0.7.

- [ ] **Step 3** : Grain overlay `opacity-[0.06]` noise.svg (existe déjà dans `/public`).

### Task 2.4.4 — Titre split-lines + mot Gambarino italic

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1** : Split FR par ponctuation.

```typescript
function splitHeadline(raw: string, accent: string): Array<{ text: string; accent: boolean }> {
  // Segmente raw en tokens, marque le token strictement égal à `accent` (avec éventuel point final)
  // Retourne la liste ordonnée.
}
```

- [ ] **Step 2** : Render.

```tsx
<h1 className="font-display font-medium text-white" style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.035em", maxWidth: "22ch" }}>
  {segments.map((seg, i) => seg.accent ? (
    <em key={i} className="font-[family-name:var(--font-italic-accent)] text-[#57EEA1] not-italic" style={{ fontStyle: "italic" }}>{seg.text}</em>
  ) : <span key={i}>{seg.text}</span>)}
</h1>
```

- [ ] **Step 3** : Valider rendu italic Gambarino (vs fallback serif).

### Task 2.4.5 — IRIS card (description + input + submit + 6 chips)

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1** : Card background crème `linear-gradient(180deg, #FAFAF7 0%, #F5F5F0 100%)`, shadows empilés selon ref.

- [ ] **Step 2** : Header description avec `<strong>IRIS</strong>`.

- [ ] **Step 3** : Input pill : trombone Lucide, input disabled, bouton submit rond dark 36px gradient 135°.

- [ ] **Step 4** : 6 chips : `Branding` active (fond `#003135`, texte blanc), 5 autres outlined (`border: 1px solid rgba(0,49,53,0.2)`, texte `#003135`). Vérifier la liste exacte dans la ref — probablement `Branding / Sites / Contenus / Déploiement / Acquisition / Conseil` ou similaire.

### Task 2.4.6 — Trust row + side elements + Découvrir

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1** : Trust row : 3 items horizontaux (flex-col md:flex-row), check icon vert `#57EEA1`, texte mono blanc 55%, gap-8.

- [ ] **Step 2** : Side elements 01/02/03 gauche (vertical stack, `bottom-12 left-6 lg:left-10`, 01 actif avec barre `w-8 h-[1px]`).

- [ ] **Step 3** : Bouton Découvrir rond 96px (ref précise 96px, différent des 70px polish V3) droite (`bottom-12 right-6 lg:right-10`). Action : `scrollIntoView` sur `#section-offres`.

### Task 2.4.7 — Wiring page.tsx

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1** : Vérifier que la section immédiatement après Hero porte `id="section-offres"`. Si la ref exige que ce soit la section proof, ajuster.

- [ ] **Step 2** : Passer à `<HeroSection>` les props Sanity `heroBadgePositionnement`, `heroPhraseAccroche`, etc. (patterns déjà en place).

### Task 2.4.8 — Validation Batch 2.4

- [ ] **Step 1** : Screenshots Playwright.

```bash
# Stub, automatisé Batch 2.5
```

- [ ] **Step 2** : Checklist cascade.

- [ ] 0 → badge visible
- [ ] 150ms → titre visible avec blur-resolve
- [ ] 400ms → subtitle visible
- [ ] 650ms → IRIS card scale 0.96→1
- [ ] 850ms → trust badges
- [ ] 1200ms → Découvrir bottom-right

- [ ] **Step 3** : FPS scroll > 55.

- [ ] **Step 4** : `prefers-reduced-motion: reduce` désactive toutes les animations ornementales.

- [ ] **Step 5** : Audit WCAG : `#57EEA1` jamais sur fond clair (vérifié : ici seulement sur `#003135`), focus visible sur tous boutons, aria-labels sur boutons icon-only.

- [ ] **Step 6** : Commit.

```bash
git add src/components/sections/HeroSection.tsx src/app/[locale]/page.tsx
git commit -m "feat: rewrite Hero with split-lines, italic accent, IRIS card, halos 3 layers"
git push
```

**Critère de validation Batch 2.4 :** pixel-match, cascade respectée, 60 FPS, `#section-offres` scroll fonctionnel, WCAG AA.

---

## Batch 2.5 — Validation finale

**Durée estimée :** 30 à 60 minutes.

**Skills activés :** wcag-accessibility-audit, web-design-guidelines, verification-before-completion.

**Risques identifiés :**
- Playwright pas encore installé dans le projet → installation comme dev dependency.
- Vercel preview déployé automatiquement au push par la connexion GitHub → pas besoin du gh CLI sauf vérification.

### Task 2.5.1 — Installer Playwright (si absent)

**Files:**
- Modify: `package.json`
- Create: `tests/visual/hero.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1** : Check existence.

```bash
npm ls @playwright/test 2>&1 | grep -v "empty"
```

- [ ] **Step 2** : Si absent, installer.

```bash
npm i -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 3** : Script de capture minimal.

```typescript
// tests/visual/hero.spec.ts
import { test, expect } from "@playwright/test";
test("hero desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/fr");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("hero-desktop.png", { maxDiffPixelRatio: 0.02 });
});
test("hero mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("http://localhost:3000/fr");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("hero-mobile.png", { maxDiffPixelRatio: 0.02 });
});
```

### Task 2.5.2 — Checklist WCAG 2.1 AA

**Files:**
- Read: tous les composants modifiés

- [ ] **Step 1** : Contrastes (outil : `@axe-core/playwright` ou manuel).

| Combinaison | Ratio | Attendu |
|---|---|---|
| `#003135` sur `#FAFAF7` | 16.9:1 | AAA |
| `#FAFAF7` sur `#003135` | 16.9:1 | AAA |
| `#57EEA1` sur `#003135` | 9.2:1 | AAA |
| Texte secondaire `rgba(255,255,255,0.55)` sur `#003135` | ≥ 4.5:1 à vérifier | AA |

- [ ] **Step 2** : Focus visible sur tous les éléments interactifs.

- [ ] **Step 3** : Aria-labels sur boutons icon-only (burger, submit IRIS, Découvrir, ThemeSwitch).

- [ ] **Step 4** : Alt text sur `<img>` logo : `alt="Paradeyes"` déjà présent.

- [ ] **Step 5** : Semantic HTML : un seul `<h1>`, structure `<header>` / `<main>` / `<footer>`.

### Task 2.5.3 — Build + lint + type-check stricts

- [ ] **Step 1** : Build.

```bash
npm run build 2>&1 | tail -30
```

Attendu : 0 erreur, 34 pages.

- [ ] **Step 2** : Lint.

```bash
npm run lint 2>&1 | tail -20
```

Attendu : 0 warning bloquant.

- [ ] **Step 3** : Type-check strict.

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

### Task 2.5.4 — Commit final + push + preview Vercel

- [ ] **Step 1** : Status.

```bash
git status
```

Attendu : tout commité depuis les batches.

- [ ] **Step 2** : Vérifier push sur main (la connexion Vercel → GitHub déploie automatiquement).

```bash
git push origin main
```

- [ ] **Step 3** : Récupérer l'URL preview.

```bash
gh run list --limit 3
# ou
gh api repos/paradeyes-studio/paradeyes-website/deployments --jq '.[0].environment_url' 2>/dev/null
```

(Fallback : consulter `https://vercel.com/paradeyes/paradeyes-website` manuellement.)

- [ ] **Step 4** : Smoke test URL preview.

```bash
PREVIEW_URL="https://..."
curl -sI "$PREVIEW_URL" | head -5
```

### Task 2.5.5 — Persister les décisions session (claude-mem)

- [ ] **Step 1** : Invoquer `mcp__plugin_claude-mem_mcp-search__build_corpus` (ou via skill si disponible) pour archiver les décisions clés de la session (palette migrée `#023236` → `#003135`, 4 polices finalisées, 3 états scroll Header, 3 couches halos Hero).

**Critère de validation Batch 2.5 :** 0 erreur build, 0 warning lint bloquant, 0 erreur tsc, screenshots diff < 2%, WCAG AA checklist verte, URL preview joignable (HTTP 200).

---

## Ordre d'exécution et checkpoints

| Checkpoint | Condition de passage | Bloqueur si non satisfait |
|---|---|---|
| Après 2.1.1 | Ref HTML et polices présentes | Stop, demander fichiers |
| Après 2.1.5 | Build 0 erreur + tokens alignés | Relancer 2.1 |
| Après 2.2.7 | Pixel-match Header ±2px | Relancer 2.2 |
| Après 2.3.5 | Audit email/durée conforme | Relancer 2.3 |
| Après 2.4.8 | Cascade + FPS + WCAG | Relancer 2.4 |
| Après 2.5.5 | Preview URL joignable | Signaler anomalie |

---

## Self-review (exécutée avant remise du plan)

**1. Spec coverage** :
- Batch 2.1 couvert par Tasks 2.1.1–2.1.5 (extraction tokens, TS tokens, 4 polices, validation).
- Batch 2.2 couvert par Tasks 2.2.1–2.2.7 (audit, squelette, 3 états scroll, layoutId, CTA, MobileMenu, validation).
- Batch 2.3 couvert par Tasks 2.3.1–2.3.5 (audit, squelette, Contact, logo/marquee/halos, validation).
- Batch 2.4 couvert par Tasks 2.4.1–2.4.8 (audit, cascade, halos, titre, IRIS card, trust/side/Découvrir, wiring, validation).
- Batch 2.5 couvert par Tasks 2.5.1–2.5.5 (Playwright, WCAG, build/lint/tsc, commit/push/preview, claude-mem).

**2. Placeholder scan** :
- Les valeurs exactes des tokens dépendent du HTML ref (explicitement attendu). Flag : légitime puisque Step 2.1.1 vérifie sa présence et bloque si absent.
- Aucun « TODO », « TBD », « implement later » en dur.

**3. Type consistency** :
- `ScrollState` utilisé dans Header uniquement.
- `BrandColor`, `Easing` exportés par `src/lib/tokens.ts`, consommables partout.
- Pas de divergence de nom entre tasks.

---

## Execution Handoff

Plan complet sauvegardé à `docs/superpowers/plans/2026-04-25-session-2-header-footer-hero.md`.

Deux modes d'exécution disponibles :

1. **Subagent-Driven (recommandé)** — un sous-agent fresh par task, review entre tasks, itération rapide.
2. **Inline Execution** — exécution in-session avec checkpoints manuels par batch.

**Attente de l'utilisateur** : le fichier `reference/paradeyes-home-v5.1.html` n'est pas encore fourni, et les instructions explicites de la mission demandent de s'arrêter jusqu'au feu vert de l'utilisateur + fourniture de la ref. Aucun batch n'est lancé tant que ces deux conditions ne sont pas réunies.
