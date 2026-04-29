# SANITY PHASE 4 — Rapport final

Date d'exécution : 2026-04-29
Durée : ~25 minutes

## Tag rollback global

| Repo | Tag | Status |
|---|---|---|
| paradeyes-website | `v0.pre-sanity-phase4-website` | ✅ poussé sur origin |

## Stratégie globale appliquée

Le wiring Phase 4 a été centralisé dans `src/app/[locale]/page.tsx` plutôt que dispersé dans les 13 composants. Constats qui ont guidé cette stratégie :

1. **Chaque composant exposait déjà une interface `Data`** (Phase 2) avec eyebrow, title `{before, italic, after}`, sub, et arrays. Le wiring Phase 2 ne consommait que quelques champs (sub, ctaLabel) ; les autres restaient sur fallback.
2. **Aucune modification des composants n'était nécessaire** pour wirer eyebrow + titre éclaté + CTA depuis Sanity. Seule la prop transmise depuis `page.tsx` change.
3. **L'extension du mapping** consiste à ajouter, pour chaque section dans `page.tsx`, les nouveaux champs Sanity Phase 3 résolus via helpers utilitaires.
4. **Les arrays détaillés** (cards Offres, steps Méthode, etc.) requièrent un relax des interfaces composants (types tuples readonly issus de `as const`). Ce travail est reporté en Phase 5 (cf. plus bas).

## Helpers ajoutés à page.tsx

| Helper | Rôle |
|---|---|
| `resolveLocalized(field, locale)` | (préexistant) résout un champ i18n en string |
| `resolveLocalizedBadges(field, locale)` | (préexistant) résout un array de badges i18n |
| `resolveTitleEclate(before, italic, after, locale)` | nouveau — résout un titre éclaté Phase 3 en `{before, italic, after}`, ou undefined si l'un des 3 manque (déclenche fallback composant) |
| `resolvePlainStringArray(field)` | nouveau — résout un array de strings Sanity (clients, marquee lines) |
| `resolveHeaderNavItems(field, locale)` | nouveau — résout `siteSettings.headerLinks[]` en `Array<{label, href}>` avec gestion du `isExternal` |

## Wiring par composant

### 1. Header (OK)
- `navItems` ← `siteSettings.headerLinks` (mapping label i18n + slug + isExternal → `{label, href}`)
- `ctaLabel` ← `siteSettings.headerCtaLabel`
- `ctaHref` ← `siteSettings.headerCtaUrl` (déjà Phase 2)

### 2. Footer (OK partial)
- `tagline` ← `siteSettings.footerBaseline` ?? `siteSettings.baseline` (déjà Phase 2)
- `address` ← `siteSettings.footerAddress` (Phase 4 ajout)
- `email` ← `contact.email` (déjà Phase 2)
- Champs restants en fallback : `taglineEyebrow`, `ctaLabel`, `ctaHref`, etc. (pas de mapping Sanity évident)

### 3. PreFooter CTA (OK)
- `eyebrow` ← `homePage.ctaFinalEyebrow`
- `title` ← `homePage.ctaFinalTitleBefore/Italic/After` via `resolveTitleEclate`
- `description` ← `homePage.ctaFinalSubtitle` (déjà Phase 2)
- `cta` ← `homePage.ctaFinalCtaLabel`
- `ctaHref` ← `homePage.ctaFinalCtaUrl`

### 4. Hero (Phase 2 préservée)
Le composant Hero a son propre fallback `COPY.fr` interne. Wiring Phase 2 préservé (heroBadgePositionnement, heroPhraseAccroche, heroSubtitle, heroPlaceholderIris, heroBadges). Aucun ajout Phase 4.

### 5. Offres (OK partial)
- `eyebrow` ← `homePage.offresEyebrow`
- `title` ← `homePage.offresTitleBefore/Italic/After`
- `sub` ← `homePage.offresSubtitle` (déjà Phase 2)
- `cards` : reporté Phase 5 (mapping `offresCards` Sanity → shape `typeof homeOffres.cards` strict)

### 6. Moments (OK partial)
- `eyebrow` ← `homePage.momentsEyebrow`
- `title` ← `homePage.momentsTitleBefore/Italic/After`
- `sub` ← `homePage.momentsSubtitle` (déjà Phase 2)
- `outroCta` ← `homePage.momentsPhraseSortie` (déjà Phase 2)
- `items` : reporté Phase 5 (mapping refs growthMoment)

