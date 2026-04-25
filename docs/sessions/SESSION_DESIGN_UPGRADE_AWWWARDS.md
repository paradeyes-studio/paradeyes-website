# Session Design Upgrade Awwwards — Rapport final

## Date
25 avril 2026

## Tag de rollback
`v0.session3-pre-design-upgrade` (push origin OK)
Branche backup : `backup-pre-design-upgrade` (push origin OK)

## Procédure de rollback (en cas de besoin)
```bash
git reset --hard v0.session3-pre-design-upgrade
git push --force-with-lease origin main
```

## Commits produits (9 features + 1 rapport = 10 cumulatifs)

| # | SHA | Message |
|---|---|---|
| 1 | `d708cbd` | feat(tokens): cinema design tokens (gradients dark, texture grid, easings, section stacking, reveal hook) |
| 2 | `390cc4a` | feat(structure): remove Strip section + apply pdy-section-stacked rounded top to all body sections (cards stacking effect) |
| 3 | `078fdc9` | feat(header): refonte en capsule centrale flottante Option A v2 (suppression complete ancien header + nouveau composant chirurgical) |
| 4 | `ad3b437` | feat(chiffres): replace static clients grid with continuous marquee (premium ticker style) |
| 5 | `9ca861a` | feat(methode): refonte en scroll-triggered horizontal timeline GSAP (Apple-like cinema scrub) |
| 6 | `8bf9cf6` | feat(testimonials): premium G2/Vercel-like cards with 5-star rating + verified badge (no photos per Basilide decision) |
| 7 | `2b7dc5e` | feat(prefooter): refonte tabs Awwwards-style with smooth switch (Parlez a IRIS / Reservez un appel + meta) |
| 8 | `0edeae6` | feat(visual): apply pdy-bloc-dark gradients + texture grid to all dark sections (no flat green-deep, anti-double-vert breaks via gradient variants) |
| 9 | `695d5da` | feat(motion): apply universal section reveals on scroll across body sections (skipped Methode for GSAP scrub) |
| 10 | _this commit_ | docs(session): add Design Upgrade Awwwards session summary |

## Fichiers créés
- `src/hooks/useSectionReveal.ts`
- `src/components/sections/chiffres/ClientsMarquee.tsx`
- `src/components/ui/StarRating.tsx`
- `src/components/ui/VerifiedBadge.tsx`

## Fichiers supprimés
- `src/components/sections/Strip.tsx` (et clé `homeStrip` dans `src/content/home-fallback.ts`)

## Fichiers réécrits intégralement
- `src/components/nav/Header.tsx` (capsule flottante)
- `src/components/sections/Methode.tsx` (GSAP horizontal timeline scrub)
- `src/components/sections/Testimonials.tsx` (premium G2/Vercel-like cards)
- `src/components/nav/PreFooterCTA.tsx` (Awwwards tabs IRIS/Appel)

## Validation finale
- **Build** : 0 erreur, 34 pages générées
- **Lint** : 0 erreur, 0 warning
- **TypeScript** : strict, aucun `any` introduit
- **Wordings Notion** : 100% intacts (synchronisation 15B préservée)

## 8 chantiers majeurs — bilan

| # | Chantier | Statut |
|---|---|---|
| 1 | Strip supprimé | OK (composant + clé content + 41 lignes CSS retirés) |
| 2 | Header capsule v2 | OK (refonte chirurgicale, ancien header CSS supprimé intégralement, 47 règles `.pdy-header-capsule`) |
| 3 | Cards stacking universel | OK (10 sections + PreFooter avec `pdy-section-stacked`) |
| 4 | Méthode GSAP timeline | OK (ScrollTrigger pin + scrub horizontal, fallback mobile vertical, prefers-reduced-motion respecté) |
| 5 | Logos clients marquee | OK (composant `ClientsMarquee` + animation 80s linear infinite, fade-edges mask) |
| 6 | Testimonials premium | OK (`StarRating` + `VerifiedBadge`, no `<img>`, hover glow vert) |
| 7 | PreFooterCTA tabs | OK (2 tabs IRIS/Appel, indicator slide, AnimatePresence panels) |
| 8 | Texture + gradients dark | OK (5 sections `pdy-bloc-dark` + 4 variantes gradient + texture grid SVG mask radial) |

