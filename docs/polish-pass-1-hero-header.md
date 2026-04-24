# Polish Pass 1 — Hero + Header

> Fichier de polish ciblé. Chaque problème a une cause diagnostiquée et
> une correction chiffrée. Claude Code doit appliquer chaque point
> EXACTEMENT avec les valeurs données. Pas d'interprétation libre.

---

## BUG CRITIQUE 1 — Header invisible sur la section Hero (light)

**Cause racine.** Dans Header.tsx, le state initial au mount est
`currentTheme = "dark"`. Sur la section Hero qui est `light`, avant
que l'IntersectionObserver ne fire sa première callback (après paint),
le Logo et les liens sont rendus avec `text-[var(--color-text-inverse)]`
(blanc) sur fond blanc. Donc invisibles.

**Fix.** Détecter le thème initial AVANT le premier paint avec
useLayoutEffect.

Remplacer dans Header.tsx la déclaration du state et le premier
useEffect :

```typescript
// Remplacer
const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

// Par
const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

// Et ajouter un useLayoutEffect AVANT le useEffect de l'IntersectionObserver
useLayoutEffect(() => {
  // Lire le thème de la première section visible en top du viewport
  const sections = document.querySelectorAll("[data-section-theme]");
  for (const section of Array.from(sections)) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom > 80) {
      const theme = section.getAttribute("data-section-theme") as "light" | "dark";
      setCurrentTheme(theme);
      return;
    }
  }
  // Fallback : si aucune section n'est en top, prendre la première
  if (sections.length > 0) {
    const theme = sections[0].getAttribute("data-section-theme") as "light" | "dark";
    setCurrentTheme(theme);
  }
}, []);
```

Importer useLayoutEffect en plus de useEffect.

---

## PROBLÈME 1 — Halo vert plat et petit

**Cause.** Un seul radial-gradient de 600px sur un viewport de 2560px,
opacity 0.4 fade à 70%, rendu minuscule et dilué.

**Fix.** Remplacer le halo par 3 couches empilées avec animation
breathing.

Dans HeroSection.tsx, remplacer le div halo actuel par :

```tsx
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
```

---

## PROBLÈME 2 — Input IRIS plat et sans matière

**Cause.** Single-layer bg `rgb(2 50 54 / 0.04)` sur fond blanc, quasi
invisible. Pas de glass réel, pas d'ombres empilées, pas de highlight
top, pas de gradient de fond.

**Fix.** Remplacer le bloc input IRIS par une vraie matière glass
multi-couches avec Tailwind v4 custom styles.

Remplacer dans HeroSection.tsx le div qui contient l'input par :

```tsx
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
```

---

## PROBLÈME 3 — Typographie cramée, manque de respiration

**Cause.** letter-spacing trop serré, margins entre blocs trop
courtes, pas de sens magazine.

**Fix.** Dans HeroSection.tsx :

1. Sur le `<motion.h1>`, changer :
   - `tracking-[var(--tracking-tight)]` → `tracking-[-0.035em]`
   - `mb-[var(--spacing-5)]` → `mb-[var(--spacing-6)]` (24 → 32px)
   - Ajouter `font-semibold` (500 → 600) si la font Satoshi a du Bold dispo

2. Sur le `<motion.div>` badge, changer :
   - `mb-[var(--spacing-6)]` → `mb-[var(--spacing-7)]` (32 → 48px)

3. Sur le `<motion.p>` subtitle, changer :
   - `mb-[var(--spacing-7)]` → `mb-[var(--spacing-8)]` (48 → 64px)

---

## PROBLÈME 4 — Pas de grain/texture, look "CSS propre"

**Cause.** Aucune couche de texture, tout est lisse CSS, manque le
grain filmique Awwwards.

**Fix.** Ajouter un overlay de noise SVG sur la section Hero.

1. Créer le fichier `public/noise.svg` avec ce contenu :

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.6"/>
</svg>
```

2. Dans HeroSection.tsx, ajouter juste avant la fermeture de
`</section>` (après le contenu principal) :

```tsx
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
```

---

## PROBLÈME 5 — Cascade animation trop timide

**Cause.** Durations courtes (600ms), pas de blur-resolve, stagger
faible.

**Fix.** Remplacer les variants fadeSlideUp par des variants enrichis
avec blur-resolve.

Dans HeroSection.tsx, remplacer les variants :

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
```

