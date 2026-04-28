# CLAUDE.md — Paradeyes Website

## Identité

Paradeyes Agency. Agence créative au service de votre croissance. On comprend. On conçoit. On construit.
Fondateur : Basilide Gonot. 7 ans d'expertise, 60+ marques (Volkswagen, Unilever, Mini, Magnum, Air France, Amnesty...).
Bureau Cannes, lancement juin 2026. Objectif 10K€/mois.

## Stack technique

- Framework : Next.js (dernière version stable) + App Router
- Langage : TypeScript strict
- Styling : Tailwind CSS v4 avec directive @theme
- Animations UI : Framer Motion
- Animations timeline : GSAP 3.12
- Smooth scroll : Lenis (@studio-freight/lenis)
- CMS : Sanity (next-sanity + @sanity/client + @sanity/image-url)
- i18n : next-intl (FR par défaut, EN secondaire)
- Analytics : Plausible (pas Google Analytics, RGPD)
- Hosting : Vercel (team Paradeyes, Hobby)
- DNS : Cloudflare
- Repo : github.com/paradeyes-studio/paradeyes-website (public)

## Design tokens

- Dark green (dominante) : #023236
- Electric green (accent) : #57EEA1
- Blanc (texte) : #FFFFFF
- Noir : #000000
- INTERDIT : #57EEA1 sur fond blanc ou clair (contraste insuffisant)
- Gradient signature : radial ellipse émergeant du bas-centre en electric green semi-transparent
- Easing premium : cubic-bezier(0.22, 1, 0.36, 1)
- Easing breathing : cubic-bezier(0.4, 0, 0.6, 1) à 8s de cycle
- Typographie principale : Satoshi (Fontshare, via next/font/local)
- Typographie fallback : DM Sans (via next/font/google)
- PAS d'Instrument Serif

## Règle DA universelle, eyebrows et accents par fond

**Règle absolue à respecter à chaque session, sans exception.**

| Fond de section | Couleur eyebrow et accents signature | Token CSS |
|---|---|---|
| `#F8F6F0` white warm (light) | `#4A6CFF` blue steel violet | `--color-eyebrow-light` |
| `#003135` green deep (dark) | `#57EEA1` green electric | `--color-eyebrow-dark` |

**Détails contraignants** :
- Sur fond light, le green electric `#57EEA1` n'a aucun usage fonctionnel, il est remplacé par le blue steel `#4A6CFF` (couleur froide du gradient Spectral, lisible sur clair, signature)
- Sur fond dark, le green electric `#57EEA1` est la couleur signature absolue
- Le blue steel `#4A6CFF` ne s'affiche jamais sur fond dark
- Le green electric `#57EEA1` ne s'affiche jamais comme élément fonctionnel (trait, bordure, séparateur, eyebrow) sur fond light. Autorisé uniquement comme accent ultra ponctuel signature à doses très réduites

**Implémentation** : chaque section pose `data-section-theme="light"` ou `data-section-theme="dark"` sur son wrapper racine selon son fond. La classe `.pdy-eyebrow` et tous les accents signature consomment la variable CSS conditionnée par ce data attribute via les sélecteurs définis dans `src/app/globals.css`. La convention `data-section-theme` est utilisée car `data-theme` est réservé au toggle global du site (light/dark mode utilisateur).

**Référence Notion** : https://www.notion.so/3509ea1e2812813290d5e00d2fbcecc1

## Conventions éditoriales (NON NÉGOCIABLES)

- Français vouvoiement dans tous les textes clients
- AUCUN tiret dans les textes (ni court, ni moyen, ni long)
- Pas d'emojis dans les textes finaux clients
- Mots interdits : "super", "hâte", "curieux d'en échanger", "n'hésitez pas à", "ravi de", "j'espère que ce message vous trouve bien"
- Ton : direct mais élégant, premium sans arrogance, humain pas corporate

## Conventions de code

- Commits en anglais, format Conventional Commits : feat, fix, chore, docs, style, refactor, test
- Noms de fichiers et composants en anglais
- PascalCase pour les composants, camelCase pour les fonctions, kebab-case pour les routes
- Pas de "use client" sauf si absolument nécessaire
- Commentaires en anglais dans le code
- Chaque session finit par : npm run build → 0 errors → git add -A && git commit -m "..." && git push

## Branches

- main : production
- develop : développement
- feat/nom-feature : nouvelles fonctionnalités
- fix/nom-fix : corrections

## Sitemap

```
/ (home)
/agence
/offres/branding
/offres/sites-et-plateformes
/offres/creation-de-contenus
/offres/deploiement-et-supports
/offres/acquisition-et-reputation
/realisations
/realisations/[slug]
/journal
/journal/[slug]
/contact
/espace-client
/mentions-legales
/cgv
/confidentialite

Redirections 301 :
/appel → /contact#appel
/rdv → /contact#appel
/book → /contact#appel
```

## Références créatives (à suivre)

Inspirations : Mazarine Paris, Vokode, Linear.app, Ramp, Vercel.
Techniques : Lusion.co, Active Theory, Studio Freight, Tundra, Cosmos Company.
À REJETER : Material Design, Bootstrap, bordures bleues, ombres génériques, gradients violets IA, Inter seule, purple accent, "modern minimal SaaS template".

## IRIS (à anticiper)

L'agent conversationnel IRIS sera intégré en Étape 9. Le site doit prévoir :
- Emplacement widget dans le hero home
- Barre persistante en bas de page (toutes pages)
- Route API stub pour Claude API via Vercel Function
- Schéma Sanity pour les paramètres IRIS

## Dashboard (NE PAS CASSER)

dashboard.paradeyesagency.com est un projet séparé déjà en production.
Ne jamais toucher à ses DNS, son déploiement Vercel, ou son sous-domaine.

## Contacts

- Email : hello@paradeyesagency.com
- LinkedIn : linkedin.com/company/paradeyesagency
- Instagram : instagram.com/paradeyesagency
