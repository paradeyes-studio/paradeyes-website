# Session 3 — Body home Paradeyes (11 sections)

**Goal:** Intégrer les 11 sections du body de la home (entre Hero et Footer existants) en transposition de `reference/Paradeyes Home v2.html`, adaptées à la charte Paradeyes.

**Architecture:** 4 batches autonomes, commits séparés. Wordings autoritatifs centralisés dans `src/content/home-fallback.ts`. Composants section dans `src/components/sections/*.tsx`. CSS partagé via classes `.pdy-*` dans `globals.css`. Tokens dérivés de `src/lib/tokens.ts` (easings, durations, stagger).

---

## Batch 3.1 — Strip + Manifesto + Offres (~1h30)

| Task | Files | Notes |
|---|---|---|
| 3.1.1 Strip marquee | `src/components/sections/Strip.tsx`, CSS `.pdy-strip-*` | Bordure white-warm, items avec separators `·` green-electric, mask-edges, hover slow |
| 3.1.2 Manifesto | `src/components/sections/Manifesto.tsx`, CSS `.pdy-manifesto-*` | Dark green-deep + halo, h2 italic Gambarino, 3 mini-stats |
| 3.1.3 Offres | `src/components/sections/Offres.tsx` + `offres/OffreCard.tsx` | 5 cards riches : numéro ghost, glyph, livrables, durée. Grid 2+3 desktop, stack mobile |
| Commit 3.1 | | `feat(body 3.1): add Strip + Manifesto + Offres sections` |

## Batch 3.2 — Moments + Chiffres + Méthode (~2h)

| Task | Files | Notes |
|---|---|---|
| 3.2.1 Moments | `src/components/sections/Moments.tsx` | Dark, 4 cards horizontales |
| 3.2.2 Chiffres | `src/components/sections/Chiffres.tsx` + hook `useCountUp.ts` | Light, 4 stats count-up + grille 8 clients |
| 3.2.3 Méthode | `src/components/sections/Methode.tsx` + sous-composants | Dark, ghosts background, timeline 4 segments, 4 étapes detail |
| Commit 3.2 | | `feat(body 3.2): add Moments + Chiffres + Methode sections` |

## Batch 3.3 — Cases + Testimonials + Journal + FAQ + PreFooter (~1h30)

| Task | Files | Notes |
|---|---|---|
| 3.3.1 Cases | `src/components/sections/Cases.tsx` + `cases/CaseCard.tsx` | Carousel scroll-snap, 4 cards bg variants, prev/next, progress bar |
| 3.3.2 Testimonials | `src/components/sections/Testimonials.tsx` | Dark, 4 cards 2x2 |
| 3.3.3 Journal preview | `src/components/sections/JournalPreview.tsx` | Light, 3 cards article |
| 3.3.4 FAQ | `src/components/sections/Faq.tsx` | Dark, accordion 5 items, layout 2 cols desktop |
| 3.3.5 PreFooter check | `src/components/nav/PreFooterCTA.tsx` | Lecture + alignement wordings |
| Commit 3.3 | | `feat(body 3.3): add Cases + Testimonials + Journal + FAQ + verify PreFooterCTA` |

## Batch 3.4 — Validation finale (~45 min)

| Task | Notes |
|---|---|
| 3.4.1 Branchement page.tsx | Toutes les sections dans l'ordre |
| 3.4.2 Greps critiques | contact@, 45 min, Cannes France, em-dash, Behance, tutoiement |
| 3.4.3 Build + lint | 0 erreur |
| 3.4.4 SESSION_3_SUMMARY.md | Récap commits, composants, KO |
| 3.4.5 Persist claude-mem | Décisions clés |
| Commit 3.4 | `docs(session-3): add summary, complete body integration` |

---

## Conventions de code adoptées

- Préfixe CSS : `.pdy-*` partout (consistent avec Header/Footer)
- TypeScript : `as const` sur les data, `interface Props {}` nommée
- Imports : tokens depuis `src/lib/tokens.ts`, content depuis `src/content/home-fallback.ts`
- Animations Framer Motion 12 : variants typés `Variants`, `useReducedMotion` partout
- Reduced motion : opacity uniquement
- Sémantique HTML : `<section data-section-theme="...">` partout pour le Header observer

## Risques identifiés

- v2 utilise des couleurs hors charte (peach, cream, salmon) — filtrer strictement à la transposition
- Méthode v2 = 3 étapes, Paradeyes = 4 étapes — adapter le visuel timeline
- Cases carousel : pattern scroll-snap horizontal, IntersectionObserver pour le compteur
- FAQ accordion : Framer Motion 12 `animate height auto` nécessite `mount` initial (Context7 si besoin)
- Performance : 3 halos Hero + halos Footer + halos Manifesto + Méthode = ne pas multiplier sur trop de sections
