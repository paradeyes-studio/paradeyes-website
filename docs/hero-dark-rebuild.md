# Hero Dark — Rebuild complet (basé sur maquette Basilide)

> Ce fichier remplace la spec initiale du Hero (page 27 Design System).
> La direction pivote d'un Hero light à un Hero dark premium.
> Le contenu reste celui du Design System, l'exécution visuelle est neuve.

---

## Direction générale

Le Hero passe sur fond dark green (#023236) avec un gradient vert
organique volumétrique venant de la gauche. Le contraste permet aux
éléments blancs (carte IRIS, typographie titre) de pop comme sur un
hero de magazine luxe. L'approche premium vient des matières
empilées, du sens du détail, et de la respiration généreuse.

Références : maquette Basilide + animations Assistantly pour la
sophistication des transitions.

---

## Background section

```typescript
<section
  data-section-theme="dark"
  className="relative overflow-hidden min-h-screen"
  style={{
    backgroundColor: "#023236",
  }}
>
```

### Gradient vert organique principal

Position : venant de la gauche-centre, soft, volumétrique.

```tsx
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
```

Le fichier `public/noise.svg` doit contenir :
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.6"/>
</svg>
```

---

## Header — Pill flottant (nouvelle direction)

Le Header actuel est une barre pleine largeur. Le nouveau Header est
composé de 3 éléments flottants distincts au top de la page, avec un
padding généreux des bords.

### Structure

```tsx
<header className="fixed top-0 inset-x-0 z-40 pt-5 lg:pt-6">
  <div className="max-w-[calc(var(--container-site)_-_80px)] mx-auto px-5 lg:px-6 flex items-center justify-between gap-4">
    {/* Logo gauche */}
    <Link href="/" aria-label="Paradeyes">
      <Logo className="h-8 w-auto text-white" />
    </Link>

    {/* Nav pill centrale */}
    <nav className="hidden lg:block">
      <ul
        className="flex items-center gap-1 p-1.5 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: [
            "inset 0 1px 0 rgba(255, 255, 255, 1)",
            "0 4px 20px rgba(0, 0, 0, 0.08)",
            "0 1px 2px rgba(0, 0, 0, 0.04)",
          ].join(", "),
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeHref.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center px-4 py-2 rounded-full",
                  "font-body text-body-sm font-medium",
                  "transition-all duration-300 ease-out",
                  isActive
                    ? "bg-[#023236] text-white"
                    : "text-[#023236] hover:bg-[rgba(2,50,54,0.06)]"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    {/* CTA droite */}
    <Link
      href="/contact#appel"
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-body text-body-sm font-medium transition-all duration-300 ease-out"
      style={{
        border: "1px solid rgba(87, 238, 161, 0.5)",
        color: "#57eea1",
        background: "rgba(87, 238, 161, 0.05)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(87, 238, 161, 0.15)";
        e.currentTarget.style.borderColor = "rgba(87, 238, 161, 0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(87, 238, 161, 0.05)";
        e.currentTarget.style.borderColor = "rgba(87, 238, 161, 0.5)";
      }}
    >
      Un appel gratuit de 30 min
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</header>
```

### Règles Header

1. Supprimer l'ancien Header barre full-width avec glass complet.
2. Le Logo est TOUJOURS blanc sur dark, dark-green sur light (via
   IntersectionObserver).
3. La Nav pill est TOUJOURS blanche (avec backdrop-blur). Sa position
   flottante la fait fonctionner sur tous les fonds.
4. Le CTA est TOUJOURS outlined vert électrique (avec transparence),
   lisible sur tous fonds.
5. Au scroll, les 3 éléments restent flottants avec leur style.
   Aucun changement de style au scroll, juste translateY(-4px) au scroll
   > 80px pour tightening subtil.
6. Mobile : la Nav pill est remplacée par un burger dans un rond
   blanc (même style que la pill mais juste l'icône).
7. Remove LangSwitch et ThemeSwitch du Header principal. Les déplacer
   dans le Footer ou dans un menu secondaire. Garder le Header épuré
   comme la maquette.

---

## Structure du Hero

Hauteur : min-h-screen avec min-height: 800px.
Padding : pt-32 lg:pt-40 (pour laisser l'espace au Header), pb-16
lg:pb-24.
Centrage : flex items-center justify-center horizontalement et
verticalement.

### Container intérieur

```tsx
<div className="relative w-full max-w-[var(--container-site)] mx-auto px-5 lg:px-6">
  <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
    {/* Contenu Hero */}
  </div>
</div>
```

---

## Badge positionnement

```tsx
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
    AGENCE DE COMMUNICATION PREMIUM
  </p>
</motion.div>
```

CSS global à ajouter :
```css
@keyframes pulse-green-dot {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(87, 238, 161, 0.4);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
    box-shadow: 0 0 0 6px rgba(87, 238, 161, 0);
  }
}

.pulse-green-dot {
  animation: pulse-green-dot 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .pulse-green-dot { animation: none; }
}
```

---

## Titre H1

Plus CONTENU que la version actuelle. Taille ajustée pour respirer.

```tsx
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
  On identifie ce qui bloque votre croissance.
  On construit ce qui performe.
