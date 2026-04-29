# Rapport mission Sanity Phase 2, wiring autonome

Date d'exécution, 2026-04-29 entre 10h08 et 11h35 GMT+2.
Durée totale, environ 1h27.
Mode, autonome strict (Basilide absent).

## Tag rollback global

Confirmé poussé sur `paradeyes-website` et `paradeyes-dashboard`.

- `v0.pre-sanity-wiring-phase2` (paradeyes-website) — point de retour sur le commit `f66932d`
- `v0.pre-marqueetags-schema` (paradeyes-dashboard) — point de retour avant ajout du schéma marqueeTagsSection

## Pattern retenu

Centralisation du fetch Sanity dans `src/app/[locale]/page.tsx` (déjà en place pour le Hero), extension à toutes les sections via une prop `data` typée et un fallback systématique sur `home-fallback.ts`.

```tsx
// page.tsx
const homeData = await getHomeData();
<Section data={{ sub: resolveLocalized(homeData?.xxxSubtitle, locale) }} />

// Section.tsx
export function Section({ data = {} }: { data?: SectionData } = {}) {
  const sub = data.sub ?? homeXxx.sub;
  // ...
}
```

Trois fetches centralisés en parallèle via `Promise.all` au lieu d'un par composant, plus efficace et compatible avec l'architecture App Router existante.

- `homePageQuery` pour le contenu de la home
- `siteSettingsQuery` pour `footerBaseline`, `headerCtaUrl`
- `contactQuery` pour `email`

## Statut composant par composant

| # | Composant | Statut | Pattern | Commit | Tag backup |
|---|-----------|--------|---------|--------|------------|
| 1 | Hero | OK (déjà wiré pré-mission) | Cas A, props extraites de `homePage` | `f66932d` (mission précédente) | `v0.pre-sanity-wiring-phase2` |
| 2 | Offres | OK | Cas A, prop `data` + fallback | `f120cc5` | `v0.pre-wiring-offres` |
| 3 | Chiffres | OK | Cas A, prop `data` + fallback | `81a2b27` | `v0.pre-wiring-chiffres` |
| 4 | Méthode | OK | Cas A, prop `data` + fallback | `bc10e0d` | `v0.pre-wiring-methode` |
| 5 | Moments de croissance | OK | Cas A, prop `data` + fallback | `3949fac` | `v0.pre-wiring-moments` |
| 6 | Études de cas | OK | Cas A, prop `data` + fallback (sub, CTA label, CTA href) | `badd4f1` | `v0.pre-wiring-cases` |
| 7 | Témoignages | OK (contrat de prop) | Cas A, prop `data` + fallback. Pas de field Sanity passé tant que le mapping items structuré n'est pas défini côté Studio. | `7734fb7` | `v0.pre-wiring-testimonials` |
| 8 | Journal preview | OK (contrat de prop) | Cas A, prop `data` + fallback. Aucun field journalHighlight peuplé côté Sanity. | `6b2b774` | `v0.pre-wiring-journal` |
| 9 | FAQ | OK | Cas A, prop `data` + fallback (sub) | `b883691` | `v0.pre-wiring-faq` |
| 10 | PreFooter CTA | OK | Cas A, prop `data` traversée par le Footer (variant default) | `a00e1ab` | `v0.pre-wiring-prefooter` |
| 11 | Footer | OK | Cas A, prop `data` (tagline, email) depuis siteSettings + contact | `44f1e34` | `v0.pre-wiring-footer` |
| 12 | Header | OK | Cas A, prop `data` (CTA href) depuis siteSettings | `43f5468` | `v0.pre-wiring-header` |
| 13 | Manifesto | REPORTED | Composant inexistant dans le repo. Décision Notion documentée dans `home-fallback.ts` ligne 7 ("Manifesto section removed entirely (not in Notion)"). Aucun wiring possible ni nécessaire. | n/a | n/a |
| 14 | MarqueeTags | OK | Schéma `marqueeTagsSection` créé côté Dashboard (commit `0562a42`), GROQ étendue côté website, composant wiré avec fallback `FALLBACK_ROWS`. | `d745248` (website) + `0562a42` (dashboard) | `v0.pre-wiring-marqueetags` (website) + `v0.pre-marqueetags-schema` (dashboard) |

13 composants wirés, 1 reporté avec justification factuelle.

## Pattern par composant, justification

Le mode "Cas C" (Portable Text avec mot italique) prévu dans le brief n'a pas été déclenché car aucun des champs Sanity actuellement peuplés n'est en Portable Text. Les titres avec italique signature (ex `homeOffres.headline.italic`) restent gérés par `SectionHeadline` côté front et par les fallbacks structurés dans `home-fallback.ts`. Quand le Studio Dashboard exposera un champ Portable Text dédié pour ces titres, l'évolution se fera côté composant en ajoutant un parser `@portabletext/react`.

Le mode "Cas B" (split server/client wrapper) n'a pas été déclenché non plus car le fetch est centralisé dans `page.tsx` (qui est server par nature App Router), évitant la duplication d'un wrapper par section.

## Tests automatisés Phase 3

