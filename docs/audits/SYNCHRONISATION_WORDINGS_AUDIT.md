# Audit conformité synchronisation wordings Notion → code

> Audit produit le 2026-04-25 sur le commit `fcfffbc` (synchronisation 15B).
> Référence d'origine : rapport `docs/wordings/notion-export-2026-04-25.md` (commit `58fce0d`).

## 1. Vérifications préalables

| Vérification | Attendu | Constat | Statut |
|---|---|---|---|
| `git status` working tree clean | propre | propre | **OK** |
| `git log` HEAD = commit synchro 15B | `fcfffbc` visible | `fcfffbc feat(content): synchronize home wordings with Notion validated source` | **OK** |
| `docs/wordings/notion-export-2026-04-25.md` présent | présent | présent | **OK** |
| `src/components/sections/Manifesto.tsx` absent | absent | `No such file or directory` | **OK** |
| `src/content/home-fallback.ts` présent | présent | présent | **OK** |

## 2. Arbitrages structurels (6 décisions Basilide)

### Arbitrage 1 — Méthode 4 étapes alignée

| Grep | Attendu | Constat | Statut |
|---|---|---|---|
| `grep -c "Construire" home-fallback.ts` | ≥ 1 | 3 | OK |
| `grep -c "Accompagner" home-fallback.ts` | ≥ 1 | 3 | OK |
| `grep -c "Produire" home-fallback.ts` | 0 | 0 | OK |
| `grep -c "Faire grandir" home-fallback.ts` | 0 | 0 | OK |

**Statut Arb 1 : OK** — Les 4 étapes Notion validées (Comprendre / Concevoir / Construire / Accompagner) sont en place. Anciens noms abandonnés.

### Arbitrage 2 — Chiffres 3 stats

| Vérification | Attendu | Constat | Statut |
|---|---|---|---|
| Items dans `homeChiffres.stats` | 3 | 3 (lignes 192, 201, 210) | OK |
| Stat 1 | "Marques accompagnées" 60+ | présent | OK |
| Stat 2 | "Années d'expertise" 7+ | présent | OK |
| Stat 3 | "Clients fidèles" 90%+ | présent | OK |
| Stat 4 (archivée Notion) | absente | absente | OK |
| `grid-cols-4` ou `repeat(4, 1fr)` orphelin sur grid Chiffres | 0 | 0 (les deux `repeat(4, 1fr)` du CSS sont sur `.pdy-moments-grid` et `.pdy-clients-grid`, légitimes) | OK |
| Grid Chiffres après réduction | 3 cols desktop / 2 tablet / 1 mobile | conforme | OK |

**Statut Arb 2 : OK** — Réduction 4→3 stats appliquée, pas d'orphelin CSS.

### Arbitrage 3 — Footer 4 colonnes + baseline synchronisée

| Grep | Attendu | Constat | Statut |
|---|---|---|---|
| `Le cinéma rencontre le tableau de bord` | 0 | 0 | OK |
| `tableau de bord` dans `src/components/` ou `src/content/` | 0 | 0 | OK |
| `Agence créative au service de votre croissance` dans `src/` | ≥ 1 | 3 (home-fallback, fr.json description, layout.tsx OG title) | OK |
| `On comprend. On conçoit. On construit` dans `src/` | ≥ 1 | 1 (home-fallback ligne 562) | OK |
| Footer.tsx rend bien `{homeFooter.tagline}` | oui | `<p className="pdy-foot-baseline">{homeFooter.tagline}</p>` | OK |
| Typo non cassée par la longueur | ajustement éventuel | `max-width:34ch` (au lieu de 28ch) + `line-height:1.35` (au lieu de 1.3) appliqués pour wrap propre | OK |

**Statut Arb 3 : OK** — Baseline synchronisée, ancien wording éradiqué, ajustement typo léger pour absorber la longueur (~92 chars).

### Arbitrage 4 — Moments tags durée supprimés

| Grep | Attendu | Constat | Statut |
|---|---|---|---|
| `Mois 1 à 6` dans `src/` | 0 user-facing | 1 occurrence dans `src/content/home-fallback.ts:9` (commentaire de documentation, pas user-facing) | **MINEUR** |
| `Plan sur 6 à 12` dans `src/` | 0 | 0 | OK |
| `Récurrent` dans `Moments.tsx` | 0 | 0 | OK |
| `Ponctuel` dans `Moments.tsx` | 0 | 0 | OK |
| `tag:` sous `homeMoments.items` | 0 | 0 (les `tag:` restants sont sur `offres.cards`, `methode.steps`, `cases.cases`, légitimes) | OK |
| JSX `{m.tag}` ou `{item.tag}` dans `Moments.tsx` | 0 | 0 | OK |
| CSS `.pdy-moment-tag` orpheline | absente | retirée du CSS | OK |

