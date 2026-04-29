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

## Pattern de consommation Sanity avec fallback

Tous les composants de la home consomment Sanity avec fallback systématique sur `home-fallback.ts`,

```tsx
const data = sanityData?.section ?? homeFallback.section
```

Cette règle est obligatoire pour toutes les futures contributions. Le fetch Sanity est centralisé dans `src/app/[locale]/page.tsx` (3 fetches en parallèle, `homePage`, `siteSettings`, `contact`), et chaque section reçoit ses données via une prop `data` typée. Si Sanity retourne `null` ou un champ vide, le fallback `home-fallback.ts` prend le relais sans rendu cassé.

Le pattern est identique pour les composants client et serveur (le fetch est server, la prop est sérialisée vers le client). Aucun composant ne fait son propre fetch Sanity.

## Règle additive sur les schémas Sanity (Phase 3)

Toute modification d'un schéma Sanity côté `paradeyes-dashboard` doit être strictement additive. Aucun champ existant n'est supprimé ni renommé, même s'il paraît obsolète. Pour faire évoluer un champ sans casse :

1. Ajouter un nouveau champ à côté du champ existant (ex : `titleRich` à côté de `title`)
2. Mettre à jour la GROQ pour fetcher les deux
3. Côté composant, utiliser une chaîne de fallback : `data?.titleRich ?? data?.title ?? fallback.title`
4. Lorsque le contenu est entièrement migré dans le nouveau champ, l'ancien peut être marqué deprecated mais conservé jusqu'à confirmation explicite de Basilide.

Cette règle garantit que le Studio reste fonctionnel et que le rendu visuel reste identique tout au long des évolutions de schéma.

## Pattern Portable Text (futures contributions)

Pour les champs structurés à mark italique signature (titres éclatés before/italic/after), le pattern actuel utilise 3 strings séparés. Si un futur chantier introduit du Portable Text via `array of block` côté Sanity, le rendu côté website devra utiliser `@portabletext/react` avec un mapping de marks personnalisé (ex : `em` rendu avec la classe italique signature). Voir `SANITY_PHASE3_FIELD_AUDIT.md` pour le détail des champs concernés.

## Pattern wiring shape-by-shape (Phase 4)

Le wiring Sanity → composants est centralisé dans `src/app/[locale]/page.tsx`, pas dans les composants. Chaque composant expose une interface `data?: SectionData` avec des sous-champs typés (eyebrow, title `{before, italic, after}`, sub, arrays). Le composant utilise systématiquement `data?.field ?? homeFallback.field`.

Helpers utilitaires dans `page.tsx` :
- `resolveLocalized(field, locale)` : résout un champ i18n Sanity en string
- `resolveTitleEclate(beforeField, italicField, afterField, locale)` : résout les 3 parties d'un titre éclaté en `{before, italic, after}`, retourne `undefined` si l'un manque (déclenche fallback)
- `resolvePlainStringArray(field)` : résout un array Sanity de strings simples (clients, marquee lines)
- `resolveHeaderNavItems(field, locale)` : résout `siteSettings.headerLinks` en `Array<{label, href}>`
- `resolveLocalizedBadges(field, locale)` : résout un array de badges i18n

Pattern de wiring d'une nouvelle section :
```tsx
<MaSection
  data={{
    eyebrow: resolveLocalized(homeData?.maSectionEyebrow, typedLocale),
    title: resolveTitleEclate(
      homeData?.maSectionTitleBefore,
      homeData?.maSectionTitleItalic,
      homeData?.maSectionTitleAfter,
      typedLocale,
    ),
    sub: resolveLocalized(homeData?.maSectionSubtitle, typedLocale),
  }}
/>
```

Les composants n'ont jamais besoin d'être modifiés pour consommer un nouveau champ Sanity tant que leur interface `Data` couvre déjà la prop. Si un nouveau sous-champ est ajouté en Phase 5+, étendre l'interface du composant ET le mapping dans `page.tsx`.

## Pattern mappers Sanity centralisés (Phase 5)

Le wiring fin des **arrays Sanity** (cards Offres, steps Méthode, items Moments, stats Chiffres, refs caseStudy/testimonial/article/faqItem) est centralisé dans `src/lib/sanity-mappers.ts`. Chaque mapper :

1. Prend un payload Sanity brut (objet ou array de refs après résolution GROQ).
2. Retourne `ReadonlyArray<ItemType> | undefined` où `ItemType` est exporté depuis `sanity-mappers.ts`.
3. Retourne `undefined` si l'array est vide ou si tous les items sont incomplets, déclenchant le fallback statique du composant.
4. Gère défensivement les nullish, les casts (string ↔ number), les dates FR (mois année), les concaténations (slug → href).

**Pour ajouter un nouveau mapper** :
- Définir le `Item` type exporté dans `sanity-mappers.ts`.
- Implémenter `mapSanityXxx(rawField, locale): ReadonlyArray<ItemType> | undefined`.
- Relâcher l'interface du composant : `xxx?: ReadonlyArray<ItemType>`.
- Importer le mapper dans `page.tsx` et l'appeler dans le mapping de la section.

Les fallbacks `home-fallback.ts` restent **inchangés** (tuples `as const`). Ils sont assignables à `ReadonlyArray<ItemType>` par covariance, donc le composant continue de les accepter sans cast.

## Dashboard (NE PAS CASSER)

dashboard.paradeyesagency.com est un projet séparé déjà en production.
Ne jamais toucher à ses DNS, son déploiement Vercel, ou son sous-domaine.

## Contacts

- Email : hello@paradeyesagency.com
- LinkedIn : linkedin.com/company/paradeyesagency
- Instagram : instagram.com/paradeyesagency