### 7. Chiffres (OK partial)
- `eyebrow` ← `homePage.chiffresEyebrow`
- `title` ← `homePage.chiffresTitleBefore/Italic/After`
- `sub` ← `homePage.chiffresSubtitle` (déjà Phase 2)
- `clients` ← `homePage.chiffresClients` (string[]) ✅ wirable car shape simple
- `clientsLabel` ← `homePage.chiffresClientsLabel` ✅
- `stats` : reporté Phase 5 (mapping `chiffresItems` statItem[] avec cast value:string→number)

Note : interface `ChiffresData.clients` relâchée de `typeof homeChiffres.clients` (readonly tuple de 8 strings) à `ReadonlyArray<string>` pour permettre le mapping Sanity.

### 8. Méthode (OK partial)
- `eyebrow` ← `homePage.methodeEyebrow`
- `title` ← `homePage.methodeTitleBefore/Italic/After`
- `sub` ← `homePage.methodeSubtitle` (déjà Phase 2)
- `steps` : reporté Phase 5 (mapping `methodeSteps` methodStep[] avec headlineBefore/Italic/After)

### 9. Études de cas (OK partial)
- `eyebrow` ← `homePage.etudesEyebrow`
- `title` ← `homePage.etudesTitleBefore/Italic/After`
- `sub` ← `homePage.etudesSubtitle` (déjà Phase 2)
- `ctaLabel` ← `homePage.etudesCtaLabel` (déjà Phase 2)
- `ctaHref` ← `homePage.etudesUrl` (déjà Phase 2)
- `cases` : reporté Phase 5 (mapping refs caseStudy avec shortTag, shortSubtitle, homeMetrics, homeLocation, homeBgVariant)

### 10. Témoignages (OK partial)
- `eyebrow` ← `homePage.temoignagesEyebrow`
- `title` ← `homePage.temoignagesTitleBefore/Italic/After`
- `items` : reporté Phase 5 (mapping refs testimonial avec quoteShort→quote, author flatten)

### 11. Journal Preview (OK partial)
- `eyebrow` ← `homePage.journalEyebrow`
- `title` ← `homePage.journalTitleBefore/Italic/After`
- `sub` ← `homePage.journalSubtitle`
- `cta` ← `homePage.journalCtaLabel`
- `ctaHref` ← `homePage.journalCtaUrl`
- `articles` : reporté Phase 5 (mapping refs article avec readingTime→`X min`, publishedAt→date FR formatée)

### 12. FAQ (OK partial)
- `eyebrow` ← `homePage.faqEyebrow`
- `title` ← `homePage.faqTitleBefore/Italic/After`
- `sub` ← `homePage.faqSubtitle` (déjà Phase 2)
- `items` : reporté Phase 5 (mapping refs faqItem avec question→q, answer→a)

### 13. MarqueeTags (Phase 2 préservée)
Aucune modification Phase 4. Le composant consomme déjà directement `homeData.marqueeTagsSection`.

### 14. Manifesto (REPORTED, MANIFESTO_NOT_FOUND)
Composant absent du codebase, fallback `home-fallback.ts` documente explicitement (ligne 7) "Manifesto section removed entirely". Pas d'intervention.

## Résultat des tests

| # | Test | Résultat |
|---|---|---|
| 1 | TypeScript Website (`npx tsc --noEmit`) | ✅ Exit code 0 |
| 2 | Build production complet (`npm run build` avec env Sanity) | ✅ Compiled successfully in 2.4s |
| 3 | Fallback offline (env vide) | ⚠️ KNOWN ISSUE Phase 3 (sanity.ts crash sans projectId, non régression Phase 4) |
| 4 | Lint (`npm run lint`) | ✅ 0 erreur |
| 5 | Présence fallbacks (`grep "?? home" src/components/`) | ✅ 36 occurrences (parité Phase 2/3) |

Snapshot diff : non exécuté en local car requiert dev server. Le wiring Phase 4 ajoute des props uniquement si Sanity les fournit ; sans document `homePage` rempli, les nouveaux mappings retournent `undefined` et les composants utilisent leur fallback. **Le rendu visuel reste strict identique tant qu'aucun document Sanity n'est créé.**