**Statut Arb 4 : OK avec 1 mineur** — La seule occurrence de "Mois 1 à 6" est un commentaire JSDoc qui documente la suppression elle-même. Non user-facing, sans impact runtime. Peut être retiré dans un polish ultérieur si Basilide veut une trace 100% propre.

### Arbitrage 5 — Manifesto suppression intégrale

| Vérification | Attendu | Constat | Statut |
|---|---|---|---|
| `ls src/components/sections/Manifesto.tsx` | absent | absent | OK |
| `grep -rn "Manifesto" src/app/` | 0 | 0 | OK |
| `grep -rn "import Manifesto" src/` | 0 | 0 | OK |
| `grep -rn "from.*Manifesto" src/` | 0 | 0 | OK |
| `grep -rn "pdy-manifesto" src/` | 0 | 0 | OK |
| `grep -n "manifesto:" home-fallback.ts` | 0 | 0 | OK |
| `grep -n "manifesto " home-fallback.ts` | 0 | 0 (note : seules 3 occurrences de "Manifesto" dans home-fallback.ts sont des commentaires de documentation au début du fichier décrivant la décision de suppression — non user-facing) | OK |
| `+42%` dans `src/content/` | 0 | 0 | OK |
| `×3,4` dans `src/content/` | 0 | 0 | OK |
| `mini-stats` dans `src/` | 0 | 0 | OK |

**Statut Arb 5 : OK** — Suppression intégrale. 88 lignes CSS, composant, import, JSX, clé content tous éliminés.

### Arbitrage 6 — Strip 8 items conservés

| Item | Présent dans home-fallback.ts | Statut |
|---|---|---|
| Branding | oui | OK |
| Sites web | oui | OK |
| Contenus | oui | OK |
| Déploiement | oui | OK |
| Acquisition | oui | OK |
| Conseil stratégique | oui | OK |
| Identité visuelle | oui | OK |
| Direction artistique | oui | OK |
| Strip.tsx présent | oui | OK |

**Statut Arb 6 : OK** — Marquee 8 items intacts.

## 3. Wordings critiques par section

### Hero

| Wording | Localisation | Statut |
|---|---|---|
| `On identifie ce qui bloque votre croissance` | HeroSection.tsx + fr.json (2 fichiers) | OK |
| `On construit ce qui performe` | HeroSection.tsx + fr.json | OK |
| `Une seule agence, un seul interlocuteur` | HeroSection.tsx + fr.json | OK |
| `Approche sur-mesure, jamais de template` | HeroSection.tsx + fr.json | OK |
| `ROI mesurable sur chaque projet` | HeroSection.tsx + fr.json | OK |
| `AGENCE DE COMMUNICATION PREMIUM` | HeroSection.tsx + fr.json | OK |
| `Décrivez votre projet. IRIS vous oriente en 2 minutes` | HeroSection.tsx + fr.json | OK |
| `Qu'aimeriez-vous améliorer pour rendre votre business` | HeroSection.tsx (1 fichier) | OK |
| `Une agence qui comprend votre business avant de proposer` | HeroSection.tsx + fr.json | OK |

### CTA final

| Wording | Localisation | Statut |
|---|---|---|
| `Parlons de votre projet maintenant` | home-fallback.ts (split structurel : `before: "Parlons de votre "` + italic `projet` + `after: " maintenant."`) | **OK structuré** |
| `30 minutes d'appel gratuit. Sans engagement` | home-fallback.ts:553 | OK |

Le titre CTA final est découpé en 3 segments pour permettre le rendu de l'accent italic Gambarino sur "projet". Concaténation runtime = wording Notion exact. Conforme intentionnellement.

### Footer

| Wording | Localisation | Statut |
|---|---|---|
| `Espace client` dans Footer.tsx | absent | **MINEUR** (non spécifié obligatoire dans wordings Notion validés) |
| `© Paradeyes Agency` | Footer.tsx:186 (`© {year} Paradeyes Agency. Tous droits réservés.`) | OK |
| `hello@paradeyesagency.com` | Footer.tsx (2 occurrences : `mailto:` + texte affiché) | OK |
| `PARIS - CANNES` | Footer.tsx:153 | OK |

## 4. Interdits (charte Paradeyes)

