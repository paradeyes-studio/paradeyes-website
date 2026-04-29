# SANITY PHASE 4 — Wiring Plan shape-by-shape

Date : 2026-04-29
Référence : SANITY_PHASE3_FIELD_AUDIT.md + SANITY_PHASE3_REPORT.md

## Stratégie globale

Le wiring Phase 4 se passe principalement dans `src/app/[locale]/page.tsx`. Tous les composants exposent déjà une interface `data?: SectionData` avec eyebrow, title `{before, italic, after}`, sub, arrays. Le travail Phase 4 est :

1. Ajouter des helpers `resolveTitleEclate(data, prefix, locale)` et `resolveLocalizedStringArray(field, locale)` dans page.tsx.
2. Pour chaque section, enrichir le mapping pour passer eyebrow + title éclaté + arrays Sanity.
3. Pour les arrays (cards Offres, steps Méthode, items Moments, etc.), mapper shape Sanity → shape interne du composant.
4. Si une interface composant est trop stricte (typeof homeXxx readonly), la relâcher en `Array<{...}>` standard.
5. Wirer Header, Footer, PreFooter sur les nouveaux champs `siteSettings` et `homePage.ctaFinal`.

## Mapping par composant

### Header (déjà partiellement Phase 2)
- `data.ctaHref` ← `siteSettings.headerCtaUrl` (déjà wiré)
- `data.ctaLabel` ← `siteSettings.headerCtaLabel` (à ajouter)
- `data.navItems` ← `siteSettings.headerLinks` (à ajouter)

### Footer (déjà partiellement Phase 2)
- `data.tagline` ← `siteSettings.footerBaseline` (déjà wiré)
- `data.email` ← `contact.email` (déjà wiré)
- `data.address` ← `siteSettings.footerAddress` (à ajouter)
- `data.taglineEyebrow` ← (champ optionnel non présent en Sanity, fallback uniquement)

### PreFooter CTA (route via Footer ou direct via page.tsx)
- `data.eyebrow` ← `homePage.ctaFinalEyebrow`
- `data.title` ← `homePage.ctaFinalTitleBefore/Italic/After`
- `data.description` ← `homePage.ctaFinalSubtitle`
- `data.cta` ← `homePage.ctaFinalCtaLabel`
- `data.ctaHref` ← `homePage.ctaFinalCtaUrl`

### Chiffres
- `data.eyebrow` ← `homePage.chiffresEyebrow`
- `data.title` ← `homePage.chiffresTitleBefore/Italic/After`
- `data.sub` ← `homePage.chiffresSubtitle` (déjà wiré)
- `data.clients` ← `homePage.chiffresClients` (string array, simple)
- `data.clientsLabel` ← `homePage.chiffresClientsLabel`
- `data.stats` ← Sanity `chiffresItems` (statItem[]). Mapping: `value` (string) → number, `suffix`, `label` (i18n), `caption` (i18n), `number` ← derived from order. Type interne `typeof homeChiffres.stats` à relâcher.

### MarqueeTags (déjà Phase 2)
- Aucune modification nécessaire, `marqueeTagsSection` déjà passé directement.

### FAQ
- `data.eyebrow` ← `homePage.faqEyebrow`
- `data.title` ← `homePage.faqTitleBefore/Italic/After`
- `data.sub` ← `homePage.faqSubtitle` (déjà wiré)
- `data.items` ← Sanity `faqItems` refs faqItem (mapping `question` → `q`, `answer` → `a`)

### Méthode
- `data.eyebrow` ← `homePage.methodeEyebrow`
- `data.title` ← `homePage.methodeTitleBefore/Italic/After`
- `data.sub` ← `homePage.methodeSubtitle` (déjà wiré)
- `data.steps` ← Sanity `methodeSteps` (methodStep[]) avec mapping fields enrichis (tag, titleItalic, headlineBefore/Italic/After, livrablesItems)

