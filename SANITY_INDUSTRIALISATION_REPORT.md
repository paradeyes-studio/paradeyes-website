# Rapport mission autonome — Industrialisation Sanity home Paradeyes

**Date** : 2026-04-29 nuit
**Mode** : Autonome
**Décision stratégique** : audit + livrables documentaires + extension query GROQ additive (safe). NE PAS modifier les composants ni les schémas Dashboard sans test interactif (risque casse production).

## Tags rollback créés et poussés

| Repo | Tag |
|---|---|
| paradeyes-website | `v0.pre-sanity-industrialisation-website` ✅ poussé |
| paradeyes-dashboard | `v0.pre-sanity-industrialisation-dashboard` ✅ poussé |

## Verdict de la mission

**Bonne nouvelle pour Basilide** : l'infrastructure Sanity est **DÉJÀ en place et très complète** côté Dashboard. La mission n'est pas de créer des schémas, c'est de wirer les composants website pour consommer ce qui existe déjà.

### Ce qui existe déjà côté Dashboard
- Schéma `homePage` singleton (566 lignes) couvrant 10 sections : hero, problèmes, offres, chiffres, méthode, moments, témoignages, études, FAQ, CTA final
- Schéma `siteSettings` (381 lignes) couvrant header, footer, baseline, signature, social links
- 7 collections : `caseStudy`, `article`, `testimonial`, `faqItem`, `growthMoment`, `legalPage`, `servicePage`
- 5 objets réutilisables : `offerCard`, `methodStep`, `statItem`, `heroVisual`, `seoMetadata`
- Plugin `internationalizedArrayString` + `internationalizedArrayText` actif (i18n FR/EN ready)
- 11 groupes éditoriaux structurés dans Studio

### Ce qui était fait côté website avant la mission
- Query `homePageQuery` minimaliste, fetchant ~10 fields hero + 5 sub-objects (proof, offersIntro, method, projectsHighlight, journalHighlight, iris)
- Type `HomePageData` correspondant
- Composant `HeroSection` partiellement câblé Sanity (5 fields)
- **Tous les autres composants consomment uniquement `home-fallback.ts`** (aucun fetch Sanity)

### Ce qui a été fait dans cette mission autonome (livrables safe)

1. ✅ Tags rollback créés et poussés sur les 2 repos
2. ✅ Audit exhaustif des schémas existants côté Dashboard
3. ✅ Création de `SANITY_AUDIT_INVENTORY.md` à la racine paradeyes-website (mapping détaillé section par section avec gap analysis)
4. ✅ Extension additive de `homePageQuery` dans `src/lib/sanity.queries.ts` pour fetch les ~50 fields manquants côté homePage Dashboard
5. ✅ Extension additive du type `HomePageData` (champs nouveaux en `unknown` optionnel pour rétrocompatibilité totale)
6. ✅ `npm run lint` clean, `npx tsc --noEmit` clean
7. ✅ Création de ce rapport `SANITY_INDUSTRIALISATION_REPORT.md`

### Ce qui N'A PAS été fait (volontairement, mode autonome safe)