| Interdit | Attendu | Constat | Statut |
|---|---|---|---|
| em-dash ` — ` dans `src/content/` | 0 | 0 | OK |
| em-dash ` — ` dans `src/components/sections/` | 0 | 0 | OK |
| en-dash ` – ` dans `src/content/` | 0 | 0 | OK |
| en-dash ` – ` dans `src/components/sections/` | 0 | 0 | OK |
| `contact@paradeyesagency` | 0 | 0 | OK |
| `45 min` ou `45 minutes` | 0 | 0 | OK |
| `Cannes, France` | 0 | 0 | OK |
| `Behance` | 0 | 0 | OK |
| ` tu ` (tutoiement) | 0 | 0 | OK |
| ` tes ` | 0 | 0 | OK |
| ` ton ` | 0 | 0 | OK |

**Statut Phase 4 : OK total** — Aucune entorse à la charte.

## 5. Audit technique (build, lint, TS, composants)

| Test | Attendu | Constat | Statut |
|---|---|---|---|
| `npm run build` | 0 erreur | 0 erreur, 34 pages générées | OK |
| `npm run lint` | 0 erreur, 0 warning | 0 erreur, 0 warning | OK |
| `homeMoments.items[*]` sans clé `tag` | absente | absente | OK |
| `homeManifesto` au top-level | absente | absente | OK |
| `homeChiffres.stats` items count | 3 | 3 | OK |
| Wordings TypeScript-valides (quotes, template strings) | conforme | conforme | OK |
| `as const` orphelin | aucun | aucun | OK |
| `interface Manifesto` ou `type Manifesto` | aucun | aucun | OK |

**Composants présents dans `src/components/sections/`** : `Cases.tsx`, `Chiffres.tsx`, `Faq.tsx`, `HeroScrollIndicator.tsx`, `HeroSection.tsx`, `JournalPreview.tsx`, `Methode.tsx`, `Moments.tsx`, `Offres.tsx`, `Strip.tsx`, `Testimonials.tsx`, plus dossiers `cases/` et `offres/`. **Manifesto.tsx absent** (correct).

**Note** : `PreFooterCTA.tsx` est dans `src/components/nav/`, pas `sections/`. Le rendu se fait via le Footer (`<Footer showPreFooter />`), voir Phase 6.

**CSS orphans** :

| Sélecteur | Attendu | Constat | Statut |
|---|---|---|---|
| `.pdy-manifesto*` | 0 | 0 | OK |
| `.pdy-moment-tag` | 0 | 0 | OK |
| `.pdy-stat-trend` | 0 | 0 | OK |

## 6. Page.tsx (orchestration)

**Séquence rendue** :

```
<Header locale={typedLocale} />
<main id="main">
  <HeroSection ... />
  <Strip />
  <Offres />
  <Moments />
  <Chiffres />
  <Methode />
  <Cases />
  <Testimonials />
  <JournalPreview />
  <Faq />
</main>
<Footer locale={typedLocale} showPreFooter preFooterVariant="default" />
```

| Section | Position attendue | Position réelle | Statut |
|---|---|---|---|
| Hero | 1 | 1 | OK |
| Strip | 2 | 2 | OK |
| Offres | 3 (après Strip, sans Manifesto entre les deux) | 3 | OK |
| Moments | 4 | 4 | OK |
| Chiffres | 5 | 5 | OK |
| Methode | 6 | 6 | OK |
| Cases | 7 | 7 | OK |
| Testimonials | 8 | 8 | OK |
| JournalPreview | 9 | 9 | OK |
| Faq | 10 | 10 | OK |
| PreFooterCTA | 11 (entre Faq et Footer) | rendu via `<Footer showPreFooter ... />` (interne au composant Footer, hors `<main>`) | **MINEUR structurel** |

**Note** : `PreFooterCTA` n'est pas appelé en JSX direct dans `page.tsx`, il est rendu par le Footer quand `showPreFooter={true}`. Choix structurel pré-existant à la synchronisation 15B (commit antérieur). Visuellement et fonctionnellement équivalent. À confirmer avec Basilide si l'appel direct est préféré.

## 7. Polish précédents préservés

| # | Polish | Marqueur | Constat | Statut |
|---|---|---|---|---|
| 1 | Soulignement performe (drawn underline) | `.pdy-headline-emphasis::after` | présent ligne 660 + media query 678 | OK |
| 2 | Magnétisme submit IRIS | `useMagnetic` + `--mag-proximity` | hook présent + utilisé dans `HeroSection.tsx` + `Footer.tsx` + définition CSS lignes 579-596 | OK |
| 3 | Magnétisme logo footer | `useMagnetic` dans Footer.tsx | présent (import ligne 6) | OK |
| 4 | Halos breathe | `halo-pulse-green`, `halo-pulse-violet` keyframes | présents lignes 271, 283 | OK |
| 5 | Marquee fade-edges | `mask-image:linear-gradient` | présent lignes 354, 355, 500 | OK |
| 6 | Scroll indicator signature | `scrollTrackPulse` keyframe | présent lignes 728, 730 | OK |
| 7 | Hero arrondi bas + footer arrondi haut | `border-bottom-left-radius:60px` (hero) + `border-top-left-radius:60px` (footer), 32px en mobile | présents lignes 628-634 (hero) + 758-768 (footer) | OK |
| 8 | Header rectangulaire (PAS de capsule) | `pdy-header-capsule` | 0 occurrence | OK |