### Moments
- `data.eyebrow` ← `homePage.momentsEyebrow`
- `data.title` ← `homePage.momentsTitleBefore/Italic/After`
- `data.sub` ← `homePage.momentsSubtitle` (déjà wiré)
- `data.outroCta` ← `homePage.momentsPhraseSortie` (déjà wiré)
- `data.items` ← Sanity `momentsItems` refs growthMoment (mapping `title`, `description`, `number` derived from `order`)

### Offres
- `data.eyebrow` ← `homePage.offresEyebrow`
- `data.title` ← `homePage.offresTitleBefore/Italic/After`
- `data.sub` ← `homePage.offresSubtitle` (déjà wiré)
- `data.cards` ← Sanity `offresCards` (offerCard[]) avec mapping enrichi (number, tag, title, titleItalic, promesse→promise, glyph, livrables, duration, slug→href)

### Hero
- Wiring Phase 2 préservé, pas d'eyebrow/titre éclaté/cards à ajouter Phase 4 (le hero a sa propre logique de COPY interne)

### Études de cas (Cases)
- `data.eyebrow` ← `homePage.etudesEyebrow`
- `data.title` ← `homePage.etudesTitleBefore/Italic/After`
- `data.sub` ← `homePage.etudesSubtitle` (déjà wiré)
- `data.ctaLabel` ← `homePage.etudesCtaLabel` (déjà wiré)
- `data.ctaHref` ← `homePage.etudesUrl` (déjà wiré)
- `data.cases` ← Sanity `etudesFeatured` refs caseStudy (mapping `slug`→href, `title`, `shortTag`→tag, `shortSubtitle`→sub, `homeMetrics`→metrics, `homeLocation`→location, `metadata.year`→year, `homeBgVariant`→bgVariant)

### Témoignages
- `data.eyebrow` ← `homePage.temoignagesEyebrow`
- `data.title` ← `homePage.temoignagesTitleBefore/Italic/After`
- `data.items` ← Sanity `temoignagesFeatured` refs testimonial (mapping `quoteShort`→quote, `author.name`→author, `author.role`→role)

### Journal Preview
- `data.eyebrow` ← `homePage.journalEyebrow`
- `data.title` ← `homePage.journalTitleBefore/Italic/After`
- `data.sub` ← `homePage.journalSubtitle`
- `data.cta` ← `homePage.journalCtaLabel`
- `data.ctaHref` ← `homePage.journalCtaUrl`
- `data.articles` ← Sanity `journalArticles` refs article (mapping `category`, `title`, `excerpt`, `readingTime`→readTime + " min", `publishedAt`→date FR, `slug`→href)

### Manifesto
SKIPPED (`MANIFESTO_NOT_FOUND` confirmé Phase 3, composant absent du codebase).

## Cas particuliers

- **Pas de Portable Text** : la Phase 3 a utilisé 3 strings séparés (`titleBefore`, `titleItalic`, `titleAfter`) plutôt que du Portable Text array of block, donc pas besoin de `@portabletext/react`. Mapping direct vers `{ before, italic, after }`.
- **Mapping `value: number`** : le fallback `homeChiffres.stats[].value` est `number`, le schéma Sanity `statItem.value` est `string`. Cast côté page.tsx via `parseInt(s, 10)` ou similaire.
- **Mapping `number` derived from `order`** : pour `growthMoment` et autres, `String(order).padStart(2, "0")`.
- **Types trop stricts** : si une interface composant utilise `typeof homeXxx.cards` (readonly tuple), la relâcher en `Array<{...partagé...}>` standard.

## Critère de succès

- 12+ composants reçoivent eyebrow + titre éclaté Sanity en plus de leur fallback.
- Au moins 4 composants (Offres, Méthode, Moments, Cases) reçoivent leurs arrays mappés depuis Sanity avec le pattern `data.cards = sanityCards ?? fallback.cards`.
- Build website OK, types stricts OK.
- 36+ occurrences `?? home` dans `src/components/` préservées.
- Rendu visuel inchangé (composants utilisent fallback tant qu'aucun document Sanity n'est créé).
