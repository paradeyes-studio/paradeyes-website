# SANITY PHASE 5 — Relax Plan + mapping fin

Date : 2026-04-29

## Stratégie

Pour chaque composant utilisant un type strict `typeof homeXxx.cards/items/steps`, relâcher l'interface en `ReadonlyArray<ItemType>` où `ItemType` est exporté. Le fallback `home-fallback.ts` (tuples `as const`) reste **inchangé** (les tuples readonly sont assignables à `ReadonlyArray<T>` par variance covariante).

Tous les mappers Sanity → Item sont centralisés dans `src/lib/sanity-mappers.ts`.

## Composants à relâcher

### 1. Offres (`OffresData.cards`)
- Tuple actuel : `typeof homeOffres.cards` (readonly de 5 cards typées strictement)
- Type relâché : `ReadonlyArray<OffreCardItem>` exporté depuis `Offres.tsx`
- Item shape : `{ number, tag, title, titleItalic, promise, glyph, livrables, duration, href }`
- Mapper : `mapSanityOfferCardsToItems(cards, locale)`

### 2. Méthode (`MethodeData.steps`)
- Type relâché : `ReadonlyArray<MethodeStepItem>`
- Item shape : `{ number, tag, title, titleItalic, headline:{before,italic,after}, description, livrables: ReadonlyArray<{label, duration}> }`
- Mapper : `mapSanityMethodeStepsToItems(steps, locale)`

### 3. Moments (`MomentsData.items`)
- Type relâché : `ReadonlyArray<MomentItemShape>`
- Item shape : `{ number, title, description }`
- Mapper : `mapSanityMomentsToItems(items, locale)` — derive `number` from `order`

### 4. Chiffres (`ChiffresData.stats`)
- Type relâché : `ReadonlyArray<ChiffreStatItem>`
- Item shape : `{ number, label, value: number, suffix?, prefix?, decimals?, caption }`
- Mapper : `mapSanityStatsToItems(items, locale)` — cast Sanity `value: string` → `number` via parseFloat
- Note : `chiffresClients` + `chiffresClientsLabel` déjà wirés Phase 4

### 5. Cases (`CasesData.cases`)
- Type relâché : `ReadonlyArray<CaseCardItem>` (déjà défini comme interne)
- Item shape : `{ number, total, tag, title, sub, metrics, year, location, bgVariant, href }`
- Mapper : `mapSanityCaseStudiesToItems(refs, locale)` — derive number/total from index/length

### 6. Testimonials (`TestimonialsData.items`)
- Type relâché : `ReadonlyArray<RawTestimonialItem>` (déjà `RawItem` interne)
- Item shape : `{ quote, author, role }`
- Mapper : `mapSanityTestimonialsToItems(refs, locale)` — quote = quoteShort, role = `${authorRole}, ${companyName}`

### 7. JournalPreview (`JournalPreviewData.articles`)
- Type relâché : `ReadonlyArray<JournalArticleItem>`
- Item shape : `{ category, title, excerpt, readTime, date, href }`
- Mapper : `mapSanityJournalArticlesToItems(refs, locale)` — readingTime → "X min", publishedAt → date FR

### 8. FAQ (`FaqData.items`)
- Type relâché : `ReadonlyArray<FaqItemShape>`
- Item shape : `{ q, a }`
- Mapper : `mapSanityFaqItemsToItems(refs, locale)`

## Risque cascade TypeScript

Le risque principal : les composants utilisent `typeof homeXxx.cards` à la fois dans l'interface ET potentiellement ailleurs (sub-components, hooks). En général un seul `import` du tuple existe par composant. Le relax est local.

**Mitigation** : les fallbacks `home-fallback.ts` ne sont PAS modifiés. Les types tuples y restent intacts. Seule l'interface du composant est relâchée pour accepter une union plus large.

## Critère de succès

- 8 composants ont leurs arrays Sanity-friendly typés
- 8 mappers centralisés dans `src/lib/sanity-mappers.ts`
- `page.tsx` consomme les mappers avec fallback chain `sanityArray?.length ? sanityArray.map(mapper) : fallback`
- Build OK, types stricts OK, lint OK
- Rendu visuel inchangé (composants fallback tant qu'aucun document Sanity rempli)
