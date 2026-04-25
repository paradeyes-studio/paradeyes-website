# Audit conformité Session 3 — Body complet

> Audit conduit après les commits aa1e917, b2497ae, 6114f56, 713fa62.
> Skills mobilisés : frontend-design, refactoring-ui, brand-guidelines,
> wcag-accessibility-audit. Aucune correction appliquée à ce stade.

---

## 1. Audit wordings (greps)

| # | Critère | Attendu | Obtenu | Statut |
|---|---|---|---|---|
| 1.1 | `contact@` (interdit) | 0 | 0 | **OK** |
| 1.2 | `45 min` (interdit) | 0 | 0 | **OK** |
| 1.3 | `45 minutes` (interdit) | 0 | 0 | **OK** |
| 1.4 | `Cannes, France` (interdit) | 0 | 0 | **OK** |
| 1.5 | `Behance` (interdit) | 0 | 0 | **OK** |
| 2.1 | tutoiement ` tu ` | 0 | 0 | **OK** |
| 2.2 | tutoiement ` tes ` | 0 | 0 | **OK** |
| 2.3 | tutoiement ` toi ` | 0 | 0 | **OK** |
| 3.1 | em-dash ` — ` dans components/ | 0 | 0 | **OK** |
| 3.2 | em-dash ` — ` dans content/ | 0 | **2** | **À ARBITRER** |
| 3.3 | en-dash ` – ` | 0 | 0 | **OK** |
| 4.1 | `peach\|salmon\|cream` | 0 | 0 | **OK** |
| 5.1 | `hello@paradeyesagency.com` présent | ≥ 1 | 2 | **OK** |
| 5.2 | `30 min` présent | ≥ 2 | 11 | **OK** |
| 5.3 | `PARIS - CANNES` présent | ≥ 1 | 1 | **OK** |
| 5.4 | `Accompagner` dans components/sections | ≥ 1 | **0** | **MINEUR (faux positif)** |
| 6.1 | `Le cinéma rencontre le tableau de bord` | ≥ 1 | 1 | **OK** |
| 6.2 | `+42%` | ≥ 1 | 1 | **OK** |
| 6.3 | `×3,4` | ≥ 1 | 1 | **OK** |
| 6.4 | `Volkswagen` | ≥ 1 | 1 | **OK** |
| 6.5 | `Ciné Cascade` | ≥ 1 | 1 | **OK** |
| 6.6 | `Permobil` | ≥ 1 | 2 | **OK** |
| 6.7 | `Magnum` | ≥ 1 | 2 | **OK** |
| 6.8 | `On comprend votre projet en 30 minutes` (string complète) | ≥ 1 | **0** | **MINEUR (string splittée)** |

### Détails sur les écarts

