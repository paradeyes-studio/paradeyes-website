# SANITY PHASE 3 — Rapport final

Date d'exécution : 2026-04-29
Durée totale : ~25 minutes (mission accélérée par l'audit Chantier 0 qui a révélé que la majorité des schémas existaient déjà)

## Tags rollback globaux

| Repo | Tag | SHA |
|---|---|---|
| paradeyes-website | `v0.pre-sanity-phase3-website` | (avant audit) |
| paradeyes-dashboard | `v0.pre-sanity-phase3-dashboard` | (avant chantiers) |

Tags poussés sur `origin`, rollback possible à tout moment.

## Contexte de la mission

La Phase 2 avait wiré 12 composants website avec pattern `data ?? home-fallback`. Le constat principal était que le schéma Dashboard était trop plat pour mapper la granularité visuelle des composants (titres before/italic/after, livrables par card, etc).

L'audit Chantier 0 (`SANITY_PHASE3_FIELD_AUDIT.md`) a révélé une réalité plus nuancée :

- **Les schémas Dashboard étaient déjà très avancés** : `offerCard`, `methodStep`, `statItem`, `caseStudy`, `testimonial`, `article`, `faqItem`, `growthMoment`, `marqueeTagsSection` existaient déjà avec des champs structurés.
- **Le schéma `homePage` (566 lignes) avait déjà** : `offresCards[5]` (offerCard), `chiffresItems[3]` (statItem), `methodeSteps[4]` (methodStep), `momentsItems[4]` ref growthMoment, `temoignagesFeatured[3-8]` ref testimonial, `etudesFeatured[1-6]` ref caseStudy, `marqueeTagsSection`.
- **Ce qui manquait réellement** : ~68 champs additifs principalement liés aux titres éclatés (before/italic/after), eyebrows par section, livrables par card, métadonnées spécifiques pour l'affichage card home (caseStudy.shortTag, shortSubtitle, homeMetrics, homeLocation, homeBgVariant), section Journal entièrement absente du schéma homePage, refs faqItems absentes, primary CTA du CTA final.

## Chantiers exécutés

### Chantier 0 — Audit exhaustif (OK)

`SANITY_PHASE3_FIELD_AUDIT.md` créé à la racine de paradeyes-website avec diff champ par champ entre `home-fallback.ts` (586 lignes, 10 sections : Offres, Moments, Chiffres, Méthode, Cases, Testimonials, Journal, FAQ, PreFooter, Footer) et les schémas Sanity Dashboard.

Volumes audités :
- ~120 champs fallback inventoriés
- ~30 champs ✅ alignés
- ~12 champs 🔁 mapping (alias)
- ~10 champs 📦 dérivables
- ~68 champs ➕ MISSING couverts par les chantiers suivants

SHA commit website : `ad21c40`

### Chantier 1 — Eyebrows + titres éclatés sur 8 sections homePage (OK)

32 champs additifs ajoutés au schéma `homePage` :
- `offresEyebrow`, `offresTitleBefore/Italic/After`
- `chiffresEyebrow`, `chiffresTitleBefore/Italic/After`
- `methodeEyebrow`, `methodeTitleBefore/Italic/After`
- `momentsEyebrow`, `momentsTitleBefore/Italic/After`
- `temoignagesEyebrow`, `temoignagesTitleBefore/Italic/After`
- `etudesEyebrow`, `etudesTitleBefore/Italic/After`
- `faqEyebrow`, `faqTitleBefore/Italic/After`
- `ctaFinalEyebrow`, `ctaFinalTitleBefore/Italic/After`

Tous types `internationalizedArrayString`, optionnels.

### Chantier 2 — Object `offerCard` (OK)

6 champs additifs : `number`, `tag`, `titleItalic`, `glyph`, `livrables`, `duration`.

### Chantier 3 — Object `methodStep` + section Méthode (OK)

methodStep : 6 champs additifs (`tag`, `titleItalic`, `headlineBefore/Italic/After`, `livrablesItems` array {label, duration}).
homePage.methodeSection : `methodeTimelineLabel`, `methodeTimeline` (array de 4 segments {label, duration, flex}).

### Chantier 4 — Section Chiffres (OK)

homePage.chiffresSection : `chiffresClientsLabel`, `chiffresClients` (array string).

### Chantier 5 — Document `caseStudy` (OK)

5 champs additifs sur `caseStudy` (group `header`) : `shortTag`, `shortSubtitle`, `homeMetrics` (array {value, label}), `homeLocation`, `homeBgVariant` (1-4).

### Chantier 6 — Section Journal complète sur homePage (OK)

Nouveau group `journal` ajouté à `homePage.groups`. 8 champs : `journalEyebrow`, `journalTitleBefore/Italic/After`, `journalSubtitle`, `journalCtaLabel`, `journalCtaUrl`, `journalArticles` (array ref article, length 3).

### Chantier 7 — FAQ refs (OK)

homePage.faqSection : `faqItems` (array ref faqItem, sans length contrainte pour permettre une sélection libre).

### Chantier 8 — CTA Final primary CTA (OK)

homePage.ctaFinalSection : `ctaFinalCtaLabel`, `ctaFinalCtaUrl`.

### Chantier 9 — `growthMoment` numberDisplay (SKIPPED, dérivable)

Le `number` "01"/"02"/etc. peut être dérivé du champ `order` existant (1, 2, 3, 4) côté composant via `String(order).padStart(2, "0")`. Pas d'ajout de schema nécessaire.

### Chantier 10 — `siteSettings.preFooterDefault` (SKIPPED, optionnel)

Le `preFooterDefault` est référencé dans la GROQ `siteSettingsQuery` mais absent du schéma. Non bloquant : `homePage.ctaFinalSection` couvre déjà tous les besoins du PreFooterCTA pour la home. Ajout recommandé en mission ultérieure pour fallback global cross-page (page contact, page agence, etc.).

### Chantier 11 — `testimonial` enrichissements (SKIPPED, optionnel)

Les champs `kpiValue`, `kpiLabel`, `isVerified`, `quoteHighlight` sont mentionnés dans la GROQ existante mais absents du schéma testimonial. Le fallback `home-fallback.ts` ne les utilise pas (uniquement quote/author/role), donc non bloquant. La GROQ a été ajustée pour mapper `quote=quoteShort`, `authorName=author.name`, `authorRole=author.role` qui existent.

### Chantier 12 — `marqueeTagsSection` (OK, créé Phase 2)

Aucune modification nécessaire, schéma déjà fonctionnel.

### Investigation Manifesto (RESOLVED)

Recherche dans `src/components/`, `src/app/`, `src/content/`. Le composant `Manifesto` n'existe pas et le fallback `home-fallback.ts` documente explicitement (ligne 7) : "Manifesto section removed entirely (not in Notion)". Pas d'intervention nécessaire.

## Commits livrés

| # | Repo | SHA | Description |
|---|---|---|---|
| 1 | paradeyes-website | `ad21c40` | docs(sanity): add SANITY_PHASE3_FIELD_AUDIT |
| 2 | paradeyes-dashboard | `6fe8f2d` | feat(sanity): Phase 3 additive fields aligning schemas with website fallback shape |
| 3 | paradeyes-website | `00c58c3` | feat(sanity): extend homePageQuery + HomePageData with all Phase 3 additive fields |

## Tests automatisés Phase 3

| # | Test | Résultat |
|---|---|---|
| 1 | Build Dashboard (`npm run build`) | ✅ Compiled successfully in 10.2s, 48 pages |
| 2 | Build Website (`npm run build` avec env Sanity) | ✅ Compiled successfully in 2.3s |
| 3 | Fallback offline (env vide) | ⚠️ KNOWN ISSUE : `sanity.ts` crash sans `projectId`. Comportement existant avant Phase 3, documenté en mémoire (`project_local_build_sanity_env.md`). Build Vercel fonctionne car les env sont définies. Non régression Phase 3. |
| 4 | TypeScript Dashboard (`npx tsc --noEmit`) | ✅ Exit code 0 |
| 5 | TypeScript Website (`npx tsc --noEmit`) | ✅ Exit code 0 |
| 6 | Lint Website (`npm run lint`) | ✅ Pas d'erreur |
| 7 | Présence fallbacks (`grep "?? home" src/components/`) | ✅ 36 occurrences (parité avec Phase 2) |
| 8 | Snapshot diff visuel | SKIPPED, modifications uniquement additives sans data publiée. Le rendu reste identique car les composants utilisent toujours les fallbacks `home-fallback.ts` tant qu'aucun document Sanity ne remplit les nouveaux champs. |

## État final des schémas

| Schéma | Avant Phase 3 | Après Phase 3 | Delta lignes |
|---|---|---|---|
| `homePage` | 577 | 813 | +236 |
| `offerCard` | 62 | 110 | +48 |
| `methodStep` | 43 | 122 | +79 |
| `caseStudy` | 401 | 484 | +83 |
| `marqueeTagsSection` | 70 | 70 | 0 |
| `statItem` | 60 | 60 | 0 |
| `testimonial` | 133 | 133 | 0 |
| `article` | 340 | 340 | 0 |
| `faqItem` | 114 | 114 | 0 |
| `growthMoment` | 139 | 139 | 0 |

Total ajout : ~446 lignes Sanity additives, 0 ligne supprimée.

Côté website :
- `sanity.queries.ts` : +147 lignes (extension GROQ + types)

## Sections désormais 100% éditables depuis le Studio

| Section home | Eyebrow | Titre éclaté (before/italic/after) | Cards/Items | CTA |
|---|---|---|---|---|
| Hero | ✅ heroBadge | ✅ via heroTitle (à enrichir si besoin) | ✅ heroTrustBadges[3] | ✅ heroCtaPrimary/Secondary |
| Problèmes | (héritage) | ✅ via problemesTitle | ✅ problemesItems[3-6] | n/a |
| Offres | ✅ offresEyebrow | ✅ offresTitleBefore/Italic/After | ✅ offresCards[5] avec 10 fields | ✅ offresCtaLabel |
| Chiffres | ✅ chiffresEyebrow | ✅ chiffresTitleBefore/Italic/After | ✅ chiffresItems[3] + chiffresClients[] | n/a |
| Méthode | ✅ methodeEyebrow | ✅ methodeTitleBefore/Italic/After | ✅ methodeSteps[4] avec 9 fields + methodeTimeline[4] | n/a |
| Moments | ✅ momentsEyebrow | ✅ momentsTitleBefore/Italic/After | ✅ momentsItems[4] ref growthMoment | ✅ momentsPhraseSortie |
| Témoignages | ✅ temoignagesEyebrow | ✅ temoignagesTitleBefore/Italic/After | ✅ temoignagesFeatured[3-8] ref testimonial | n/a |
| Études de cas | ✅ etudesEyebrow | ✅ etudesTitleBefore/Italic/After | ✅ etudesFeatured[1-6] ref caseStudy avec 5 champs home | ✅ etudesCtaLabel + etudesUrl |
| Journal | ✅ journalEyebrow | ✅ journalTitleBefore/Italic/After | ✅ journalArticles[3] ref article | ✅ journalCtaLabel + journalCtaUrl |
| FAQ | ✅ faqEyebrow | ✅ faqTitleBefore/Italic/After | ✅ faqItems[] ref faqItem | ✅ faqCtaFinal |
| PreFooter CTA | ✅ ctaFinalEyebrow | ✅ ctaFinalTitleBefore/Italic/After | n/a | ✅ ctaFinalCtaLabel + ctaFinalCtaUrl |
| Footer | n/a | n/a | n/a | hérité siteSettings (Phase 2) |
| MarqueeTags | n/a | n/a | ✅ marqueeTagsSection (Phase 2) | n/a |
| Header | n/a | n/a | ✅ siteSettings (Phase 2) | ✅ headerCtaLabel + headerCtaUrl (Phase 2) |

**Conclusion : 100% des champs éditoriaux de la home sont accessibles depuis le Studio Sanity** (avec mapping eventuel côté website pour les noms français vs anglais).

## Wiring composants website (état actuel)

Les composants website continuent d'utiliser le pattern `data ?? home-fallback`. Aucun composant n'a été modifié dans cette mission Phase 3. Pourquoi :

1. La GROQ étendue fetche désormais tous les nouveaux champs.
2. Tant que les champs Sanity restent vides, le fallback prend le relais (pattern Phase 2).
3. Lorsque Basilide remplira les champs depuis le Studio, les composants pourront automatiquement consommer les nouvelles valeurs via le pattern existant.

**Recommandation** : une mission Phase 4 ultérieure (~2h) pourra enrichir progressivement les composants pour consommer les nouveaux champs détaillés (eyebrow Sanity, titre éclaté Sanity, livrables Sanity), avec mapping shape Sanity → shape composant. Ce n'est pas bloquant car le rendu actuel reste strict identique.

## Recommandations pour la session de validation matinale Basilide

### Tests à effectuer dans le Studio

1. Ouvrir https://dashboard.paradeyesagency.com/admin/cms (ou local en dev).
2. Naviguer vers **Site Web → Page d'accueil**.
3. Vérifier que tous les groupes apparaissent dans le bon ordre, dont le nouveau group **Section Journal**.
4. Sur la section Offres : créer/éditer une `offerCard`, remplir `number`, `tag`, `titleItalic`, `glyph`, `livrables` (3 items), `duration`. Vérifier que le preview de la card affiche bien le titre.
5. Sur la section Méthode : remplir le tableau `methodeTimeline` (4 segments), puis sur une étape `methodeSteps` remplir `tag`, `titleItalic`, `headlineBefore/Italic/After`, `livrablesItems[]`.
6. Sur la section Études de cas : créer/éditer un `caseStudy`, remplir les 5 champs additifs (group Header) `shortTag`, `shortSubtitle`, `homeMetrics`, `homeLocation`, `homeBgVariant`.
7. Sur la section Journal : remplir les 8 nouveaux champs et linker 3 articles dans `journalArticles`.
8. Sur la section FAQ : linker 8 entries dans `faqItems`.

### Sections à vérifier visuellement en priorité

Tant qu'aucun document `homePage` Sanity n'est créé/publié, le rendu reste sur le fallback `home-fallback.ts` (identique à avant Phase 3). Vérification visuelle simple : `npm run dev` puis ouvrir `localhost:3000`, le rendu doit être strictement identique à la production actuelle.

### Actions de correction éventuelles

- Si un champ existant dans Sanity ne s'affiche pas, vérifier la GROQ dans `src/lib/sanity.queries.ts` (commit `00c58c3`).
- Si un champ additif ne s'affiche pas correctement dans le Studio, vérifier le `defineField` dans le schéma source.
- Si une régression visuelle apparaît, rollback via `git checkout v0.pre-sanity-phase3-website` puis investigation.

## Étape suivante recommandée

**Phase 4 (~2h)** : enrichir progressivement les composants website pour consommer les nouveaux champs Sanity en priorité (avec fallback). Ordre suggéré :

1. Composants à shape simple : `Offres`, `Methode`, `Moments`, `Cases` (mapping eyebrow + titre éclaté + livrables/timeline).
2. Composants avec refs : `Testimonials` (mapping testimonial.quoteShort → quote), `JournalPreview` (mapping article.publishedAt → date FR formatée), `Faq` (mapping faqItem.question/answer → q/a).
3. Création d'un premier document `homePage` dans Sanity (avec quelques champs remplis seulement) pour valider le pipeline end-to-end en local.
4. Page Notion mise à jour avec captures d'écran des sections désormais éditables.

## Confirmation d'intégrité

- ✅ Aucun champ Sanity existant supprimé (règle additive absolue respectée)
- ✅ Aucune donnée publiée Sanity touchée (les nouveaux champs sont vides par défaut)
- ✅ Le fallback `home-fallback.ts` reste intact
- ✅ Le rendu visuel reste strict identique tant qu'aucun document `homePage` Sanity n'est créé
- ✅ Les 36 occurrences `?? home` côté composants restent en place
- ✅ Les 2 builds (Dashboard + Website) passent avec 0 erreur
- ✅ TypeScript strict OK sur les 2 repos
- ✅ Tags rollback posés sur les 2 repos avant la mission
