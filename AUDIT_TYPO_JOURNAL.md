# Audit typographique exhaustif home

Date : 2026-04-29
Tag rollback : `v0.pre-audit-typo`

## Inventaire fichiers audités

| Fichier | Type | Chaînes auditées (estim.) |
|---|---|---|
| `src/content/home-fallback.ts` | Source principale | 8 sections, ~120 chaînes |
| `src/components/sections/HeroSection.tsx` | Hardcoded fallback | 6 chaînes |
| `src/components/nav/PreFooterCTA.tsx` | Hardcoded variants | 12 chaînes |
| `src/components/nav/Footer.tsx` | aria-label + tagline | 2 chaînes |
| `src/components/nav/Header.tsx` | aria-label | 1 chaîne |

Pas de `messages/` next-intl séparé, fallback only.

## Compteur global par règle

| Règle | Total corrections |
|---|---|
| 1 (NBSP avant `?` `:` `;` `!` `%`) | 30 |
| 2 (apostrophes typographiques `'` → `'`) | 47 |
| 3 (guillemets français) | 0 (aucun guillemet droit dans contenu FR) |
| 4 (doubles espaces) | 0 dans le contenu |
| 5 (points de suspension) | 0 (déjà absents) |
| 6 (ligatures `œ`) | 0 (mots concernés absents) |
| 7 (accents majuscules) | 0 (déjà conformes) |
| 8 (tirets cadratins) | 0 (déjà absents, header file le rappelle) |
| 9 (abréviations) | 0 (rien à corriger) |
| 10 (cohérence éditoriale) | 0 |

## Détail home-fallback.ts

- **41 apostrophes droites** → typographiques (l'écriture, d'identité, qu'il, n'est, etc)
- **12 NBSP avant `?`** : titre Moments + 8 questions FAQ + outroCta + Pre-footer eyebrow + JournalPreview article 3
- **13 NBSP avant `:`** : sub Méthode "Quatre étapes. Un seul cap : votre croissance.", FAQ réponses ("La seule constante :", "notre métier :", "vos réseaux :"), JournalPreview article 3 ("création :"), commentaires de code également touchés (cosmétique non-impactant)
- **1 NBSP avant `%`** : "80 % des refontes" dans homeJournal article 1

## Détail composants

- **6 apostrophes droites** → typographiques
- **4 NBSP avant `?`** : HeroSection irisPlaceholder, PreFooterCTA offre titleAfter + description, Header search placeholder

## Cas non modifiés (volontaires)

- Termes anglais conservés sans typo française : `Storytelling`, `UX UI`, `Branding`, `Motion design`, `Product designer`, `Head of Brand`, `CEO`, `Scale-up SaaS` (anglicismes business standards)
- Apostrophes dans commentaires de code et noms de variables : non touchés
- Apostrophes dans les ID Notion (`3459ea1e-...`) : pas concernés (aucun apostrophe)

## Vérifications croisées finales

```bash
# Apostrophes droites restantes dans le contenu utilisateur : 0
# Em-dashes : 0
# En-dashes : 0
# Triple dots ... : 0
```

## Préconisation automation future

Ajouter au pipeline lint un linter typographique (ex : `vale` ou `textlint`) avec règles FR strictes pour empêcher la régression sur les futures contributions wordings.

Pattern recommandé : pre-commit hook qui scan tous les fichiers modifiés dans `src/content/` et `src/components/sections/` pour détecter `'` (apostrophe droite) entre lettres FR, ` ?`, ` :`, ` %` (espace normal au lieu NBSP), `—` (em-dash interdit).
