# Inventaire Sanity exhaustif home Paradeyes

Date : 2026-04-29 02:53 GMT+2
Tags rollback : `v0.pre-sanity-industrialisation-website` (paradeyes-website), `v0.pre-sanity-industrialisation-dashboard` (paradeyes-dashboard)

## Architecture confirmée

### Repos
- **paradeyes-website** : `/Users/basilidegonot/Developer/paradeyes-website` (read-only Sanity)
- **paradeyes-dashboard** : `/Users/basilidegonot/Developer/paradeyes-dashboard` (Studio + schémas)

### Sanity Cloud
- projectId : `tw2dddh1`
- dataset : `production`
- i18n : `internationalizedArrayString` + `internationalizedArrayText` (plugin déjà installé)

## Verdict critique

**L'infrastructure Sanity est DÉJÀ très complète côté Dashboard.** Tous les schémas critiques existent et sont i18n-ready :

### Singletons existants
| Schéma | Couverture |
|---|---|
| `homePage` | 10 sections (hero, problemes, offres, chiffres, methode, moments, temoignages, etudes, faq, ctaFinal) — 566 lignes |
| `siteSettings` | header, footer, baseline, social links, IRIS bar — 381 lignes |
| `seo` | SEO globaux |
| `contact` | email, social, phone, address |
| `agencePage`, `journalPage`, `realisationsPage`, `contactPage` | pages dédiées |
| `comingSoon` | landing pré-launch |

### Collections existantes
| Schéma | Description |
|---|---|
| `caseStudy` | Études de cas (401 lignes, riche) |
| `article` | Articles Journal (340 lignes) |
| `testimonial` | Témoignages (133 lignes) |
| `faqItem` | Questions FAQ (114 lignes) |
| `growthMoment` | Moments de croissance (139 lignes) |
| `legalPage` | Pages légales |
| `servicePage` | Pages services |

### Objects existants
| Object | Usage |
|---|---|
| `offerCard` | Card offre (62 lignes) |
| `methodStep` | Étape méthode (43 lignes) |
| `statItem` | KPI (60 lignes) |
| `heroVisual` | Hero image |
| `seoMetadata` | SEO sub-schema |

## Gap analysis : query GROQ website ↔ schémas Dashboard

**LE GAP RÉEL** : la query `homePageQuery` côté website (`src/lib/sanity.queries.ts`) ne fetch qu'**une fraction des champs disponibles** côté Dashboard.

### Champs Dashboard NON fetchés actuellement par la query

#### Hero
- `heroBadge` (badge au-dessus du titre)
- `heroTitle` (titre principal)
- `heroSubtitle` (sous-titre)
- `heroCtaPrimary`, `heroCtaSecondary` (labels CTAs)
- `heroSignatureMarque` (signature marque hero)
- `heroIntroIris` (intro bloc IRIS)
- `heroTrustBadges[]` (3 badges de confiance)