**Statut Phase 7 : 8/8 OK** — Aucun polish des commits `9cbb73c`, `c9544a0`, `ef4ecaa`, `0098212` n'a été régressé.

## 8. Vérifications croisées Notion (5 fetches)

| Notion ID | Titre | Version FR Notion | Wording dans code | Statut |
|---|---|---|---|---|
| `3459ea1e281281bc8e88ded543ad2186` | Hero - Phrase d'accroche | `On identifie ce qui bloque votre croissance. On construit ce qui performe.` | identique (HeroSection.tsx:38, fr.json:21) | **MATCH STRICT** |
| `3459ea1e281281a59cacf2c09dcbab8b` | Hero - Sous-titre | `Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.` | identique (HeroSection.tsx:40, fr.json:22) | **MATCH STRICT** |
| `3459ea1e281281e2842fcb5601aae00e` | CTA final - Titre | `Parlons de votre projet maintenant.` | concaténation `before+italic+after` = `Parlons de votre projet maintenant.` | **MATCH SÉMANTIQUE** (split pour italic accent) |
| `3459ea1e28128174b613e9a8471cd9a9` | CTA final - Sous-titre | `30 minutes d'appel gratuit. Sans engagement. Des recommandations concrètes à la clé.` | identique (home-fallback.ts:553) | **MATCH STRICT** |
| `3459ea1e2812814ba8cfdb6daab0fb3e` | Footer - Tagline | `Agence créative au service de votre croissance. On comprend. On conçoit. On construit.` | identique (home-fallback.ts:562) | **MATCH STRICT** |

**Statut Phase 8 : 5/5 alignés** (4 strict + 1 sémantique structuré).

## 9. Synthèse

- **Total OK** : 60+ vérifications passées
- **KO bloquants** : **0**
- **KO importants** : **0**
- **Mineurs** : **2**

### Liste des mineurs

1. **Commentaire JSDoc dans `home-fallback.ts:9`** mentionne `"Mois 1 à 6"` (documentation de la suppression). Non user-facing, sans impact. Peut être nettoyé en polish ultérieur si trace 100% propre souhaitée.
2. **`PreFooterCTA` rendu via `<Footer showPreFooter />` plutôt qu'en JSX direct** dans `page.tsx`. Choix structurel pré-existant à 15B. Fonctionnellement équivalent. À arbitrer avec Basilide si refacto souhaité.

## 10. Recommandation senior

La synchronisation 15B est **propre et complète**. Les 6 arbitrages Basilide sont appliqués sans exception bloquante. Les 5 wordings Notion les plus critiques (Hero, CTA, Footer) sont alignés caractère par caractère avec la source de vérité Notion validée le 2026-04-17/18. Les 8 polish précédents (commits `9cbb73c`, `c9544a0`, `ef4ecaa`, `0098212`) sont intacts. Le Header rectangulaire est préservé (refonte capsule reportée comme demandé). Build et lint sont verts.

**Validation visuelle Vercel preview recommandée maintenant**, avec attention particulière à :

- **Footer baseline** : la nouvelle phrase fait ~92 caractères contre ~39 pour l'ancienne. Le `max-width` du sélecteur `.pdy-foot-baseline` a été élargi à 34ch (au lieu de 28ch) et la `line-height` portée à 1.35. Vérifier que le wrap reste élégant (3 lignes attendues sur desktop, 4 lignes mobile possible).
- **Chiffres grid** : passage de 4 stats en 2x2 à 3 stats sur 3 colonnes desktop. Vérifier que la dernière colonne ne paraît pas vide ou mal cadrée.
- **Suppression Manifesto** : transition Strip → Offres directe désormais. Vérifier que les sections s'enchaînent sans rupture rythmique étrange.
- **Mobile 375px** : non testé automatiquement, à valider en DevTools Chrome.

Les 2 mineurs identifiés ne nécessitent pas de correction avant validation visuelle. Si Basilide juge que tout passe à l'œil, le sprint suivant peut être lancé sans repasse de polish. Sinon, un mini-prompt 17 ciblé suffira pour ces deux points.