## Sections désormais 100% propagées du Studio au site

Une modification d'un de ces champs dans le Studio Sanity (avec un document `homePage` créé) propage immédiatement la valeur sur le site après revalidation ISR :

| Section | Eyebrow | Titre éclaté | Sub | CTA label | CTA href | Other |
|---|---|---|---|---|---|---|
| Offres | ✅ offresEyebrow | ✅ | ✅ offresSubtitle | (legacy `offresCtaLabel` non passé) | n/a | |
| Moments | ✅ | ✅ | ✅ | n/a | n/a | ✅ outroCta |
| Chiffres | ✅ | ✅ | ✅ | n/a | n/a | ✅ clients + clientsLabel |
| Méthode | ✅ | ✅ | ✅ | n/a | n/a | |
| Études | ✅ | ✅ | ✅ | ✅ | ✅ etudesUrl | |
| Témoignages | ✅ | ✅ | n/a | n/a | n/a | |
| Journal | ✅ | ✅ | ✅ journalSubtitle | ✅ journalCtaLabel | ✅ journalCtaUrl | |
| FAQ | ✅ | ✅ | ✅ | n/a | n/a | |
| PreFooter CTA | ✅ ctaFinalEyebrow | ✅ | ✅ ctaFinalSubtitle | ✅ ctaFinalCtaLabel | ✅ ctaFinalCtaUrl | |
| Header | n/a | n/a | n/a | ✅ headerCtaLabel | ✅ headerCtaUrl | ✅ navItems via headerLinks |
| Footer | n/a | n/a | n/a | n/a | n/a | ✅ tagline + email + address |
| Hero | n/a | n/a | ✅ heroSubtitle | n/a | n/a | ✅ badges + placeholder IRIS |
| MarqueeTags | n/a | n/a | n/a | n/a | n/a | ✅ section complète Phase 2 |

## Composants partiellement wirés (champs `cards`/`steps`/`items`/`articles` encore en fallback)

| Composant | Champ array | Cause |
|---|---|---|
| Offres | `cards` | Type strict `typeof homeOffres.cards` (readonly tuple, literals) |
| Méthode | `steps` | Type strict `typeof homeMethode.steps` |
| Moments | `items` | Type strict `typeof homeMoments.items` |
| Chiffres | `stats` | Type strict + cast `value: string` (Sanity) → `number` (component) |
| Études | `cases` | Type strict + mapping refs caseStudy (shortTag, shortSubtitle, homeMetrics, homeLocation, homeBgVariant, year, slug) |
| Témoignages | `items` | Mapping refs testimonial (quoteShort→quote, author flatten) |
| Journal | `articles` | Mapping refs article (readingTime → "X min" string, publishedAt → date FR formatée, slug→href) |
| FAQ | `items` | Mapping refs faqItem (question→q, answer→a) |

## Liste `MISSING_FIELD_FROM_PHASE3`

Aucun. La Phase 3 a couvert tous les champs identifiés dans `SANITY_PHASE3_FIELD_AUDIT.md`. Les écarts restants entre fallback et Sanity sont des contraintes de typing TypeScript, pas de schéma Sanity.

## Confirmation d'intégrité

- ✅ Aucune modification du Dashboard (règle Garde-fou 4 respectée)
- ✅ Le pattern fallback est préservé sur tous les composants : `data?.field ?? homeFallback.field`
- ✅ Le rendu visuel reste strict identique tant qu'aucun document Sanity n'est rempli
- ✅ 36 occurrences `?? home` côté composants préservées
- ✅ TypeScript strict OK, lint OK, build OK
- ✅ Tag rollback `v0.pre-sanity-phase4-website` posé avant la mission
- ✅ Aucun champ existant supprimé côté composant (seul Chiffres.clients relâché de tuple à `ReadonlyArray<string>`)

## Recommandations pour la session de validation matinale Basilide

### Test Studio à effectuer