> Note : `heroBadgePositionnement`, `heroPhraseAccroche`, `heroPlaceholderIris`, `heroBadges` SONT déjà fetchés (champs hérités d'avant migration).

#### Problemes
- `problemesTitle`, `problemesSubtitle`
- `problemesItems[]` (3 à 6 problèmes)
- `problemesTransition`
- `problemesDouleurs[]`

#### Offres
- `offresTitle`, `offresSubtitle`
- `offresCards[]` (5 cards via offerCard object)
- `offresCtaLabel`

#### Chiffres
- `chiffresTitle`, `chiffresSubtitle`
- `chiffresItems[]` (3 stats via statItem)
- `chiffresTransition`

#### Methode
- `methodeTitle`, `methodeSubtitle`
- `methodeSteps[]` (4 étapes via methodStep)

#### Moments
- `momentsTitle`, `momentsSubtitle`
- `momentsPhraseSortie`, `momentsBandeauSeo`, `momentsTransition`
- `momentsItems[] -> growthMoment` (4 références)

#### Temoignages
- `temoignagesTitle`, `temoignagesSubtitle`
- `temoignagesFeatured[] -> testimonial` (3 à 8 références)

#### Etudes
- `etudesTitle`, `etudesSubtitle`
- `etudesFeatured[] -> caseStudy` (1 à 6 références)
- `etudesCtaLabel`, `etudesUrl`

#### FAQ
- `faqTitle`, `faqSubtitle`
- `faqCtaFinal`

#### CTA Final
- `ctaFinalTitle`, `ctaFinalSubtitle`
- `ctaFinalIris{title, description, prefillContext}`
- `ctaFinalCalendly{title, description, embedUrl}`
- `ctaFinalTrustSignal`

### Schémas inexistants à créer
**Aucun.** Tous les schémas pour la home actuelle existent côté Dashboard.

**Note exception** : la nouvelle section MarqueeTags (Bug récent) n'a pas de schéma dédié. Elle est actuellement hardcodée dans `src/components/sections/MarqueeTags.tsx`. À créer ultérieurement si Basilide veut éditer ces tags depuis le Studio.

## Mapping section par section : home-fallback ↔ Sanity ↔ Composant

### 1. Hero
- **Composant** : `src/components/sections/HeroSection.tsx`
- **Page wiring** : `src/app/[locale]/page.tsx` ligne 75 (props passés depuis homeData)
- **Status** : ✅ Câblé partiellement (heroBadgePositionnement, heroPhraseAccroche, heroSubtitle, heroPlaceholderIris, heroBadges)
- **Manque câblage** : heroBadge, heroTitle, heroSubtitle (officiel), heroCtaPrimary/Secondary, heroSignatureMarque, heroIntroIris, heroTrustBadges
- **Fallback** : strings hardcodées dans HeroSection.tsx

### 2. Manifesto / Strip marquee
- **Note** : Absente de la home actuelle (commentaire fichier home-fallback "Manifesto section removed entirely"). Strip marquee = `MARQUEE_ITEMS` hardcodé dans Footer.tsx ("On comprend.", "On conçoit.", "On construit.").
- **Status** : Pas de Sanity, hardcoded.

### 3. Offres
- **Composant** : `src/components/sections/Offres.tsx` + `offres/OffreCard.tsx`
- **Source actuelle** : `homeOffres` from `home-fallback.ts` (uniquement)
- **Status** : ❌ NON câblé Sanity. Schéma Dashboard `offresTitle`, `offresSubtitle`, `offresCards[5]`, `offresCtaLabel` existe mais query ne fetch pas.

### 4. Moments
- **Composant** : `src/components/sections/Moments.tsx`
- **Source actuelle** : `homeMoments` fallback
- **Status** : ❌ NON câblé. Schéma `momentsTitle/Subtitle/Items[->growthMoment]` existe.

### 5. Chiffres
- **Composant** : `src/components/sections/Chiffres.tsx`
- **Source actuelle** : `homeChiffres` fallback
- **Status** : ❌ NON câblé. Schéma `chiffresTitle/Subtitle/Items[statItem]` existe.

### 6. Méthode
- **Composant** : `src/components/sections/Methode.tsx`
- **Source actuelle** : `homeMethode` fallback
- **Status** : ❌ NON câblé. Schéma `methodeTitle/Subtitle/Steps[methodStep]` existe.

### 7. Études de cas
- **Composant** : `src/components/sections/Cases.tsx` + `cases/CaseCard.tsx`
- **Source actuelle** : `homeCases` fallback
- **Status** : ❌ NON câblé. Schéma `etudesTitle/Subtitle/Featured[->caseStudy]/CtaLabel/Url` existe.

### 8. Témoignages
- **Composant** : `src/components/sections/Testimonials.tsx` + sub-components
- **Source actuelle** : `homeTestimonials` fallback (7 entries)
- **Status** : ❌ NON câblé. Schéma `temoignagesTitle/Subtitle/Featured[->testimonial]` existe.

### 9. Journal preview
- **Composant** : `src/components/sections/JournalPreview.tsx`
- **Source actuelle** : `homeJournal` fallback
- **Status** : ❌ NON câblé. Schéma collection `article` existe + `journalHighlight` partiellement fetché.

### 10. Marquee tags
- **Composant** : `src/components/sections/MarqueeTags.tsx`
- **Status** : Hardcoded total. Pas de schéma Sanity dédié.

### 11. FAQ
- **Composant** : `src/components/sections/Faq.tsx`
- **Source actuelle** : `homeFaq` fallback (8 items)
- **Status** : ❌ NON câblé. Schéma `faqTitle/Subtitle/CtaFinal` + collection `faqItem` existent.

### 12. Pre-footer CTA
- **Composant** : `src/components/nav/PreFooterCTA.tsx`
- **Source actuelle** : `homePreFooter` fallback + variants hardcodées (offre, contact)
- **Status** : ❌ NON câblé. Schéma `ctaFinalTitle/Subtitle/IRIS/Calendly/TrustSignal` existe.

### 13. Footer
- **Composant** : `src/components/nav/Footer.tsx`
- **Source actuelle** : `homeFooter.tagline` fallback + chaînes hardcodées (ville, hours, social URLs, etc)
- **Status** : ❌ NON câblé. Schéma `siteSettings` complet (baseline, footerBaseline, footerMentions, footerAddress, footerMiniContact, footerSocialLinks) existe.

### 14. Header
- **Composant** : `src/components/nav/Header.tsx`
- **Source actuelle** : Hardcoded (nav items, CTA label)
- **Status** : ❌ NON câblé. Schéma `siteSettings.headerLinks/headerCtaLabel/headerCtaUrl` existe.

## Conclusion gap analysis

**Tous les schémas existent. Le travail réel = wiring côté website.**

Volume estimé du wiring complet :
- Update `homePageQuery` (étendre avec ~50 nouveaux fields)
- Update `HomePageData` type (étendre interface)
- Créer `siteSettingsQuery` complète (~30 fields)
- Créer queries pour références (faqItem, growthMoment, testimonial, caseStudy, article)
- Modifier ~14 composants pour consommer Sanity avec fallback
- Tests cross-repos

**Estimation : 4-6h de travail focused, avec tests interactifs requis.**