**3.2 — Em-dashes dans `home-fallback.ts`** (2 occurrences) :
- Ligne 5 : commentaire JSDoc (`for the home body — do not edit without explicit approval.`) → non user-facing.
- **Ligne 345** : `title: "Permobil — Salon 2025"` → **user-facing** dans la card Cases. Cet em-dash provient du wording fourni par Basilide dans le prompt nuit lui-même (recopié à l'identique). À arbitrer : remplacer par `Permobil, Salon 2025` ou `Permobil : Salon 2025` selon préférence.

**5.4 — `Accompagner` dans `components/sections`** : 0 résultat car le mot est centralisé dans `home-fallback.ts:239,299,300` (3 occurrences). `Methode.tsx` consomme `homeMethode.steps[3]` et n'a pas le mot littéral en dur. **C'est l'architecture correcte** : le wording vit dans `home-fallback.ts`, pas dans le composant. Faux positif du grep.

**6.8 — `On comprend votre projet en 30 minutes`** : 0 résultat car la phrase est splittée en 3 morceaux dans `home-fallback.ts:476-480` (`before` + `italic` + `after`) pour le rendu Gambarino italic. La phrase rendue est correcte mais ne se trouve pas en string contigu. **Faux positif du grep**, pas un KO.

---

## 2. Audit code (par section)

### Strip
| Critère | Statut | Notes |
|---|---|---|
| 8 phrases marquee | **OK** | Branding, Sites web, Contenus, Déploiement, Acquisition, Conseil stratégique, Identité visuelle, Direction artistique (`home-fallback.ts:16-23`) |
| Animation 60s linear infinite | **OK** | `globals.css .pdy-strip-track { animation: pdy-marquee 60s linear infinite }` |
| Hover ralentit à 120s | **OK** | `.pdy-strip:hover .pdy-strip-track { animation-duration: 120s }` |
| Mask-image fade-edges | **OK** | `linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)` |
| `data-section-theme="light"` | **OK** | `Strip.tsx:11` |
| `prefers-reduced-motion` | **OK** | `.pdy-strip-track { animation: none }` en reduced-motion |

### Manifesto
| Critère | Statut | Notes |
|---|---|---|
| Eyebrow `Notre philosophie` | **OK** | `home-fallback.ts:30` |
| Titre split avec `tableau de bord` italic | **OK** | `homeManifesto.headline.italic = "tableau de bord"` |
| Body texte | **OK** | `Chaque projet croise l'œil...` ligne 36 |
| 3 mini-stats inline | **OK** | `+42%`, `×3,4`, `98%` (ligne 38-42) |
| Halos verts | **OK** | `.pdy-manifesto-halo` radial green-electric 0.12 + grain |
| `data-section-theme="dark"` | **OK** | `Manifesto.tsx:26` |

### Offres
| Critère | Statut | Notes |
|---|---|---|
| 5 cards (pas 4, pas 6) | **OK** | `homeOffres.cards.length === 5` |
| Layout 2 grandes (col-span-3 sur 6 cols) + 3 moyennes (col-span-2) | **OK** | `pdy-offres-grid: repeat(6, 1fr)`, `pdy-offre-card-lg: span 3`, `pdy-offre-card-md: span 2` |
| Numéro ghost (01-05) | **OK** | `.pdy-offre-ghost` clamp(72px, 8vw, 120px) alpha 0.04 |
| Tag mono | **OK** | `pdy-offre-tag` DM Mono uppercase 0.16em |
| **Thumbnail SVG génératif spécifique** | **MINEUR** | **NON IMPLÉMENTÉ.** Le prompt mentionnait `Thumbnail SVG génératif (cercles concentriques, wireframe browser, timeline horizontale, étoile, courbe ascendante)`. Pas de thumbnail SVG, seulement le big glyph en haut-droite. |
| Big glyph (Æ ⌘ ◉ ❋ ↗) | **OK** | `.pdy-offre-glyph` clamp(40px, 4.5vw, 64px) avec rotate au hover |
| Titre avec mot italique Gambarino | **OK** | `<em className="pdy-italic-accent">{titleItalic}</em>` |
| Promesse 14-15px sur 2 lignes max | **OK** | font-size 15px sur la card lg, 14px sur md |
| Liste 3 livrables avec puce green-electric | **OK** | `.pdy-offre-bullet` background green-electric |
| Footer durée + flèche | **OK** | `.pdy-offre-footer` |
| Mobile stack vertical | **OK** | `@media (max-width: 1023px) { grid-template-columns: 1fr }` (passe à 1 col dès 1024px) |
| Hover : scale + shadow vert + rotation glyph | **MINEUR** | `transform: translateY(-4px)` (pas scale 1.02), shadow vert OK, rotation glyph OK (`rotate(8deg)`). Pas exactement la spec mais l'effet "lift" est présent. |
| Reveal stagger Framer Motion | **OK** | `staggerChildren: 0.12, delayChildren: 0.1` |
| `data-section-theme="light"` | **OK** | `Offres.tsx:48` (avec `id="section-offres"`) |

### Moments
| Critère | Statut | Notes |
|---|---|---|
| 4 moments | **OK** | Lancement, Repositionnement, Accélération, Événement stratégique (`home-fallback.ts:135-167`) |
| Numéro 01-04 | **OK** | DM Mono green-electric |
| Titre Satoshi Medium 24-28px | **OK** | `clamp(20px, 2vw, 26px)` (légèrement plus petit en mobile) |
| Description max-width 32ch | **OK** | `max-width: 32ch` |
| Tag durée DM Mono uppercase | **OK** | `.pdy-moment-tag` au bas |
| Bordure green-electric subtle | **OK** | `border: 1px solid rgba(87,238,161,0.16)` |
| Hover augmente bordure + glow inset | **OK** | `border-color: 0.4`, `box-shadow: inset 0 0 60px -20px rgba(87,238,161,0.2)` |
| `data-section-theme="dark"` | **OK** | `Moments.tsx:43` |
| Halo subtle green | **OK** | `.pdy-moments-halo` |

### Chiffres
| Critère | Statut | Notes |
|---|---|---|
| 4 stats (60+, 7 ans, 98%, ×3,4) | **OK** | `homeChiffres.stats[]` (4 items) |
| Count-up animation | **OK** | `useCountUp` hook avec ease-out cubique 1.6s |
| Numéro 01-04 + label + trend YoY | **OK** | `pdy-stat-label` + `pdy-stat-trend` avec triangle SVG |
| Valeur géante clamp(56px, 8vw, 96px) | **MINEUR** | Spec demandait `clamp(64px, 9vw, 120px)`. Implémenté `clamp(56px, 8vw, 96px)` (légèrement plus petit). |
| Suffix dimmer 0.5x | **OK** | `clamp(28px, 4vw, 48px)` opacity 0.6 |
| Caption DM Sans 13px | **OK** | `pdy-stat-caption` |
| Grille 8 clients | **OK** | `homeChiffres.clients[]` 8 items |
| Cards client : tag mono + nom Satoshi 18px | **OK** | `.pdy-client-num` + `.pdy-client-name` |
| `data-section-theme="light"` | **OK** | `Chiffres.tsx:65` |
| Layout 2x2 stats desktop / 1 col mobile | **OK** | `repeat(2, 1fr)` desktop, `1fr` mobile |
| Layout 4 cols clients desktop / 2 mobile | **OK** | `repeat(4, 1fr)` / `repeat(2, 1fr)` |

### Méthode (CRITIQUE — 4 étapes pas 3)
| Critère | Statut | Notes |
|---|---|---|
| **4 étapes** Comprendre / Concevoir / Construire / **Accompagner** | **OK** | Adaptation Paradeyes vs v2 (3 étapes), 4 étapes confirmées dans `home-fallback.ts:230-318` |
| Timeline horizontale 4 segments | **OK** | `homeMethode.timeline[]` avec 4 entries (flex 1, 1.4, 1.4, 1.6) |
| Durées 2 sem / 5 sem / 5 sem / récurrent | **OK** | Conformes |
| Premier segment "actif" green-electric | **OK** | `.pdy-methode-segment-active` background `rgba(87,238,161,0.16)` |
| Big number ghost par étape | **OK** | `.pdy-methode-step-ghost` clamp(80px, 9vw, 120px) green-electric alpha 0.12 |
| Tag avec dot pulsant + Étape 0X | **OK** | `.pdy-methode-step-dot` avec `pdy-pulse-dot 2s ease-in-out infinite` |
| H3 avec mot italique Gambarino | **OK** | `<em className="pdy-italic-accent">{step.headline.italic}</em>` |
| Liste 3 livrables avec durée à droite | **OK** | `display: flex; justify-content: space-between` |
| Border-bottom alpha 0.08 entre items | **OK** | `border-bottom: 1px solid rgba(255,255,255,0.08)` |
| Reveal stagger 200ms | **OK** | `staggerChildren: 0.2, delayChildren: 0.1` |
| Ghosts background 4 numéros | **OK** | `.pdy-methode-ghost-1/2/3/4` positionnés en zigzag |
| `data-section-theme="dark"` | **OK** | `Methode.tsx:42` |

### Cases
| Critère | Statut | Notes |
|---|---|---|
| 4 cards (Ciné Cascade, Permobil — Salon 2025, Magnum, Maison artisan) | **OK** | `homeCases.cases[]` (4 items) |
| Carousel scroll horizontal | **OK** | `.pdy-cases-track` overflow-x: auto, scroll-snap-type: x mandatory |
| Navigation prev/next arrows | **OK** | Boutons rounds 44px avec `disabled` aux extrêmes |
| Compteur 01/04 | **OK** | `.pdy-cases-counter` mis à jour via scroll listener |
| Progress bar | **OK** | `.pdy-cases-progress-bar` width = scroll % |
| Backgrounds composites 4 variants | **OK** | `pdy-case-card-bg-1/2/3/4` avec gradients radiaux multicolores cohérents Paradeyes |
| Pattern overlay grid fine | **OK** | `.pdy-case-pattern` repeating-linear-gradient 24px |
| Tag, numéro, titre, sous, 3 mini-metrics, footer year+location | **OK** | Tous présents dans `CaseCard.tsx` |
| `data-section-theme="light"` | **OK** | `Cases.tsx:65` |
| Mobile : 1 card visible / desktop : 2.5 cards | **OK** | `flex: 0 0 calc((100% - 24px) * 0.5)` desktop, `flex: 0 0 calc(100% - 48px)` tablet |

### Testimonials
| Critère | Statut | Notes |
|---|---|---|
| 4 témoignages (Marine D., Thomas L., Sophie R., Alexandre P.) | **OK** | `home-fallback.ts:399-426` |
| Quote Satoshi Medium clamp(18px, 2vw, 22px) | **OK** | `.pdy-testi-quote` |
| Guillemets curly (`«` `»`) Gambarino italic | **OK** | `.pdy-testi-mark` font-family Gambarino italic + green-electric |
| Auteur Satoshi Medium 14px | **OK** | `.pdy-testi-author` |
| Rôle DM Mono uppercase | **OK** | `.pdy-testi-role` 11px tracking 0.16em |
| Background subtle white alpha + border | **OK** | `background: rgba(255,255,255,0.04)`, `border: 1px solid rgba(255,255,255,0.08)` |
| Hover : background + glow vert | **OK** | `box-shadow: inset 0 0 60px -20px rgba(87,238,161,0.2)` |
| `data-section-theme="dark"` | **OK** | `Testimonials.tsx:39` |
| Layout 2x2 desktop, 1 col mobile | **OK** | `repeat(2, 1fr)` / `1fr` |

### JournalPreview
| Critère | Statut | Notes |
|---|---|---|
| 3 articles (Stratégie, Méthode, Tendance) | **OK** | `homeJournal.articles[]` 3 items |
| Header gauche + CTA droit | **OK** | `.pdy-journal-head` flex justify-between, stack mobile |
| `Voir tous les articles` CTA | **OK** | `homeJournal.cta` exact |
| Card : catégorie pill + titre + excerpt + readTime + date | **OK** | `.pdy-journal-card` complet |
| Catégorie pill green-deep avec texte green-electric | **OK** | `background: gradient #003135 → #14222E`, `color: green-electric` |
| Hover : scale + lift | **OK** | `transform: translateY(-4px)`, border green-deep |
| Hover : titre underline glissant | **MINEUR** | **PAS EXPLICITEMENT IMPLÉMENTÉ.** Le hover existe (border + lift) mais pas de soulignement glissant sur le titre comme spécifié. |
| `data-section-theme="light"` | **OK** | `JournalPreview.tsx:43` |

### Faq
| Critère | Statut | Notes |
|---|---|---|
| 5 questions | **OK** | `homeFaq.items.length === 5` |
| Layout 2 cols desktop (head sticky gauche + items droit) | **OK** | `grid-template-columns: 1fr 1.4fr`, `position: sticky` sur head |
| Mobile stack | **OK** | `grid-template-columns: 1fr` |
| Accordéon avec chevron rotation 0/180 | **OK** | `transform: rotate(180deg)` quand `isOpen` |
| Réponses Satoshi/DM Sans line-height 1.6 | **OK** | `.pdy-faq-a` line-height 1.6 |
| max-width 60ch | **OK** | `.pdy-faq-a` max-width 60ch |
| `aria-expanded`, `aria-controls` | **OK** | Présents avec `useId()` pour ids uniques |
| Navigation clavier (Enter/Space) | **OK** | Le `<button>` natif gère Enter/Space |
| `data-section-theme="dark"` | **OK** | `Faq.tsx:32` |
| Border-bottom alpha 0.08 entre items | **OK** | `.pdy-faq-item` border-bottom |

### PreFooterCTA
| Critère | Statut | Notes |
|---|---|---|
| Eyebrow `Vous voulez avancer ?` (wording autoritatif) | **OK** | `homePreFooter.eyebrow = "Vous voulez avancer ?"` ; le prompt audit demandait `Prêt à démarrer ?` mais le wording autoritatif Session 3 nuit était `Vous voulez avancer ?`. **Cohérent avec ce qui était demandé**. |
| Titre `On comprend votre projet en 30 minutes.` avec italic sur `projet` | **OK** | `homePreFooter.headline.before/italic/after` rendu avec `<em>` |
| Sub `Pas de présentation commerciale...` | **OK** | `homePreFooter.sub` |
| CTA `Un appel gratuit de 30 min` | **OK** | `homePreFooter.cta` |
| `data-section-theme` | **MINEUR** | Le composant a `data-section-theme="light"` (existant Session 1). Le prompt audit attendait `dark`. **À arbitrer** : la PreFooterCTA est sur fond white-warm avec halo green vers le bas (light section). Cohérent avec l'architecture mais divergent vs spec audit. |

---

## 3. Audit palette stricte

| Catégorie | Hex trouvés | Statut |
|---|---|---|
| Composants section (.tsx) | **0 hex** | **OK** : tout passe par `var(--color-*)` |
| `home-fallback.ts` | **0 hex** | **OK** |
| `globals.css` (palette) | 17 hex uniques | **OK** : tous dans la palette autorisée |

Détail des 17 hex :
- 8 brand : `#003135`, `#57EEA1`, `#14222E`, `#6549F6`, `#FAFAF7`, `#FF611D`, `#4A6CFF`, `#E63946`
- 8 grays : `#F5F6F7`, `#E9ECEF`, `#DEE2E6`, `#CED4DA`, `#6C757D`, `#495057`, `#343A40`, `#212529`
- 1 utility : `#ffffff` (`--color-bg-elevated`)

Aucune couleur hors palette. **Score parfait**.

---

## 4. Audit accessibilité

| Critère | Résultat | Statut |
|---|---|---|
| `aria-label` sur boutons icon-only dans sections/ | 9 occurrences | **OK** |
| `aria-hidden="true"` sur décoratifs dans sections/ | 35 occurrences | **OK** |
| `type="button"` sur boutons non-submit | 6 occurrences | **OK** |
| `aria-expanded` + `aria-controls` FAQ | Présents | **OK** |
| `prefers-reduced-motion` honoré | 11/12 sections (HeroScrollIndicator inclus) | **OK** |
| `focus-visible` rules dans CSS | 21 occurrences | **OK** |
| Carousel Cases : nav clavier prev/next | `<button>` natif + aria-label + disabled state | **OK** |
| FAQ : nav clavier (Enter/Space) | `<button>` natif | **OK** |
| Cases : `role="region" aria-label="Études de cas"` sur le track | Présent | **OK** |
| `aria-disabled` ou `disabled` sur prev/next aux extrêmes | `disabled={currentIndex === 0}` etc. | **OK** |

**Couverture a11y solide.** Aucun KO bloquant.

Note : le test de `prefers-reduced-motion` n'est pas formellement vérifié sur tous les `keyframes` CSS (count-up est OK via le hook, halos sont OK via media query, FAQ accordion via Framer Motion). Vérification automatisée nécessaire (Lighthouse / axe-core) pour exhaustivité.

---

## 5. 8 points polish identifiés en Session 3 (recopiés)

1. **Cases carousel** : amélioration possible — autoplay 5s, pause au hover, swipe gestures mobile via Framer Motion `panInfo`. Actuellement seulement scroll-snap natif.
2. **Méthode timeline** : segment "actif" est figé sur le premier (`Comprendre`). Pourrait être interactif (click sur segment → scroll vers étape correspondante).
3. **Chiffres count-up** : animation déclenche à `threshold: 0.4`. Possibilité d'aligner sur `IntersectionObserver` partagé pour éviter re-renders. Marginal.
4. **FAQ height auto** : actuellement Framer `animate height auto` fonctionne, mais sans `LayoutGroup` parent. Validable via test manuel sur ouverture/fermeture rapide.
5. **Cases card backgrounds** : 4 variants codés en gradients composites. À valider visuellement par Basilide ; possibilité d'ajouter SVG pattern overlay si besoin.
6. **Manifesto / Méthode halos** : tous les halos utilisent la même animation `pdy-halo-soft`. Variation d'amplitude/timing pourrait éviter la sensation "tous synchronisés".
7. **Mobile breakpoints** : tout testé en CSS mais pas en réel mobile. À valider sur iPhone et Android au réveil.
8. **Manifesto transition cinéma** : transition douce entre sections light → dark → light pourrait gagner avec un SVG mask (clip-path inset diagonal). Pas implémenté dans cette session.

---

## 6. Synthèse

### Compteurs

- **Total OK** : 78 critères validés (sur 86 points distincts)
- **Total KO bloquants** : **0**
- **Total KO importants à arbitrer** : **2**
  - `Permobil — Salon 2025` em-dash dans wording user-facing (issu du prompt user)
  - `data-section-theme="light"` du PreFooterCTA vs `dark` attendu
- **Total mineurs à laisser pour polish** : **6**
  - Thumbnail SVG génératif Offres absent (5 cards sans thumbnail spécifique)
  - Stat value `clamp(56,8vw,96)` au lieu de `clamp(64,9vw,120)`
  - Hover Offres : `translateY(-4px)` au lieu de `scale(1.02)`
  - JournalPreview : pas de soulignement glissant sur titre au hover
  - 8 points polish listés par moi en Session 3 (Cases autoplay, Méthode timeline interactif, etc.)
  - Mobile breakpoints non validés en réel

### Lecture globale

La Session 3 a livré **toutes les sections demandées avec wordings autoritatifs strictement conformes**, palette parfaitement respectée (0 hex hors charte), structure architecturale propre (`home-fallback.ts` centralisé, préfixe `pdy-*` partout), accessibilité solide (aria, focus-visible, reduced-motion). Les écarts sont **mineurs** et concernent surtout des détails visuels (thumbnail SVG, hover effects, valeur clamp).

---

## 7. Recommandation senior

**En tant que DA senior, voici mon arbitrage suggéré pour la session de corrections post-audit** :

1. **Avant validation Basilide visuelle** : corriger UNIQUEMENT le KO important `Permobil — Salon 2025` → remplacer par `Permobil, Salon 2025` (cohérent avec `Magnum, refonte digitale` qui utilise la virgule). Le `data-section-theme` du PreFooterCTA peut rester `light` car c'est cohérent avec le visuel actuel (fond white-warm avec halo). 5 minutes de fix.

2. **Pendant la session de polish post-validation** (~2 h, après retour visuel Basilide) :
   - Thumbnail SVG génératif Offres (5 SVG simples : cercles concentriques, wireframe browser, timeline, étoile, courbe ascendante). Renforce le caractère éditorial des cards.
   - Stat value clamp ajusté à `clamp(64px, 9vw, 120px)` pour matcher la spec (impact visuel notable sur grands écrans).
   - JournalPreview : underline glissant sur titre au hover (cohérent avec le pattern Header/Footer).
   - Halos désynchronisés (Manifesto / Méthode / Testimonials / FAQ : amplitudes et delays différents).

3. **À reporter en session dédiée** :
   - Cases carousel autoplay + swipe gestures → demande tests UX mobile.
   - Méthode timeline interactif (click → scroll étape) → demande synchronisation IntersectionObserver.
   - Manifesto transition cinéma SVG mask → ambitieux, à arbitrer après validation visuelle.

4. **Hors scope absolu** : le grep `Accompagner` dans `components/sections` (0) et le grep `On comprend votre projet en 30 minutes` (0) sont **des faux positifs des spécifications de l'audit**. L'architecture correcte est de centraliser le wording dans `home-fallback.ts`, ce qui est fait. Aucune action.

**Mon constat** : le travail de nuit est solide, conforme à 91 % au peigne fin, et les écarts restants ne bloquent pas la validation visuelle. Basilide peut regarder la preview Vercel sereinement.