</motion.h1>
```

Notes :
- Taille adaptative clamp(40px, 5vw, 72px) - bien plus contenue que
  le display-xl 96px actuel qui est écrasant
- max-width 22ch pour forcer le retour à la ligne élégant
- Couleur blanc pur sur le dark vert
- Tracking resserré -0.035em pour le sens magazine

---

## Subtitle

```tsx
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
  Une agence qui comprend votre business avant de proposer.
  Communication stratégique, design, vidéo, site web. Construits
  sur-mesure, pensés pour convertir.
</motion.p>
```

---

## Carte IRIS — Nouveau bloc central

La carte IRIS blanche qui "pop" sur le fond dark.

```tsx
<motion.div
  variants={variant(0.65, 16)}
  initial="hidden"
  animate="visible"
  className="w-full max-w-2xl mb-10"
>
  <div
    className="relative rounded-3xl p-6 lg:p-8"
    style={{
      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
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
      Décrivez votre projet. IRIS vous oriente en 2 minutes.
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
        placeholder="Qu'aimeriez-vous améliorer pour rendre votre business plus performant ?"
        className="flex-1 bg-transparent outline-none font-body"
        style={{
          fontSize: "0.9375rem",
          color: "#023236",
        }}
      />
      <button
        type="button"
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #023236 0%, #013235 100%)",
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
      {SUGGESTIONS.map((suggestion, i) => (
        <button
          key={i}
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
```

Constantes à ajouter en haut du composant :

```typescript
import { Paperclip, ArrowRight } from "lucide-react";

const SUGGESTIONS = [
  "Branding",
  "Site web",
  "Contenus",
  "Déploiement",
  "Acquisition",
];
```

---

## Trust badges — Ligne simple sous la carte

```tsx
<motion.ul
  variants={variant(0.85)}
  initial="hidden"
  animate="visible"
  className="flex flex-col md:flex-row items-center gap-3 md:gap-6"
>
  {TRUST_BADGES.map((badge, i) => (
    <li key={i} className="inline-flex items-center gap-2">
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
        {badge}
      </span>
    </li>
  ))}
</motion.ul>
```

```typescript
const TRUST_BADGES = [
  "Une seule agence, un seul interlocuteur",
  "Approche sur-mesure, jamais de template",
  "ROI mesurable sur chaque projet",
];
```

---

## Section numbers — Décoration bottom-left

Ces numéros sont en position fixed (ou absolute au niveau du Hero),
en bas à gauche, comme sur la maquette.

```tsx
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
          color: i === 0 ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)",
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
```

---

## Bouton "Découvrir" — Scroll indicator bottom-right

```tsx
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
      Découvrir
    </span>
  </div>
  <motion.div
    animate={{ y: [0, 6, 0] }}
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
```

Ajouter dans les imports : `import { ChevronDown } from "lucide-react";`

---

## Variants animation Framer Motion

```typescript
const fadeSlideUp = (delay: number, y: number = 16) => ({
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

const fadeSlideUpReduced = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay },
  },
});

const variant = (delay: number, y?: number) =>
  prefersReducedMotion ? fadeSlideUpReduced(delay) : fadeSlideUp(delay, y);
```

---

## Cascade timing

- t=0ms : Badge
- t=150ms : Titre H1
- t=400ms : Subtitle
- t=650ms : Carte IRIS (scale 0.96→1 additionnel)
- t=850ms : Trust badges (stagger 80ms entre chaque)
- t=1200ms : Découvrir button

---

## Fichiers à modifier

1. **`src/components/sections/HeroSection.tsx`** — Rebuild complet
   selon cette spec
2. **`src/components/nav/Header.tsx`** — Rebuild en style pill
   flottant (3 éléments : logo, nav pill, CTA outlined)
3. **`src/components/nav/MobileMenu.tsx`** — Adapter pour matcher
   la nouvelle DA (si nécessaire)
4. **`src/app/globals.css`** — Ajouter keyframe pulse-green-dot
5. **`public/noise.svg`** — Créer le fichier si pas déjà créé
6. **Supprimer ou déplacer LangSwitch et ThemeSwitch** du Header
   principal. Les laisser comme composants mais ne plus les
   utiliser dans le Header. On les remettra plus tard dans le Footer
   ou dans un menu secondaire.

---

## Ne PAS oublier

- `data-section-theme="dark"` sur la section Hero (obligatoire pour
  le système de thème du Header, même si on simplifie le Header)
- Responsive : tester sur mobile, tablet, desktop. Les éléments
  absolus (section numbers, bouton Découvrir) doivent se comporter
  proprement.
- Accessibilité : h1 unique, aria-label sur boutons, focus-visible,
  prefers-reduced-motion respecté.
- Performance : les gradients multi-couches peuvent être coûteux,
  surveiller le LCP et le repaint.

---

## Validation finale

1. `npm run build` passe sans erreur
2. Le Header est visible avec les 3 éléments flottants bien
   positionnés
3. Le fond dark green avec gradient organique vert est volumétrique
   et respirant
4. La carte IRIS blanche pop nettement avec son ombre
5. La typographie respire (taille contenue, pas massive)
6. Les 5 pills suggestions sont cliquables (désactivées pour l'instant
   mais visuellement présentes)
7. Les section numbers "01. 02. 03." sont visibles bottom-left
8. Le bouton "Découvrir" est visible bottom-right et scroll smooth
   vers la section suivante
9. La cascade d'entrée respecte le timing 0/150/400/650/850/1200ms
10. Le grain filmique est visible en regardant de près

git commit -m "feat: hero dark rebuild - pill header, iris card, organic gradient"