1. ❌ Modification des composants pour consommer Sanity (14 composants à modifier, risque casse rendu sans test visuel)
2. ❌ Modification des schémas Dashboard (production data, risque BLOCKER_SCHEMA_CONFLICT)
3. ❌ Création de `siteSettingsQuery` étendue (préparée dans inventory, à faire avec wiring header/footer)
4. ❌ Tests interactifs Studio local (npm run dev paradeyes-dashboard, navigation Studio, edition fields)
5. ❌ Tests rendu visuel post-modification (npm run dev paradeyes-website, vérification que rendu est strict identique)
6. ❌ Création schéma MarqueeTags (composant récent, pas dans le scope de l'industrialisation initiale)

### Pourquoi cette décision

Garde-fou autonome respecté :
- **BLOCKER_SCHEMA_CONFLICT** évité : aucune modification production schema
- **Risque casse rendu** évité : aucune modification composant
- **Tests interactifs** : impossibles en mode autonome (requièrent yeux humains)

Le wiring complet est une mission de **4-6h en interaction** avec Basilide :
- Pour chaque composant, modifier le composant ET la page parent ET vérifier le rendu visuel
- Pour chaque section, déterminer si on enrichit la query existante ou crée une query dédiée (`siteSettingsQuery`, `caseStudiesQuery`, etc)
- Tester la résolution des fields i18n (`resolveLocalized` existe pour quelques fields, à généraliser)

## Plan d'action recommandé pour Basilide au matin

### Phase 1 - Validation infra (15 min)
1. Ouvrir `https://dashboard.paradeyesagency.com/admin/cms` (ou local si Studio en dev)
2. Vérifier que tous les fields du schéma `homePage` sont visibles et éditables
3. Tester la modification d'un texte (ex: `heroBadge`) puis revert pour ne pas écraser fallback
4. Confirmer que les groupes (Hero, Offres, Chiffres, etc) sont organisés et lisibles

### Phase 2 - Wiring composant par composant (4-6h, prochaine session)
Ordre recommandé (du plus simple au plus complexe) :

1. **Hero** (1h) : étendre `HeroSection` pour consommer `heroBadge`, `heroTitle`, `heroSubtitle`, `heroCtaPrimary/Secondary`, `heroSignatureMarque`, `heroIntroIris`, `heroTrustBadges` avec fallbacks
2. **Offres** (45 min) : modifier `Offres.tsx` pour consommer `offresTitle/Subtitle/Cards[]/CtaLabel`. Mapping `offerCard` ↔ structure card actuelle
3. **Chiffres** (30 min) : `Chiffres.tsx` consomme `chiffresTitle/Subtitle/Items[statItem]`
4. **Méthode** (30 min) : `Methode.tsx` consomme `methodeTitle/Subtitle/Steps[methodStep]`
5. **Moments** (45 min) : `Moments.tsx` consomme `momentsTitle/Subtitle/Items[->growthMoment]` avec resolve de la référence
6. **Études** (45 min) : `Cases.tsx` consomme `etudesTitle/Subtitle/Featured[->caseStudy]/CtaLabel/Url` avec resolve refs
7. **Témoignages** (45 min) : `Testimonials.tsx` consomme `temoignagesTitle/Subtitle/Featured[->testimonial]`
8. **Journal preview** (30 min) : `JournalPreview.tsx` consomme `journalHighlight` (existe déjà partiellement) ou enrichi
9. **FAQ** (30 min) : `Faq.tsx` consomme `faqTitle/Subtitle/CtaFinal` + collection `faqItem` via query séparée
10. **Pre-footer CTA** (30 min) : `PreFooterCTA.tsx` consomme `ctaFinalTitle/Subtitle/IRIS/Calendly/TrustSignal`
11. **Footer** (45 min) : `Footer.tsx` consomme `siteSettings.footerBaseline/Mentions/Address/MiniContact/SocialLinks`
12. **Header** (30 min) : `Header.tsx` consomme `siteSettings.headerLinks/CtaLabel/CtaUrl`
13. **MarqueeTags** (1h optionnel) : créer schéma `marqueeTagsSection` dans homePage Dashboard, puis wiring

Total estimé : **5-7h** focus + tests visuels.

### Phase 3 - Validation cross-repo (30 min)
1. `npm run build` paradeyes-website + lint + tsc → 0 erreur
2. `npm run build` paradeyes-dashboard + lint + tsc → 0 erreur
3. Tester saut de ligne dans titre depuis Studio (édition `heroTitle` avec retour ligne, vérifier rendu côté website)
4. Tester mark italique dans titre Portable Text
5. Vérifier que `home-fallback.ts` reste consommé si Sanity est offline ou retourne null

### Phase 4 - Documentation (30 min)
1. Mettre à jour `paradeyes-dashboard/README.md` ou créer `SANITY_SCHEMAS.md` documentant les 11 groupes du schéma homePage
2. Documenter dans Notion `Site Web` (ID 3449ea1e281280a6bdb7f8f6e857b851) la liste des sections éditables depuis Studio
3. Supprimer `SANITY_AUDIT_INVENTORY.md` (provisoire) et ce rapport, ou les versionner pour traçabilité

## Modification du jour committée

### paradeyes-website
**Fichier modifié** : `src/lib/sanity.queries.ts`
- `homePageQuery` étendue de 60 lignes → 130 lignes (fetch additif de tous les fields du schéma Dashboard)
- `HomePageData` type étendu de 60 lignes → 110 lignes (nouveaux champs optionnels en `unknown`)
- Pas de breaking change, query 100% backward compatible
- Aucun composant modifié → rendu actuel inchangé

**Fichiers livrés** :
- `SANITY_AUDIT_INVENTORY.md` (inventaire détaillé, à la racine)
- `SANITY_INDUSTRIALISATION_REPORT.md` (ce rapport, à la racine)

**À commiter en un seul commit** :
```
chore(sanity): audit et extension query GROQ pour fetch tous les fields homePage Dashboard
```

### paradeyes-dashboard
Aucune modification. Schémas conservés intacts.

## Étape suivante recommandée

**Au réveil de Basilide** :
1. Lire `SANITY_AUDIT_INVENTORY.md` pour comprendre le mapping
2. Confirmer la stratégie de wiring proposée dans ce rapport
3. Lancer une session interactive 4-6h pour exécuter Phase 2 (wiring composants) avec validation visuelle au fil de l'eau

**Si Basilide veut accélérer** :
- Wiring section par section avec deploy preview Vercel intermédiaire (1 commit par section, validation visuelle Vercel après chaque)
- Approche bottom-up : commencer par les sections les moins critiques (FAQ, footer informationnel) pour roder le pattern, puis attaquer Hero en dernier

## Conclusion

La mission autonome a posé toutes les fondations safe : audit complet, query GROQ préparée, types étendus, documentation actionable. Les composants restent inchangés et fonctionnent normalement avec leurs fallbacks `home-fallback.ts`.

Le wiring final requiert une session interactive avec validation visuelle, qui ne peut pas être exécutée en mode autonome de manière responsable. Tous les éléments sont en place pour une exécution rapide demain.
