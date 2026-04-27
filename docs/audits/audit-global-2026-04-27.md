# Audit global Paradeyes 2026-04-27

## Synthèse

- **0 erreur TypeScript** (`npx tsc --noEmit` clean)
- **0 warning ESLint** (`npm run lint` clean)
- **0 console.log oublié**
- **8 TODOs** légitimes (synchronisation Notion en attente, non bloquants)
- **3 vrais problèmes** détectés (cf. plan correction)
- **Estimation corrections** : ~30 min

## Stats projet

- 59 fichiers .tsx, 17 fichiers .ts
- `globals.css` 4212 lignes
- `home-fallback.ts` 570 lignes

## Axe 1, Code et build

État : **propre**. TS strict OK, ESLint clean, pas de console.log. TODOs liés à la synchronisation Sanity/Notion future, hors scope.

## Axe 2, Visuel et DA

**Problème détecté #1 critique** : régression `pdy-section-reveal` sur `Methode` et `Offres`.
- 7 sections l'appliquent (Moments, Testimonials, JournalPreview, Cases, Chiffres, Faq, autres)
- 2 sections ne l'appliquent pas (Methode, Offres) → rupture cohérence animation Cinéma signature

**Problème détecté #2 cohérence DA** : couleurs hardcoded dans `HeroSection.tsx`
- 5 occurrences (`#003135`, `#57EEA1`, `#57eea1`, `#023236`, `#57EEA1`)
- Devraient passer par les variables CSS Paradeyes
- Le Logo SVG conserve ses couleurs hardcoded (convention SVG inline OK)

`data-section-theme` et `pdy-section-stacked--zN` correctement appliqués partout ailleurs.

## Axe 3, Responsive et mobile

État : **propre**. Tokens `--pdy-pad-x-mobile` standardisés Chantier mobile. Media queries cohérentes.

## Axe 4, Animations et performance

État : **propre**.
- 67 références `useReducedMotion`/`prefers-reduced-motion`
- 14 cleanups `disconnect`/`revert` pour 8 IntersectionObserver/GSAP context (chaque usage cleanup)
- `will-change` 7 occurrences raisonnables, `backdrop-filter` 2 occurrences contenues

## Axe 5, Accessibilité (WCAG AA)

État : **propre**.
- Images `<img>` ont `alt=""` (décoratives, conforme)
- Boutons icon-only ont `aria-label`
- Hiérarchie h1/h2/h3 cohérente (h2 sections, h3 cards)
- 24 règles `:focus-visible` couvrent les éléments interactifs

## Axe 6, Wordings

**Problème détecté #3 cohérence éditoriale** : Footer ligne 155 utilise `"PARIS - CANNES"` avec tiret ASCII. Règle DA Paradeyes "AUCUN tiret dans les textes". À remplacer par point médian `·`.

État reste propre par ailleurs :
- Email cohérent partout (`hello@paradeyesagency.com`)
- Appel cohérent partout (30 min, jamais 45)
- LinkedIn + Instagram (pas de Twitter exposé)

**Signalement** : `behanceUrl` présent dans `src/lib/sanity.queries.ts` (champ optionnel du schema). Pas de référence visible dans le rendu, donc OK tant que le schema Sanity ne le rend pas. À supprimer du schema lors de la migration Sanity si Behance définitivement abandonné.

## Axe 7, Structure et architecture

État : **propre**.
- 5 hooks customs bien organisés (`useCountUp`, `useMagnetic`, `useParallaxScroll`, `useSectionReveal`, `useTilt`)
- Pas de composants dupliqués (chaque nom unique)
- Content centralisé dans `src/content/home-fallback.ts`
- Pas d'import circulaire détecté

## Axe 8, SEO et meta

État : **partiel**.
- Metadata bien définie (title template, description, openGraph, robots, alternates, icons favicon)
- `src/app/sitemap.ts` et `src/app/robots.ts` présents (Next.js 13+ convention)
- **Manques** : pas d'`opengraph-image.tsx`, pas de `twitter` metadata explicite, pas de `apple-icon`. À signaler à Basilide pour décision (ces fichiers nécessitent assets visuels).

## Plan de correction priorisé

1. **[Critique]** Ajouter `pdy-section-reveal` sur Methode et Offres pour cohérence animation Cinéma
2. **[Cohérence DA]** Remplacer couleurs hardcoded HeroSection.tsx par `var(--color-*)` (sauf Logo SVG)
3. **[Wording]** "PARIS - CANNES" → "PARIS · CANNES" dans Footer
4. **[Signalement Basilide]** SEO : créer assets opengraph-image, apple-icon, ajouter Twitter card metadata
5. **[Signalement Basilide]** behanceUrl à retirer du schema Sanity lors de la migration
