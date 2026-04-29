# SANITY PHASE 3 — Field Audit (Chantier 0)

Date d'audit : 2026-04-29
Référence : `home-fallback.ts` (paradeyes-website/src/content/home-fallback.ts, 586 lignes)
Schémas inspectés : `paradeyes-dashboard/src/sanity/schemas/**/*.ts` (29 fichiers)

## Méthode

Diff exhaustif champ par champ entre la shape attendue par les composants website (home-fallback.ts) et la shape exposée par les schémas Sanity côté Dashboard. Tout champ marqué `MISSING` est à ajouter en additif dans la Phase 3. Aucun champ existant ne doit être supprimé (règle additive absolue).

Légende :
- ✅ présent et aligné
- ➕ MISSING (à ajouter en additif)
- 🔁 présent mais nommé différemment (mapping côté website)
- 📦 dérivable (pas besoin d'ajout schema, calculé côté front)

---

## Section 1 — OFFRES

### Composant : `Offres.tsx` (consomme `homeOffres`)

#### Niveau section (`homePage.offresSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Nos offres") | absent | ➕ MISSING `offresEyebrow` |
| `headline.before` ("Cinq leviers pour ") | absent (offresTitle est plat) | ➕ MISSING `offresTitleBefore` |
| `headline.italic` ("transformer") | absent | ➕ MISSING `offresTitleItalic` |
| `headline.after` (" votre business.") | absent | ➕ MISSING `offresTitleAfter` |
| `sub` | `offresSubtitle` | ✅ |
| `cards[5]` | `offresCards[5]` (offerCard) | ✅ structure OK |

#### Card individuelle (`offerCard` object)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `number` ("01") | absent | ➕ MISSING `offerCard.number` |
| `tag` ("Branding") | absent | ➕ MISSING `offerCard.tag` |
| `title` | `offerCard.title` | ✅ |
| `titleItalic` ("marque") | absent | ➕ MISSING `offerCard.titleItalic` |
| `promise` | `offerCard.promesse` | 🔁 alias mapping |
| `glyph` ("Æ") | absent | ➕ MISSING `offerCard.glyph` |
| `livrables[3]` | absent | ➕ MISSING `offerCard.livrables` (array string) |
| `duration` ("03 livrables · 6-10 sem.") | absent | ➕ MISSING `offerCard.duration` |
| `href` | dérivé de `slug.current` (ref servicePage) | 📦 |

---

## Section 2 — MOMENTS DE CROISSANCE

### Composant : `Moments.tsx` (consomme `homeMoments`)

#### Niveau section (`homePage.momentsSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` | absent | ➕ MISSING `momentsEyebrow` |
| `headline.before` | absent | ➕ MISSING `momentsTitleBefore` |
| `headline.italic` ("moment") | absent | ➕ MISSING `momentsTitleItalic` |
| `headline.after` | absent | ➕ MISSING `momentsTitleAfter` |
| `sub` | `momentsSubtitle` | ✅ |
| `items[4]` | `momentsItems[4]` ref growthMoment | ✅ |
| `outroCta` | `momentsPhraseSortie` (existe) | 🔁 alias mapping |

#### Item individuel (document `growthMoment`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `number` ("01") | dérivable de `order` | 📦 |
| `title` | `growthMoment.title` | ✅ |
| `description` | `growthMoment.description` | ✅ |

---

## Section 3 — CHIFFRES

### Composant : `Chiffres.tsx` (consomme `homeChiffres`)

#### Niveau section (`homePage.chiffresSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Ils nous font confiance") | absent | ➕ MISSING `chiffresEyebrow` |
| `headline.before` | absent | ➕ MISSING `chiffresTitleBefore` |
| `headline.italic` ("construit") | absent | ➕ MISSING `chiffresTitleItalic` |
| `headline.after` | absent | ➕ MISSING `chiffresTitleAfter` |
| `sub` | `chiffresSubtitle` | ✅ |
| `stats[3-6]` | `chiffresItems[3]` statItem | ✅ (length(3) imposée vs 6 dans fallback : décalage à harmoniser, le fallback contient 6 mais seulement 3 sont affichés) |
| `clientsLabel` | absent | ➕ MISSING `chiffresClientsLabel` |
| `clients[8]` | absent | ➕ MISSING `chiffresClients` (array string) |

#### Item individuel (object `statItem`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `number` ("01") | dérivable de `order` | 📦 |
| `label` | `statItem.label` | ✅ |
| `value` (numérique) | `statItem.value` (string) | 🔁 mapping cast |
| `suffix` | `statItem.suffix` | ✅ |
| `caption` | `statItem.caption` | ✅ |

---

## Section 4 — METHODE

### Composant : `Methode.tsx` (consomme `homeMethode`)

#### Niveau section (`homePage.methodeSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Notre méthode") | absent | ➕ MISSING `methodeEyebrow` |
| `headline.before` | absent | ➕ MISSING `methodeTitleBefore` |
| `headline.italic` ("méthode") | absent | ➕ MISSING `methodeTitleItalic` |
| `headline.after` | absent | ➕ MISSING `methodeTitleAfter` |
| `sub` | `methodeSubtitle` | ✅ |
| `timelineLabel` | absent | ➕ MISSING `methodeTimelineLabel` |
| `timeline[4]` | absent | ➕ MISSING `methodeTimeline` (array {label, duration, flex}) |
| `steps[4]` | `methodeSteps[4]` methodStep | ✅ structure OK |

#### Step individuel (object `methodStep`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `number` | `methodStep.number` | ✅ |
| `tag` ("Étape 01") | absent | ➕ MISSING `methodStep.tag` |
| `title` | `methodStep.title` | ✅ |
| `titleItalic` | absent | ➕ MISSING `methodStep.titleItalic` |
| `headline.before` | absent | ➕ MISSING `methodStep.headlineBefore` |
| `headline.italic` | absent | ➕ MISSING `methodStep.headlineItalic` |
| `headline.after` | absent | ➕ MISSING `methodStep.headlineAfter` |
| `description` | `methodStep.paragraph` | 🔁 alias mapping |
| `livrables[3]:{label,duration}` | absent | ➕ MISSING `methodStep.livrablesItems` (array object) |

---

## Section 5 — ETUDES DE CAS (Cases)

### Composant : `Cases.tsx` (consomme `homeCases`)

#### Niveau section (`homePage.etudesSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Réalisations") | absent | ➕ MISSING `etudesEyebrow` |
| `headline.before` | absent | ➕ MISSING `etudesTitleBefore` |
| `headline.italic` ("résultats") | absent | ➕ MISSING `etudesTitleItalic` |
| `headline.after` | absent | ➕ MISSING `etudesTitleAfter` |
| `sub` | `etudesSubtitle` | ✅ |
| `cases[4]` | `etudesFeatured[1-6]` ref caseStudy | ✅ |

#### Case individuel (document `caseStudy`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `number` ("01") | dérivable de l'index | 📦 |
| `total` ("04") | dérivable de l'array length | 📦 |
| `tag` ("Branding · Film") | absent (existe `metadata.scope[]` mais format différent) | ➕ MISSING `caseStudy.shortTag` |
| `title` | `caseStudy.title` | ✅ |
| `sub` (subtitle court pour card home) | absent | ➕ MISSING `caseStudy.shortSubtitle` |
| `metrics[3]:{value,label}` | absent (existe `chapitreResultats.stats` mais format différent et imposé length(3)) | ➕ MISSING `caseStudy.homeMetrics` (array object {value, label}) ou ré-utiliser chapitreResultats.stats avec mapping |
| `year` | `caseStudy.metadata.year` | 🔁 mapping |
| `location` ("Cannes") | absent (existe `client.sector` mais sémantique différente) | ➕ MISSING `caseStudy.homeLocation` |
| `bgVariant` (1-4) | absent | ➕ MISSING `caseStudy.homeBgVariant` |
| `href` | dérivé de `slug.current` | 📦 |

---

## Section 6 — TEMOIGNAGES

### Composant : `Testimonials.tsx` (consomme `homeTestimonials`)

#### Niveau section (`homePage.temoignagesSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Ils en parlent") | absent | ➕ MISSING `temoignagesEyebrow` |
| `headline.before` | absent | ➕ MISSING `temoignagesTitleBefore` |
| `headline.italic` ("mieux") | absent | ➕ MISSING `temoignagesTitleItalic` |
| `headline.after` | absent | ➕ MISSING `temoignagesTitleAfter` |
| `items[7]` | `temoignagesFeatured[3-8]` ref testimonial | ✅ |

#### Item individuel (document `testimonial`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `quote` | `testimonial.quoteShort` | 🔁 alias mapping |
| `author` | `testimonial.author.name` | 🔁 mapping |
| `role` | `testimonial.author.role` (déjà i18n) | 🔁 mapping (concat avec company.name si nécessaire) |

Champs Sanity supplémentaires non utilisés par fallback : `quoteLong`, `author.photo`, `company.{name,logo}`, `featured`, `publishedAt`. Tous OK pour future utilisation, pas de suppression nécessaire.

GROQ mentionne `kpiValue`, `kpiLabel`, `isVerified`, `quoteHighlight` qui n'existent pas dans le schéma testimonial. À considérer comme additifs **optionnels** (le fallback ne les utilise pas, donc pas critique).

---

## Section 7 — JOURNAL PREVIEW

### Composant : `JournalPreview.tsx` (consomme `homeJournal`)

#### Niveau section (`homePage.journalSection`) — TOTALEMENT ABSENTE DU SCHÉMA

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Journal") | absent | ➕ MISSING `journalEyebrow` |
| `headline.before` | absent | ➕ MISSING `journalTitleBefore` |
| `headline.italic` ("convictions") | absent | ➕ MISSING `journalTitleItalic` |
| `headline.after` | absent | ➕ MISSING `journalTitleAfter` |
| `sub` | absent | ➕ MISSING `journalSubtitle` |
| `cta` ("Voir tous les articles") | absent | ➕ MISSING `journalCtaLabel` |
| `ctaHref` ("/journal") | absent | ➕ MISSING `journalCtaUrl` |
| `articles[3]` | absent | ➕ MISSING `journalArticles` (array ref article, length 3) |

#### Article individuel (document `article`)

Le schéma `article` existant couvre largement le fallback :

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `category` | `article.category` (enum) | ✅ |
| `title` | `article.title` | ✅ |
| `excerpt` | `article.excerpt` | ✅ |
| `readTime` | `article.readingTime` (number, à formater " min") | 🔁 mapping |
| `date` ("Avril 2026") | `article.publishedAt` (datetime, à formater FR) | 🔁 mapping |
| `href` | dérivé de `slug.current` (`/journal/<slug>`) | 📦 |

---

## Section 8 — FAQ

### Composant : `Faq.tsx` (consomme `homeFaq`)

#### Niveau section (`homePage.faqSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Questions fréquentes") | absent | ➕ MISSING `faqEyebrow` |
| `headline.before` | absent | ➕ MISSING `faqTitleBefore` |
| `headline.italic` ("fréquentes") | absent | ➕ MISSING `faqTitleItalic` |
| `headline.after` | absent | ➕ MISSING `faqTitleAfter` |
| `sub` | `faqSubtitle` | ✅ |
| `items[8]` | absent (pas de refs vers faqItem dans homePage) | ➕ MISSING `faqItems` (array ref faqItem) |

#### Item individuel (document `faqItem`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `q` | `faqItem.question` | 🔁 mapping |
| `a` | `faqItem.answer` (text simple) | ✅ |

---

## Section 9 — PRE-FOOTER CTA

### Composant : `PreFooterCTA.tsx` (consomme `homePreFooter`)

#### Niveau section (`homePage.ctaFinalSection`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `eyebrow` ("Vous voulez avancer ?") | absent | ➕ MISSING `ctaFinalEyebrow` |
| `headline.before` | absent | ➕ MISSING `ctaFinalTitleBefore` |
| `headline.italic` ("projet") | absent | ➕ MISSING `ctaFinalTitleItalic` |
| `headline.after` | absent | ➕ MISSING `ctaFinalTitleAfter` |
| `sub` | `ctaFinalSubtitle` | ✅ |
| `cta` ("Un appel gratuit de 30 min") | absent (existe ctaFinalCalendly mais structure différente) | ➕ MISSING `ctaFinalCtaLabel` |
| `ctaHref` ("/contact#appel") | absent | ➕ MISSING `ctaFinalCtaUrl` |

Note : la GROQ référence `siteSettings.preFooterDefault{eyebrow,title,description,primaryLabel,secondaryLabel}` mais ce champ n'existe pas dans le schéma `siteSettings`. À considérer comme MISSING optionnel sur `siteSettings` si on veut un fallback global réutilisable.

---

## Section 10 — FOOTER

### Composant : `Footer.tsx` (consomme `homeFooter`)

| Champ fallback | Schéma Sanity actuel | Statut |
|---|---|---|
| `tagline` | `siteSettings.footerBaseline` | ✅ déjà wiré Phase 2 |

---

## Section 11 — MARQUEE TAGS

### Composant : `MarqueeTags.tsx` (fallback interne `FALLBACK_ROWS`)

`marqueeTagsSection` schéma OK (créé Phase 2). Aucun MISSING.

---

## Section 12 — HERO

### Composant : `Hero.tsx` (fallback interne `COPY.fr`)

Le schéma `homePage` Hero est très complet (heroBadge, heroTitle, heroSubtitle, heroCtaPrimary, heroCtaSecondary, heroSignatureMarque, heroIntroIris, heroBadgePositionnement, heroPhraseAccroche, heroPlaceholderIris, heroTrustBadges[3]). Aucun MISSING détecté pour Hero.

---

## Section 13 — HEADER

### Composant : `Header.tsx`

Wiré Phase 2 sur `siteSettings.headerCtaUrl` + `headerLinks` + `headerCtaLabel`. Aucun MISSING détecté.

---

## Section 14 — PROBLEMES

`Problemes.tsx` n'est pas présent dans home-fallback.ts. Le schéma `homePage` couvre déjà problemesTitle, problemesSubtitle, problemesItems, problemesTransition, problemesDouleurs. Pas d'audit fallback nécessaire (composant a son fallback interne).

---

## Récapitulatif quantitatif

| Catégorie | Total |
|---|---|
| Champs fallback audités | ~120 |
| Champs ✅ alignés | ~30 |
| Champs 🔁 mapping (alias) | ~12 |
| Champs 📦 dérivables | ~10 |
| Champs ➕ MISSING à ajouter | **~68** |

## Plan de chantiers Phase 3 (replanifié)

### Chantier 1 — Eyebrows et titres éclatés (before/italic/after) sur 8 sections homePage

Champs additifs au schéma `homePage` (32 champs) :
- offresSection : `offresEyebrow`, `offresTitleBefore`, `offresTitleItalic`, `offresTitleAfter`
- chiffresSection : `chiffresEyebrow`, `chiffresTitleBefore`, `chiffresTitleItalic`, `chiffresTitleAfter`
- methodeSection : `methodeEyebrow`, `methodeTitleBefore`, `methodeTitleItalic`, `methodeTitleAfter`
- momentsSection : `momentsEyebrow`, `momentsTitleBefore`, `momentsTitleItalic`, `momentsTitleAfter`
- temoignagesSection : `temoignagesEyebrow`, `temoignagesTitleBefore`, `temoignagesTitleItalic`, `temoignagesTitleAfter`
- etudesSection : `etudesEyebrow`, `etudesTitleBefore`, `etudesTitleItalic`, `etudesTitleAfter`
- faqSection : `faqEyebrow`, `faqTitleBefore`, `faqTitleItalic`, `faqTitleAfter`
- ctaFinalSection : `ctaFinalEyebrow`, `ctaFinalTitleBefore`, `ctaFinalTitleItalic`, `ctaFinalTitleAfter`

### Chantier 2 — Enrichir `offerCard`

Ajouter 6 champs : `number`, `tag`, `titleItalic`, `glyph`, `livrables`, `duration`.

### Chantier 3 — Enrichir `methodStep` + ajouter timeline section

methodStep : `tag`, `titleItalic`, `headlineBefore`, `headlineItalic`, `headlineAfter`, `livrablesItems` (array {label, duration}).
homePage.methodeSection : `methodeTimelineLabel`, `methodeTimeline` (array {label, duration, flex}).

### Chantier 4 — Enrichir `chiffresSection`

homePage.chiffresSection : `chiffresClientsLabel`, `chiffresClients` (array string).

### Chantier 5 — Enrichir `caseStudy`

caseStudy : `shortTag`, `shortSubtitle`, `homeMetrics` (array {value, label}, length 3), `homeLocation`, `homeBgVariant`.

### Chantier 6 — Créer la section Journal complète sur homePage

homePage : `journalEyebrow`, `journalTitleBefore`, `journalTitleItalic`, `journalTitleAfter`, `journalSubtitle`, `journalCtaLabel`, `journalCtaUrl`, `journalArticles` (array ref article, length 3).

Nouveau group `journal` à ajouter dans `homePage.groups`.

### Chantier 7 — Compléter section FAQ avec refs

homePage.faqSection : `faqItems` (array ref faqItem).

### Chantier 8 — Compléter section CTA Final avec primary CTA

homePage.ctaFinalSection : `ctaFinalCtaLabel`, `ctaFinalCtaUrl`.

### Chantier 9 — Enrichir `growthMoment` (optionnel)

`growthMoment.numberDisplay` (string) si l'on veut découpler de `order`. Sinon mapping côté website.

### Chantier 10 — Enrichir `siteSettings.preFooterDefault` (optionnel)

`siteSettings.preFooterDefault` object {eyebrow, title, description, primaryLabel, secondaryLabel} pour fallback global cross-page. Mentionné dans GROQ siteSettingsQuery mais absent du schéma. Optionnel : la home a déjà `homePage.ctaFinal*`.

### Chantier 11 — `testimonial` enrichissements optionnels

`testimonial.kpiValue`, `kpiLabel`, `isVerified`, `quoteHighlight`. Optionnel : non utilisé par le fallback actuel.

### Chantier 12 — Vérifier `marqueeTagsSection`

OK (Phase 2 existante).

---

## Critère de succès Phase 3

À la fin de la Phase 3, **TOUS les champs fallback ➕ MISSING listés dans cet audit doivent avoir leur équivalent additif côté Sanity**. Le fallback `home-fallback.ts` reste intact, les composants website utilisent le pattern `data?.<champ> ?? fallback.<champ>`. Aucun champ existant côté Sanity n'est supprimé.

Un champ marqué optionnel (Chantiers 9-11) peut être skippé sans bloquer le critère de succès tant qu'un mapping existe côté website.