## Polish précédents préservés (8/8)

| # | Polish | Statut |
|---|---|---|
| 1 | Soulignement performe (drawn underline `pdy-headline-emphasis::after`) | OK |
| 2 | Magnétisme submit IRIS (`useMagnetic` + `--mag-proximity`) | OK |
| 3 | Magnétisme logo footer (`useMagnetic` dans Footer.tsx) | OK |
| 4 | Halos breathe (`halo-pulse-green`/`halo-pulse-violet` keyframes) | OK |
| 5 | Marquee fade-edges (footer signature) | OK |
| 6 | Scroll indicator signature (`scrollTrackPulse`) | OK |
| 7 | Hero arrondi bas + footer arrondi haut (60/32px) | OK |
| 8 | Header rectangulaire → désormais **capsule flottante** par décision validée Phase 3 | TRANSITION |

## Wordings Notion (synchronisation 15B intacte)

| Wording | Présence | Statut |
|---|---|---|
| `On identifie ce qui bloque votre croissance` | 2 (HeroSection + fr.json) | OK |
| `Agence créative au service de votre croissance` | 3 (home-fallback + fr.json + layout.tsx) | OK |
| `hello@paradeyesagency.com` | 4 (Footer mailto + display + PreFooter mailto + fr.json) | OK |
| `PARIS - CANNES` | 1 (Footer.tsx) | OK |
| `Parlons de votre projet maintenant` | split structurel (before/italic/after) | OK |

## Interdits charte (0 occurrence partout)

| Interdit | Statut |
|---|---|
| em-dash ` — ` dans content/sections | 0 — OK |
| `contact@paradeyesagency` | 0 — OK |
| `45 min` / `45 minutes` | 0 — OK |
| `Cannes, France` | 0 — OK |
| `Behance` | 0 — OK |

## Decisions techniques notables

1. **Méthode sans `useSectionReveal`** : la section utilise GSAP ScrollTrigger pin + scrub. Ajouter `pdy-section-reveal` (opacity-0/translateY) interfère avec le pinning. Choix conservateur : laisser GSAP gérer toute la motion de la section.

2. **`pdy-header-capsule` z-index 50** vs ancien header `z-index 40` : alignement avec la convention Tailwind/Vercel pour permettre overlays modaux à 60+.

3. **Footer gradient via `--gradient-dark-primary`** : remplace l'ancien fond `#003135` flat. Crée le break visuel attendu vs PreFooter qui utilise `--gradient-dark-pre-footer` (linéaire vertical descendant). Continuité d'arrondi top conservée.

4. **PreFooter component conserve l'interface `variant`** : default/offre/contact préservés pour compatibilité avec la signature Footer.tsx (`preFooterVariant="default"` actuel). Tabs IRIS/Appel s'appliquent à toutes les variantes via le même squelette.

5. **`headerProps locale` toujours requis** : la capsule n'a pas changé l'interface du composant Header pour éviter de toucher page.tsx (passé en `Header locale={typedLocale}`).

## Points laissés pour session suivante (hors-scope sleep mission)

1. **Lenis smooth scroll global** : déjà actif mais pourrait bénéficier d'un fine-tune pour la phase pinning Méthode (`lerp` ajusté + `wheelMultiplier`).
2. **Cursor signature green-electric** : différenciation pointer/non-pointer, hors scope ce soir.
3. **Mobile testing approfondi** : viewport 375px à valider en device réel par Basilide.
4. **Audit Lighthouse + WCAG** : à programmer.
5. **8 pages Notion "Strip - Item N"** restent en statut "À valider par Basilide" — Basilide pourra les supprimer côté Notion quand elle veut.
6. **`homeStrip` retiré du content** : le code TS n'expose plus l'objet `homeStrip`. Si la sitemap d'autres pages le référence (improbable), il faudra ajouter une réimport. Aucun crash actuellement.

## Fichier orthogonal stashé puis restauré

`docs/superpowers/plans/2026-04-25-session-2-header-footer-hero.md` — non touché par cette session, est resté tel quel après la synchronisation 15B (commit `fcfffbc`).
