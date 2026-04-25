---
name: paradeyes-image-gen
description: Génère ou édite des visuels qualitatifs respectant strictement la charte graphique Paradeyes (palette green-deep et green-electric, esthétique premium éditoriale et cinéma) pour articles de Journal, vignettes projets et réalisations, illustrations éditoriales, hero images de pages. Utilise Nano Banana (Gemini 2.5 Flash Image) via MCP. Trigger phrases qui activent ce skill, "génère une image", "crée un visuel", "image hero", "vignette projet", "illustration éditoriale", "image article journal", "génère un visuel pour", "fais une image", "édite cette image".
---

# Skill, Paradeyes Image Generation

## Quand utiliser

Active ce skill chaque fois que l'utilisateur demande la génération, l'édition ou la fusion d'une image visuelle pour le site Paradeyes (production ou prototypage). Si Nano Banana MCP n'est pas connecté, signale-le et propose de le configurer.

## Charte visuelle stricte (à inclure dans CHAQUE prompt envoyé à Nano Banana)

### Palette autorisée uniquement

- Vert profond #003135 (green-deep), fond dominant pour les visuels dark
- Vert électrique #57EEA1 (green-electric), accents, highlights, gradients subtils
- Bleu sombre #14222E (dark-bluish), secondaire pour profondeur
- Blanc cassé #FAFAF7 (white-warm), fond clair, highlights
- Violet spark #6549F6, accent rare, énergie créative
- Échelle de gris neutre

### Interdits absolus

- Pas de pêche, saumon, cream, beige
- Pas de visages humains réalistes (photographies de personnes) sauf demande explicite avec consentement
- Pas de logos d'autres marques visibles dans le visuel
- Pas de texte généré par l'IA dans l'image (sauf demande explicite, et dans ce cas en Satoshi, DM Sans, DM Mono)
- Pas de style cartoon, manga, ou illustration enfantine

### Esthétique signature Paradeyes

- Premium éditorial, cinéma, sobre
- Grain léger, profondeur via halos lumineux
- Compositions asymétriques équilibrées avec négatifs spatiaux
- Lignes architecturales fines, grilles subtiles
- Lumière directionnelle douce, ombres profondes
- Références visuelles, Aesop product photography, Cereal magazine, Kinfolk, Apparel Magazine, NYT The Daily covers, Linear company brand visuals

## Procédure

1. Lis attentivement la demande utilisateur, identifie le type d'image (journal hero, project thumbnail, editorial illustration, page hero, texture abstraite)
2. Charge le template de prompt correspondant dans `prompts/`
3. Construis le prompt final en assemblant, template + brief utilisateur reformulé en anglais + charte stricte (toujours append à la fin)
4. Appelle l'outil de génération MCP nano-banana avec le prompt construit, format demandé (16:9 hero, 1:1 thumbnail, 4:5 vertical éditorial), et seed si reproductibilité demandée
5. Sauvegarde l'image générée dans le dossier approprié,
   - Articles Journal, `public/images/journal/{slug}-{type}.{ext}`
   - Projets et réalisations, `public/images/projets/{slug}-{type}.{ext}`
   - Hero pages, `public/images/heroes/{page}.{ext}`
   - Illustrations éditoriales, `public/images/editorial/{slug}.{ext}`
6. Si l'image générée est en PNG ou JPG, conserve l'original. Si l'utilisateur demande une optimisation WebP, utilise sharp (npm) ou cwebp.
7. Retourne le path de l'image et un résumé du prompt utilisé pour traçabilité.

## Templates de prompts

Quatre templates disponibles dans `prompts/`,

- `journal-hero.md`, hero d'un article de Journal (16:9, éditorial)
- `project-thumbnail.md`, vignette d'une étude de cas (1:1 ou 4:5)
- `editorial-illustration.md`, illustration abstraite pour Manifesto, About, etc.
- `page-hero.md`, hero d'une page principale (16:9 wide cinéma)

## Sortie attendue

Pour chaque génération, tu produis,

- Le fichier image dans le bon dossier
- Une mention dans la console, "Image générée, [chemin]. Prompt utilisé, [résumé court]. Model, gemini-2.5-flash-image (Nano Banana)."
- Si plusieurs versions sont demandées, tu génères et numérotes (par exemple `slug-hero-v1.png`, `slug-hero-v2.png`)

## Limites et bonnes pratiques

- Ne génère PAS plus de 4 variations en une fois (coût et temps)
- Pour l'édition ou la fusion d'images existantes, demande à l'utilisateur de te fournir les images sources avant de lancer la génération
- Si la demande est vague (par exemple "fais une image"), pose UNE question de cadrage avant de lancer (type, format, ambiance)
- Garde tes prompts en anglais pour Nano Banana (meilleure qualité de génération) même si le brief utilisateur est en français
- Vouvoie l'utilisateur, jamais d'emojis, jamais de tirets cadratins ou demi-cadratins dans tes réponses
