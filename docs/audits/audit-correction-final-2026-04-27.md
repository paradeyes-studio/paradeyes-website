# Rapport correction globale Paradeyes 2026-04-27

## Avant audit

- 0 erreur TypeScript
- 0 warning ESLint
- 0 console.log oublié
- 8 TODOs (tous légitimes Notion sync, non bloquants)
- 3 vrais problèmes détectés
- Code globalement propre, dette technique faible après les sprints précédents

## Après corrections

- 0 erreur TypeScript (inchangé)
- 0 warning ESLint (inchangé)
- 0 console.log (inchangé)
- 8 TODOs Notion sync conservés (cohérent avec backlog)
- 2 problèmes corrigés
- 1 problème ré-évalué et **non corrigé** (justifié, voir ci-dessous)
- 4 signalements pour décision Basilide

## Problèmes traités

### Corrections appliquées

1. **[Cohérence DA]** Couleurs hardcoded dans `HeroSection.tsx` migrées vers variables CSS Paradeyes
   - 5 occurrences corrigées : `#003135` → `var(--color-green-deep)`, `#57EEA1`/`#57eea1` → `var(--color-green-electric)`, `#023236` (variante non charte) → `var(--color-green-deep)`
   - Logo SVG conserve ses couleurs hardcoded (convention SVG inline, OK)

2. **[Wording]** Footer ligne 155 `"PARIS - CANNES"` → `"PARIS · CANNES"`
   - Respect de la règle DA Paradeyes "AUCUN tiret dans les textes"
   - Point médian (·) conserve l'esthétique éditoriale

### Problème ré-évalué et NON corrigé (avec justification)

3. **[Critique apparent — finalement justifié]** Absence de `pdy-section-reveal` sur `Methode` et `Offres`
   - Détection initiale : régression de cohérence d'animation
   - Ré-évaluation : ces 2 sections utilisent GSAP `ScrollTrigger { pin: true }` pour le scroll horizontal cinéma
   - L'animation `pdy-section-reveal` (translateY 80px scale 0.92) entrerait en **conflit visuel direct** avec le pin GSAP qui applique ses propres transforms
   - **Décision conservatrice** : ne pas appliquer. C'est un choix architectural justifié, pas une régression.

## Signalements pour décision Basilide

1. **SEO assets manquants** : pas d'`opengraph-image.tsx`, pas d'`apple-icon`, pas de `twitter` metadata explicite. Nécessite création d'assets visuels et décision sur le brief OG (image 1200x630). À traiter dans une session dédiée.

2. **`behanceUrl` dans `src/lib/sanity.queries.ts`** : champ optionnel du schema Sanity à venir. Pas de référence visible dans le rendu actuel. À supprimer du schema lors de la migration Sanity si Behance définitivement abandonné.

3. **8 TODOs Notion sync** : tous dans `src/content/home-fallback.ts` et `src/app/sitemap.ts`. Liés à la migration Sanity future (case studies, témoignages, journal). Conservés volontairement car ils documentent le backlog.

4. **Animation Cinéma `Methode` + `Offres`** : si l'absence de reveal sur ces 2 sections est jugée gênante visuellement, alternative possible : appliquer le reveal sur un wrapper interne (header de section uniquement) plutôt que sur la section pinnée. À discuter en validation visuelle.

## Commits effectués pendant l'audit

| # | SHA | Description |
|---|---|---|
| 1 | `2a00d74` | docs(audit) : rapport audit global 8 axes pré-corrections |
| 2 | `8201311` | refactor(audit) : cohérence DA + wordings (couleurs CSS + Footer) |

Total : **2 commits granulaires**.

## Phases sans correction nécessaire

Les axes ci-dessous étaient déjà propres au moment de l'audit :

- **Axe 1 Code/build** : 0 erreur, 0 warning, 0 console.log
- **Axe 3 Responsive/mobile** : tokens `--pdy-pad-x-mobile` standardisés, media queries cohérentes
- **Axe 4 Animations/perf** : 67 références reduced-motion, 14 cleanups disconnect/revert pour 8 observers/contexts (ratio sain), 7 will-change raisonnables, 2 backdrop-filter contenus
- **Axe 5 Accessibilité** : alts conformes (vides pour décoratif), aria-labels présents, hiérarchie h2/h3 cohérente, 24 règles `:focus-visible`
- **Axe 7 Structure** : 5 hooks customs propres, pas de doublons, content centralisé, pas d'imports circulaires

## Tag de rollback

`v0.pre-audit-global-2026-04-27` (poussé sur origin)

Procédure rollback :
```
git reset --hard v0.pre-audit-global-2026-04-27 && git push --force-with-lease origin main
```

Branche backup : `backup-pre-audit-global-2026-04-27`.

## Recommandations pour Basilide

### Validation visuelle nécessaire sur

- `HeroSection` après refactor couleurs (rendu identique attendu, mais Cmd+Shift+R pour s'assurer)
- Footer "PARIS · CANNES" (kerning du point médian)

### Décisions stratégiques requises sur

- Création des assets SEO (opengraph-image 1200×630, apple-icon, Twitter card)
- Conservation ou retrait de `behanceUrl` du schema Sanity
- Animation reveal sur `Methode`/`Offres` (statu quo accepté ou alternative wrapper interne ?)

### Améliorations possibles non couvertes

- Migration progressive du contenu Sanity (8 TODOs en attente)
- i18n EN complet (actuellement structure prête mais wordings FR principalement)
- Tests Playwright pour parcours critiques (hors scope audit)

## Conclusion

Le site Paradeyes est dans un état technique sain après les sprints précédents. Cet audit a confirmé l'absence de dette critique et corrigé 2 incohérences mineures. Aucun bug bloquant, aucune fuite mémoire, aucun warning lint/TS. Le code est prêt pour la production en l'état, sous réserve des décisions stratégiques signalées (SEO assets notamment).