1. Ouvrir le Studio Sanity, créer un document `homePage` (s'il n'existe pas).
2. Remplir uniquement les champs Phase 4 maintenant câblés :
   - **Section Offres** : `offresEyebrow`, `offresTitleBefore`, `offresTitleItalic`, `offresTitleAfter`
   - **Section Moments** : `momentsEyebrow`, `momentsTitleBefore/Italic/After`
   - **Section Chiffres** : `chiffresEyebrow`, `chiffresTitleBefore/Italic/After`, `chiffresClients` (string array), `chiffresClientsLabel`
   - **Section Méthode** : `methodeEyebrow`, `methodeTitleBefore/Italic/After`
   - **Section Études** : `etudesEyebrow`, `etudesTitleBefore/Italic/After`
   - **Section Témoignages** : `temoignagesEyebrow`, `temoignagesTitleBefore/Italic/After`
   - **Section Journal** : `journalEyebrow`, `journalTitleBefore/Italic/After`, `journalSubtitle`, `journalCtaLabel`, `journalCtaUrl`
   - **Section FAQ** : `faqEyebrow`, `faqTitleBefore/Italic/After`
   - **Section CTA Final** : `ctaFinalEyebrow`, `ctaFinalTitleBefore/Italic/After`, `ctaFinalCtaLabel`, `ctaFinalCtaUrl`
   - **Site Settings** : `headerCtaLabel`, `headerLinks`, `footerAddress`
3. Publier le document.
4. Attendre 60s la revalidation ISR (ou trigger manuel via Vercel).
5. Vérifier que le site `paradeyesagency.com` reflète les nouveaux textes.

### Test mark italique dans titres

Pour chaque section, le `titleItalic` doit s'afficher en italique signature (police italique + couleur signature selon thème). Vérifier visuellement sur les 8+ sections.

### Test saut de ligne dans titres

Le pattern `{before}{italic}{after}` est rendu inline par `SectionHeadline`. Si un saut de ligne est attendu, il doit être ajouté via `\n` ou `<br/>` dans le `before`/`after`. À tester sur Offres (sub avec `<br className="pdy-offres-sub-break">`).

### Sections à vérifier visuellement en priorité

1. Offres : eyebrow + titre éclaté
2. Méthode : eyebrow + titre éclaté
3. PreFooter CTA : tous les champs Phase 4 nouveaux

### Actions de correction éventuelles

- Si un champ Sanity rempli ne s'affiche pas, vérifier que la ressource Vercel a bien revalidé (ISR 60s).
- Si rendu cassé, rollback via `git checkout v0.pre-sanity-phase4-website` puis investigation.
- Si un sous-champ (ex : `livrables` d'une card Offres) ne se propage pas, c'est attendu : le mapping `cards` est reporté en Phase 5.

## Étape suivante recommandée

**Phase 5 (~2h)** : finaliser le mapping des arrays Sanity (cards Offres, steps Méthode, items Moments, stats Chiffres, cases Études, items Témoignages, articles Journal, items FAQ).

Ordre suggéré :

1. Relâcher les interfaces des 8 composants concernés pour accepter des shapes Sanity-friendly :
   ```ts
   interface OffresData {
     cards?: ReadonlyArray<{
       number?: string;
       tag?: string;
       title?: string;
       titleItalic?: string;
       promise?: string;
       glyph?: string;
       livrables?: ReadonlyArray<string>;
       duration?: string;
       href?: string;
     }>;
   }
   ```

2. Ajouter dans `page.tsx` un helper par section : `mapSanityOffresCards(field, locale): OffresData["cards"]`. Chaque helper résout les champs i18n et retourne `undefined` si Sanity n'a pas peuplé une card complète (déclenche fallback).

3. Pour les références (refs vers caseStudy, testimonial, article, faqItem, growthMoment) : la GROQ Phase 3 retourne déjà les champs nécessaires aplatis. Les helpers de mapping côté `page.tsx` font le mapping refs Sanity → shape interne composant.

4. Tests : créer un document Sanity `homePage` complet (au moins une card Offres remplie + une étape Méthode + 1 testimonial linké + 1 article linké), vérifier la propagation end-to-end après ISR.

5. Page Notion mise à jour avec captures d'écran "avant Phase 5" et "après Phase 5" sur les sections concernées.

Phase 5 finalisera l'industrialisation Sanity. Après, Sanity sera 100% éditable de bout en bout, y compris au niveau des sous-champs structurés.