| Test | Résultat |
|------|----------|
| Build production complet (`npm run build`) | OK, 30+ routes statiques générées sans erreur |
| Fallback offline (dataset Sanity inexistant) | OK, build passe, fallbacks `home-fallback.ts` consommés sans crash |
| Présence des fallbacks dans les composants wirés | 36 occurrences `?? home` dans 8 fichiers + patterns équivalents (`?? "..."`, `?? FALLBACK_ROWS`, `?? DEFAULT_NAV_ITEMS`) dans Hero, Header, Footer, PreFooterCTA, MarqueeTags |
| Build du Dashboard (`npm run build`) | OK, schéma `marqueeTagsSection` enregistré sans erreur |
| TypeScript (`npx tsc --noEmit`) | 0 erreur sur tous les commits |
| Lint (`npm run lint`) | 0 erreur sur tous les commits |

## État du repo Dashboard

Modifié pour le composant 14, fichiers,

- `paradeyes-dashboard/src/sanity/schemas/objects/marqueeTagsSection.ts` (nouveau, 70 lignes)
- `paradeyes-dashboard/src/sanity/schemas/index.ts` (import + ajout dans `types`)
- `paradeyes-dashboard/src/sanity/schemas/singletons/homePage.ts` (ajout du group `marqueeTags` et du field `marqueeTagsSection`)

Commit `0562a42` poussé sur `main`. Build Vercel à vérifier dans la session de validation.

## Composants désormais éditables depuis le Studio Sanity

Champs effectivement câblés et mappables aujourd'hui (les autres sont dans le contrat de prop, prêts à recevoir des fields Sanity quand le schéma s'étendra),

- Hero, `heroBadgePositionnement`, `heroPhraseAccroche`, `heroSubtitle`, `heroPlaceholderIris`, `heroBadges`
- Offres, `offresSubtitle`
- Chiffres, `chiffresSubtitle`
- Méthode, `methodeSubtitle`
- Moments, `momentsSubtitle`, `momentsPhraseSortie`
- Études de cas, `etudesSubtitle`, `etudesCtaLabel`, `etudesUrl`
- FAQ, `faqSubtitle`
- PreFooter CTA, `ctaFinalSubtitle` (mappé sur `description`)
- Footer, `siteSettings.footerBaseline` (mappé sur `tagline`), `contact.email`
- Header, `siteSettings.headerCtaUrl` (mappé sur `ctaHref`)
- MarqueeTags, `homePage.marqueeTagsSection` (3 lignes éditables avec mot accentué par ligne)

## Composants reportés avec justification

| Composant | Raison |
|-----------|--------|
| Manifesto | N'existe pas dans le repo (jamais implémenté). Décision Notion explicite documentée dans `home-fallback.ts`. Aucune action côté Sanity ni site nécessaire. |

## Limitations observées et constat de gap schéma Studio

Le schéma actuel du `homePage` Dashboard expose des champs majoritairement à plat (titres concaténés en un seul string, cards avec `content` mergeant titre+promesse). Cette structure ne correspond pas à la granularité visuelle du site (titres avec mot italique splité en `before`/`italic`/`after`, cards avec champs séparés `tag`/`title`/`titleItalic`/`promise`/`glyph`/`livrables`/`duration`/`href`).

Conséquence, la majorité des champs structurés (cartes Offres, étapes Méthode, items Moments, témoignages, articles Journal) restent sur le fallback `home-fallback.ts` même quand des données existent côté Sanity, car le mapping shape-to-shape est manquant. Les contrats de prop côté composant sont en revanche prêts à recevoir ces données dès que le schéma Dashboard les exposera dans la bonne forme.

Recommandation, prévoir une mission Phase 3 pour aligner la structure du schéma Dashboard sur celle de `home-fallback.ts` (split des titres en parties before/italic/after, décomposition des cartes Offres, etc).

## Recommandations pour la session de validation matinale Basilide

1. Tests fonctionnels Studio à effectuer
   - Éditer `chiffresSubtitle` dans le Studio (production) et vérifier que la home affiche la nouvelle valeur après revalidation CDN
   - Créer une entrée `marqueeTagsSection` dans le Studio pour tester le rendu des 3 lignes avec mot accentué
   - Éditer `siteSettings.headerCtaUrl` et vérifier que le bouton CTA du Header pointe sur la nouvelle URL
2. Sections à vérifier visuellement en priorité
   - Hero (déjà wiré, vérifier que rien n'a régressé)
   - Footer (tagline et email, fallback vs Sanity)
   - MarqueeTags (rendu avec ou sans données Sanity)
3. Actions de correction éventuelles
   - Si le Dashboard ne montre pas le nouveau champ `marqueeTagsSection` dans le group "Bandeau de tags", déclencher un re-deploy Vercel du Dashboard pour publier la build avec le nouveau schéma
   - Si un composant rendu en prod montre une régression visuelle, rollback ciblé via le tag de backup spécifique listé dans le tableau

## Étape suivante recommandée

Mission Phase 3, alignement du schéma Dashboard sur la structure de `home-fallback.ts`, pour permettre le câblage complet (titres avec italique, cards Offres, étapes Méthode, items Moments). Cela libérerait l'éditabilité de 90% des contenus textuels de la home.

En parallèle, ajouter dans le Dashboard un champ `marqueeTagsSection` peuplé par défaut avec les valeurs `FALLBACK_ROWS` actuelles pour offrir une expérience d'édition immédiate aux contributeurs.