Ajuster les delays pour un stagger plus généreux :
- Badge : 0ms (inchangé)
- H1 : 150ms (était 100)
- Subtitle : 400ms (était 350)
- IRIS : 600ms (était 500)
- Trust badges : 850ms base + 80ms stagger (était 700 + 60)
- CTA secondaire : 1050ms (était 880)

---

## PROBLÈME 6 — Section transition abrupte

**Cause.** Passage direct du Hero (blanc) à la section suivante
(vert foncé) sans respiration.

**Fix.** Ajouter une zone de transition douce en bas du Hero.

Dans HeroSection.tsx, juste après le div du grain overlay, ajouter :

```tsx
{/* Transition douce vers la section suivante */}
<div
  className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
  style={{
    background:
      "linear-gradient(180deg, transparent 0%, rgba(2, 50, 54, 0.02) 50%, rgba(2, 50, 54, 0.08) 100%)",
  }}
  aria-hidden="true"
/>
```

---

## PROBLÈME 7 — Green dot pulse, vérification

**Cause potentielle.** L'animation Framer Motion sur le point peut ne
pas fonctionner si le composant est entouré d'un motion.div parent
qui override.

**Fix.** Remplacer la motion.span du point par une span CSS pure avec
keyframe custom.

Dans globals.css, ajouter :

```css
@keyframes pulse-green-dot {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

.pulse-green-dot {
  animation: pulse-green-dot 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .pulse-green-dot {
    animation: none;
  }
}
```

Dans HeroSection.tsx, remplacer la motion.span du point par :

```tsx
<span
  className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-special)] pulse-green-dot"
  aria-hidden="true"
/>
```

Et supprimer le motion si plus utilisé sur ce span.

---

## PROBLÈME 8 — CTA secondaire wrap en 2 lignes

**Cause.** Wording trop long "Prendre rendez-vous directement pour un
appel gratuit de 30 minutes" casse le layout.

**Fix.** Changer le wording dans messages/fr.json :

```json
"ctaSecondary": "Appel direct de 30 minutes"
```

Mais garder le wording complet en Sanity (homePage) comme source
canonique, le CTA secondaire du Hero utilise la version courte.

Dans HeroSection.tsx, remplacer le span interne du CTA par :
```tsx
<span>Appel direct de 30 minutes</span>
```

---

## PROBLÈME 9 — Espacement vertical excessif

**Cause.** `min-h-[100vh]` combiné avec `pt-[var(--spacing-11)]` (160px)
fait que le Hero prend trop de hauteur et le contenu n'est pas bien
centré.

**Fix.** Dans HeroSection.tsx :
- Remplacer `pt-[var(--spacing-11)]` par `pt-[var(--spacing-10)]`
  (160 → 128px)
- Remplacer `pb-[var(--spacing-9)]` par `pb-[var(--spacing-8)]`
  (96 → 64px)
- Garder `min-h-[100vh]` mais ajouter `max-h-[1080px]` pour éviter le
  Hero géant sur très grands écrans

---

## RÉSUMÉ DES FICHIERS À MODIFIER

1. `src/components/nav/Header.tsx` — Fix useLayoutEffect thème initial
2. `src/components/sections/HeroSection.tsx` — Halo multi-couches, IRIS
   glass, typo spacing, grain overlay, transition, cascade enrichie,
   green dot CSS, CTA court, espacement vertical
3. `src/app/globals.css` — Keyframe pulse-green-dot
4. `public/noise.svg` — Nouveau fichier noise pour le grain
5. `messages/fr.json` — Wording CTA secondaire court
6. `messages/en.json` — Wording CTA secondaire court en anglais

---

## VALIDATION FINALE

Après application de tous les fixes :
1. npm run build doit passer sans erreur
2. Le Header doit être visible au premier chargement sur la home
   (logo vert foncé + liens vert foncé sur fond blanc du Hero)
3. Le halo doit être clairement visible, volumétrique, avec
   animation breathing
4. L'input IRIS doit avoir l'effet glass + shadow élévation + hover
5. La typographie doit respirer avec plus d'espace entre les blocs
6. Un grain subtil doit être visible en regardant de près
7. La cascade d'entrée doit durer environ 1800ms et inclure un
   blur-resolve
8. Le CTA secondaire doit tenir sur une ligne
9. La transition vers la section suivante doit être douce

git commit -m "polish: hero + header visual fidelity to design system"
