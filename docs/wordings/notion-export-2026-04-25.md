# Audit wordings Notion vs code, 25 avril 2026

> Audit méthodique conduit par interrogation MCP de la base Notion Wording
> (collection 4511498a-227f-4b3d-9064-ebae3924a989). Aucune modification
> de code, aucune modification de la base Notion. Rapport en lecture seule
> destiné à l'arbitrage de Basilide avant la session de synchronisation.

## Synthèse

- Total wordings Notion validés (Validé FR) pour les sections home auditées : **44**
- Total wordings Notion archivés rencontrés (signalés mais non utilisés) : **3** (Hero Signature, Offres Passerelle Conseil, Chiffres Stat 4)
- Total entrées dans `src/content/home-fallback.ts` consommées par les composants home : **environ 70**
- Sections codées non couvertes par Notion (improvisations) : **Strip marquee, Manifesto**

### Répartition par catégorie d'écart

| Catégorie | Nombre | Notes |
|---|---|---|
| OK (alignés strictement au caractère près) | 4 | Badge positionnement, Trust badges 1/2/3, Hero phrase d'accroche (alignée) |
| MINEUR (ponctuation/casse/accent) | 2 | Carte Création promesse (`unique` vs `esthétique`), Footer copyright (`© 2026` vs `© Paradeyes Agency`) |
| IMPORTANT (formulation différente) | 18 | Voir détail par section |
| STRUCTUREL (structure de données) | 6 | Voir liste arbitrages plus bas |
| ABSENT NOTION (improvisation code) | 13 | Strip marquee 8 items, Manifesto entier (eyebrow + headline + body + 3 mini-stats), Moments tags (Mois 1 à 6 etc.) |
| ABSENT CODE (validé Notion mais pas affiché) | 7 | CTA final - Sous-titre, Chiffres Transition, Méthode Sous-titre validé "Quatre étapes. Un seul cap…", Moments Phrase de sortie, FAQ Sous-titre, Footer Tagline complète, Signature de marque globale FR |

### Arbitrages structurels à valider par Basilide

1. **Méthode 4 étapes : nommage des étapes 3 et 4.**
   - Notion `Titre du bloc` : `Étape 3 Produire`, `Étape 4 Faire grandir`.
   - Notion `Version FR` (contenu rendu) : commence par `03 Construire.` et `04 Accompagner.`.
   - Code `home-fallback.ts` : `Comprendre / Concevoir / Construire / Accompagner`.
   - Le contenu rendu Notion est aligné avec le code (`Construire` + `Accompagner`).
   Le titre du bloc Notion (`Produire` / `Faire grandir`) est apparemment un libellé interne, pas un wording rendu. **Recommandation : confirmer que Code suit Notion contenu (Construire/Accompagner). Renommer les blocs Notion pour cohérence, ou laisser tel quel.**

2. **Chiffres : 3 stats validés vs 4 stats codés.**
   - Notion : 3 stats `Validé FR` + 1 stat `Archivé` (Stat 4) avec note "Bloc Chiffres finalisé avec 3 stats. Quatrième stat non retenue."
   - Code : 4 stats (60+, 7 ans, 98%, ×3,4 Impact).
   - **Recommandation : retirer la 4e stat du code (`Impact ×3,4`) pour aligner sur la décision Notion, ou faire valider la 4e stat dans Notion.**

3. **Footer 3 colonnes Notion vs 4 colonnes code.**
   - Notion : 3 colonnes (`Paradeyes` / `Services` / `Contact`).
     - Colonne 1 Paradeyes : `A propos | Journal | Mentions légales`
     - Colonne 2 Services : `Identité de marque | Site web sur-mesure | Vidéo et captation | Lancement complet | Conseil et stratégie créative`
     - Colonne 3 Contact : `hello@paradeyesagency.com | Réserver un appel | LinkedIn | Instagram`
   - Code : 4 colonnes (`Paradeyes / Plan du site / Contact / Social`) avec libellés `Agence | Réalisations | Journal | FAQ | Contact` pour la colonne nav.
   - **Divergence majeure** : structure différente (3 vs 4), libellés Services différents (Notion utilise wording grand public, code utilise les 5 offres canoniques), liens supplémentaires côté code (FAQ, Réalisations).
   - **Recommandation : décision Basilide. Option A = appliquer la structure Notion 3 colonnes telle quelle (perte des 5 offres canoniques en footer). Option B = enrichir Notion pour refléter la structure 4 colonnes. Option C = hybride (3 colonnes mais avec liens canoniques).**

4. **Moments : 4 cards homogènes vs 4 cards Notion typées par profil.**
   - Notion : 4 entrées `profileType` avec longues descriptions (`Le lancement. Vous créez, vous lancez...`).
   - Code : 4 cards courtes avec `tag` (`Mois 1 à 6`, `Plan sur 6 à 12 mois`, `Récurrent`, `Ponctuel`).
   - Les tags `Mois 1 à 6` etc. **n'existent pas dans Notion**.
   - **Recommandation : créer pages Notion pour les tags (P2 normal), ou supprimer les tags du code pour rester aligné Notion.**

5. **Strip marquee : section absente de Notion.**
   - Code : 8 items en marquee (`Branding`, `Sites web`, `Contenus`, `Déploiement`, `Acquisition`, `Conseil stratégique`, `Identité visuelle`, `Direction artistique`).
   - Notion : aucune entrée pour `Strip` ou `Marquee`.
   - **Recommandation : créer une page Notion `Strip - Items marquee` (P2 normal), ou supprimer la section du code si pas validée DA.**

6. **Manifesto : section absente de Notion.**
   - Code : eyebrow `Notre philosophie`, headline `Le cinéma rencontre le tableau de bord.`, body `Chaque projet croise l'œil...`, 3 mini-stats (`+42% CTR moyen`, `×3,4 Conversion`, `98% Rétention`).
   - Notion : aucune entrée Manifesto. La phrase `Le cinéma rencontre le tableau de bord` apparaît uniquement dans `Footer - Tagline` mais celui-ci porte le wording complet `Agence créative au service de votre croissance. On comprend. On conçoit. On construit.`.
   - **Recommandation : créer pages Notion pour Manifesto (P2 normal) si la section reste, ou supprimer la section si pas validée DA.**

---

## Détail par section

### Section : Hero (7 entrées Notion validées)

#### Hero - Phrase d'accroche
- Notion ID : `3459ea1e-2812-81bc-8e88-ded543ad2186`
- Type : Titre · Statut : Validé FR · Priorité : P0 critique · Date validation : 2026-04-17
- Version FR Notion : `On identifie ce qui bloque votre croissance. On construit ce qui performe.`
- Code (`homeHero.tagline` dans HeroSection COPY.fr) : `On identifie ce qui bloque votre croissance. On construit ce qui performe.`
- Catégorie : **OK**
- Action : aucune (synchroniser le wording dans home-fallback.ts si pas encore centralisé là, le HeroSection garde son COPY local).

#### Hero - Sous-titre
- Notion ID : `3459ea1e-2812-81a5-9cac-f2c09dcbab8b`
- Type : Sous-titre · Validé FR · P0 critique
- Notion FR : `Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.`
- Code (`homeHero.subtitle` HeroSection) : `Une agence qui comprend votre business avant de proposer. Communication stratégique, design, vidéo, site web. Construits sur-mesure, pensés pour convertir.`
- Catégorie : **OK**

#### Hero - Badge positionnement
- Notion ID : `3459ea1e-2812-81a2-89bd-c9fbff9d978a`
- Type : Label · Validé FR · P0 critique
- Notion FR : `AGENCE DE COMMUNICATION PREMIUM`
- Code (HeroSection COPY.fr.badge) : `AGENCE DE COMMUNICATION PREMIUM`
- Catégorie : **OK**

#### Hero - Trust badge 1
- Notion ID : `3459ea1e-2812-8158-aec4-d57212839778`
- Type : Label · Validé FR · P1 important
- Notion FR : `Une seule agence, un seul interlocuteur`
- Code : `Une seule agence, un seul interlocuteur`
- Catégorie : **OK**

#### Hero - Trust badge 2
- Notion ID : `3459ea1e-2812-81ce-a1b6-d88a1f448273`
- Type : Label · Validé FR · P1 important
- Notion FR : `Approche sur-mesure, jamais de template`
- Code : `Approche sur-mesure, jamais de template`
- Catégorie : **OK**

#### Hero - Trust badge 3
- Notion ID : `3459ea1e-2812-811e-8967-df0c9fcd31a0`
- Type : Label · Validé FR · P1 important
- Notion FR : `ROI mesurable sur chaque projet`
- Code : `ROI mesurable sur chaque projet`
- Catégorie : **OK**

#### Hero - CTA secondaire
- Notion ID : `3459ea1e-2812-814d-8f96-c0033c992a7e`
- Type : CTA · Validé FR · P0 critique
- Notion FR : `Prendre rendez-vous directement pour un appel gratuit de 30 minutes`
- Code : actuellement non utilisé directement dans HeroSection (pas de CTA secondaire visible). Le code utilise la trust row + scroll indicator à la place.
- Catégorie : **ABSENT CODE**
- Action : décider si ce CTA doit revenir dans le Hero (ex : sous l'IRIS card) ou s'il a été remplacé par le scroll indicator.

#### Hero - Signature de marque
- Notion ID : `3459ea1e-2812-81c4-8672-caf4d3ee3c26`
- Statut : **Archivé** (note : "Décision prise de ne PAS afficher de signature de marque dans le hero")
- Action : aucune, signaler en commentaire le statut archivé.

---

### Section : Offres (7 entrées Notion validées)

#### Offres - Titre section
- Notion ID : `3459ea1e-2812-81e0-930c-d506d9ceca93`
- Type : Titre · Validé FR · P1
- Notion FR : `Cinq leviers pour transformer votre business.`
- Code (`homeOffres.headline` reconstitué : `before + italic + after`) : `Cinq leviers pour transformer votre business.`
- Catégorie : **OK**

#### Offres - Sous-titre section
- Notion ID : `3459ea1e-2812-81cd-a280-d0c05b8e1399`
- Type : Sous-titre · Validé FR · P1
- Notion FR : `Chaque levier répond à un moment précis de votre croissance. On vous aide à choisir le bon.`
- Code (`homeOffres.sub`) : `Une équipe intégrée qui orchestre chaque levier, du positionnement à l'acquisition. Cohérence, mesure, durée.`
- Catégorie : **IMPORTANT**
- Action : remplacer le sous-titre code par celui de Notion.

#### Offres - Carte Branding
- Notion ID : `3459ea1e-2812-81b3-9bdf-db36c65e5aa0`
- Type : Promesse courte · Validé FR · P1
- Notion FR : `Titre carte Branding et Identité de marque. Promesse : Structurez la perception de votre marque avant de la dessiner.`
- Code titre : `Branding et Identité de marque` ; Code promesse : `Structurez la perception de votre marque avant de la dessiner.`
- Catégorie : **OK** (les deux fragments correspondent)

#### Offres - Carte Sites et Plateformes
- Notion ID : `3459ea1e-2812-81a8-a9e5-c289aaced50f`
- Type : Promesse courte · Validé FR · P1
- Notion FR : `Titre carte Sites et Plateformes digitales. Promesse : Un site qui ne présente pas. Un site qui convertit.`
- Code titre : `Sites et Plateformes digitales` ; Code promesse : `Un site qui ne présente pas. Un site qui convertit.`
- Catégorie : **OK**

#### Offres - Carte Création et production de contenus
- Notion ID : `3459ea1e-2812-81ce-883b-e72136b82f34`
- Type : Promesse courte · Validé FR · P1
- Notion FR : `Titre carte Création et production de contenus. Promesse : Le contenu comme actif stratégique, pas comme livrable esthétique.`
- Code titre : `Création et production de contenus` ; Code promesse : `Le contenu comme actif stratégique, pas comme livrable unique.`
- Catégorie : **MINEUR** (différence : `unique` au lieu de `esthétique`)
- Action : remplacer `unique` par `esthétique`.

#### Offres - Carte Déploiement et supports de marque
- Notion ID : `3459ea1e-2812-81d5-a9b2-ced673867a1c`
- Type : Promesse courte · Validé FR · P1
- Notion FR : `Titre carte Déploiement et supports de marque. Promesse : Le support est secondaire. La perception qu'il crée est centrale.`
- Code : `Le support est secondaire. La perception qu'il crée est centrale.`
- Catégorie : **OK**

#### Offres - Carte Acquisition et réputation digitale
- Notion ID : `3489ea1e-2812-81e7-a3b6-ec7aa3b86b8b`
- Type : Promesse courte · Validé FR · P1
- Notion FR : `Titre carte Acquisition et réputation digitale. Promesse : Visibilité, perception, conversion. Les trois alignés ou aucun résultat.`
- Code : `Visibilité, perception, conversion. Les trois alignés ou aucun résultat.`
- Catégorie : **OK**

#### Offres - Passerelle vers Conseil
- Notion ID : `3459ea1e-2812-8179-bccd-c393cdce271b`
- Statut : **Archivé** (note : "Le Conseil devient transversal à chaque offre")
- Action : aucune, signaler en commentaire.

---

### Section : Chiffres (3 stats validés + transition + titres)

#### Chiffres - Titre section
- Notion ID : `3459ea1e-2812-8147-bce8-e9d2acd341aa`
- Type : Titre · Validé FR · P1
- Notion FR : `Ce que Paradeyes construit, en chiffres.`
- Code (`homeChiffres.headline`) : `Soixante marques accompagnées depuis 2019.`
- Catégorie : **IMPORTANT**

#### Chiffres - Sous-titre section
- Notion ID : `3459ea1e-2812-81bb-a09b-fe06c80d7524`
- Type : Sous-titre · Validé FR · P1
- Notion FR : `Pas de storytelling. Juste des faits.`
- Code (`homeChiffres.sub`) : `Du groupe mondial au label indépendant, des équipes exigeantes qui attendent un niveau d'exécution sans compromis.`
- Catégorie : **IMPORTANT**

#### Chiffres - Stat 1
- Notion ID : `3459ea1e-2812-817a-be51-c75d615972c4`
- Type : Label · Validé FR · P1
- Notion FR : `60+ marques accompagnées. De Mini à Magnum, des artisans premium aux PME en croissance.`
- Code : `60+` label `Marques`, caption `Accompagnées depuis 2019 sur au moins un levier majeur.`
- Catégorie : **STRUCTUREL** (Notion = un seul bloc texte, code = valeur + label + caption distincts)

#### Chiffres - Stat 2
- Notion ID : `3459ea1e-2812-812d-b17f-c5c4ba4953a5`
- Type : Label · Validé FR · P1
- Notion FR : `7+ années d'expertise. Construite auprès de marques exigeantes, désormais structurée en agence.`
- Code : `7 ans` label `Expertise`, caption `Rayonnement international depuis Cannes.`
- Catégorie : **STRUCTUREL** + **IMPORTANT** (caption divergent)

#### Chiffres - Stat 3
- Notion ID : `3459ea1e-2812-8195-b4be-efbfba9c10ed`
- Type : Label · Validé FR · P1
- Notion FR : `90%+ de clients fidèles. Ils reviennent. Plusieurs fois.`
- Code : `98%` label `Fidélité`, caption `De nos clients renouvellent leur collaboration.`
- Catégorie : **IMPORTANT** (le pourcentage Notion est `90%+`, le code dit `98%`)

#### Chiffres - Stat 4 (Archivé)
- Statut : Archivé. Bloc finalisé avec 3 stats. Quatrième stat non retenue.
- Code : la stat 4 (`×3,4 Impact`) existe mais n'est PAS validée dans Notion.
- Catégorie : **STRUCTUREL** (à supprimer du code)

#### Chiffres - Transition vers méthode
- Notion ID : `3459ea1e-2812-8148-9f6c-c373af828b73`
- Type : Titre · Validé FR · P1
- Notion FR : `Ces chiffres racontent une méthode. La voici.`
- Code : aucun équivalent affiché actuellement.
- Catégorie : **ABSENT CODE**

---

### Section : Méthode (4 étapes + titres)

#### Méthode - Titre section
- Notion ID : `3459ea1e-2812-81ba-8bec-edd65130436b`
- Type : Titre · Validé FR · P1
- Notion FR : `La méthode Paradeyes.`
- Code (`homeMethode.headline`) : `Quatre temps. Aucun détour.`
- Catégorie : **IMPORTANT**

#### Méthode - Sous-titre section
- Notion ID : `3459ea1e-2812-8120-8b6e-f2aa68835e0e`
- Type : Sous-titre · Validé FR · P1
- Notion FR : `Quatre étapes. Un seul cap : votre croissance.`
- Code (`homeMethode.sub`) : `Une méthode resserrée, pensée pour éliminer le bruit. Chaque phase a un livrable, une décision, un jalon.`
- Catégorie : **IMPORTANT**

#### Méthode - Étape 1 Comprendre
- Notion ID : `3459ea1e-2812-81ac-8695-d778824ab262`
- Type : Paragraphe · Validé FR · P1
- Notion FR : `01 Comprendre. On s'imprègne de votre business, de vos enjeux, de votre marché. Pas de solution avant le diagnostic.`
- Code : titre `Comprendre`, headline `On comprend votre business avant de proposer.`, description `Audit, entretiens, lecture de la data. On repart de la vérité du terrain, pas d'un template réutilisé.`
- Catégorie : **IMPORTANT** (formulation différente)

#### Méthode - Étape 2 Concevoir
- Notion ID : `3459ea1e-2812-81ac-af5d-cb890e2c4b1f`
- Type : Paragraphe · Validé FR · P1
- Notion FR : `02 Concevoir. On construit une stratégie créative alignée sur vos objectifs business. Chaque recommandation répond à un enjeu identifié.`
- Code : description `Territoire de marque, design système, prototypes. Validés sur pièces, sur des critères mesurables.`
- Catégorie : **IMPORTANT**

#### Méthode - Étape 3 Produire (titre Notion) / Construire (rendu)
- Notion ID : `3459ea1e-2812-81ea-8b51-c217592fea63`
- Notion `Titre du bloc` : `Étape 3 Produire`
- Notion FR : `03 Construire. On livre des outils de communication concrets, pensés pour convertir. Chaque livrable respecte la vision définie ensemble.`
- Code : titre `Construire`, description `Production, intégration, lancement. Chaque livrable respecte la vision définie ensemble.`
- Catégorie : **IMPORTANT** (description différente, dernier morceau aligné)

#### Méthode - Étape 4 Faire grandir (titre Notion) / Accompagner (rendu)
- Notion ID : `3459ea1e-2812-8191-8ffd-ee06892e6918`
- Notion `Titre du bloc` : `Étape 4 Faire grandir`
- Notion FR : `04 Accompagner. On accompagne dans la durée pour que chaque action génère du retour. La livraison n'est pas la fin, c'est le début.`
- Code : titre `Accompagner`, headline `La livraison n'est pas la fin. C'est le début.` (presque identique), description `Suivi, optimisation, reporting. Chaque action génère du retour mesurable et documenté.`
- Catégorie : **MINEUR** sur la headline, **IMPORTANT** sur la description.

---

### Section : Moments de croissance (4 paragraphes + titres)

#### Moments - Titre section
- Notion ID : `3459ea1e-2812-8125-8d83-cce68bfe2cad`
- Type : Titre · Validé FR · P1
- Notion FR : `À quel moment de votre croissance nous vous rejoignons ?`
- Code (`homeMoments.headline`) : `On accompagne aux moments décisifs.`
- Catégorie : **IMPORTANT**

#### Moments - Le lancement
- Notion ID : `3459ea1e-2812-8158-b065-e59a70de8427`
- Type : Paragraphe · Validé FR · P1
- Notion FR : `Le lancement. Vous créez, vous lancez, vous ouvrez. Tout est à construire en partant d'une page blanche. On pose les fondations d'une communication cohérente dès le départ.`
- Code : titre `Lancement`, description `Vous lancez un produit, une marque ou un projet. Il faut exister vite, avec impact, sans bavure.`, tag `Mois 1 à 6`
- Catégorie : **IMPORTANT** (formulation différente, le tag mensuel est ABSENT NOTION)

#### Moments - Le repositionnement
- Notion ID : `3459ea1e-2812-81c9-8f23-f1b689d7f2c6`
- Notion FR : `Le repositionnement. Votre activité existe, elle tourne, mais votre image n'est plus alignée avec votre niveau actuel. L'écart se creuse entre ce que vous valez et ce qu'on voit de vous.`
- Code : description `Votre marque a évolué, votre marché aussi. Il est temps d'aligner perception et réalité.`, tag `Plan sur 6 à 12 mois`
- Catégorie : **IMPORTANT** + tag absent Notion

#### Moments - L'accélération
- Notion ID : `3459ea1e-2812-8136-a933-c73e8ce36f5f`
- Notion FR : `L'accélération. Votre business performe, votre marché s'ouvre. Vous voulez passer au niveau supérieur et capturer la croissance qui se présente. On construit les outils pour y aller.`
- Code : description `Vos fondamentaux fonctionnent. On vient amplifier, professionnaliser, mesurer.`, tag `Récurrent`
- Catégorie : **IMPORTANT** + tag absent Notion

#### Moments - L'événement stratégique
- Notion ID : `3459ea1e-2812-818c-a7f1-fd1e3fbf37e2`
- Notion FR : `L'événement stratégique. Un lancement produit, un salon, une levée de fonds, une ouverture, une campagne ciblée. Vous avez besoin d'une communication qui performe sur un moment précis, avec un rendu à la hauteur de l'enjeu.`
- Code : description `Salon, levée, lancement majeur. Une fenêtre étroite, une exécution sans erreur possible.`, tag `Ponctuel`
- Catégorie : **IMPORTANT** + tag absent Notion

#### Moments - Phrase de sortie
- Notion ID : `3459ea1e-2812-8145-98a6-c0a9b31c72fc`
- Type : CTA · Validé FR · P1
- Notion FR : `Votre situation ne figure pas ici ? Parlez-en à IRIS, on trouvera ensemble.`
- Code : aucun équivalent affiché.
- Catégorie : **ABSENT CODE**

---

### Section : Études de cas (titres uniquement, contenu carousel à part)

#### Études de cas - Titre section
- Notion ID : `3459ea1e-2812-81bc-b907-f2eb4464c7fa`
- Type : Titre · Validé FR · P1
- Notion FR : `Des projets, des résultats.`
- Code (`homeCases.headline`) : `Des projets livrés, des marques transformées.`
- Catégorie : **IMPORTANT**

#### Études de cas - Sous-titre section
- Notion ID : `3469ea1e-2812-8189-a15f-c7658d441bb7`
- Type : Sous-titre · Validé FR · P1
- Notion FR : `Chaque projet est une réponse sur-mesure à un enjeu précis.`
- Code : aucun sous-titre affiché actuellement (le composant Cases utilise uniquement headline + carousel).
- Catégorie : **ABSENT CODE**

Note : les 4 cas du carousel (`Ciné Cascade`, `Permobil, Salon 2025`, `Magnum, refonte digitale`, `Maison artisan premium`) **ne sont PAS dans Notion** (sections "Études de cas" Notion ne contiennent que titre/sous-titre/structure, pas le contenu). Le contenu réel des cas vivra dans Sanity (`caseStudy`). Improvisations actuelles dans home-fallback.ts.

---

### Section : Témoignages (titre + structure)

#### Témoignages - Titre section
- Notion ID : `3459ea1e-2812-8116-9236-ce96635f0fad`
- Type : Titre · Validé FR · P1
- Notion FR : `Ils en parlent mieux que nous.`
- Code (`homeTestimonials.headline`) : `Ce qu'on entend, en mieux.`
- Catégorie : **IMPORTANT**

Note : les 4 témoignages (Marine D., Thomas L., Sophie R., Alexandre P.) ne sont PAS dans Notion (Type `Citation` non rempli). Improvisations.

---

### Section : Journal preview (entrée Notion non trouvée pour la home)

Le code contient `homeJournal` (eyebrow `Journal`, headline `Notes, analyses, convictions.`, sub `Trois articles par mois sur la croissance, le branding, la mesure d'impact.`, cta `Voir tous les articles`, 3 articles).

Notion : aucune entrée trouvée avec section `Journal preview` ou similaire (les pages `Page Journal` couvrent la page complète, pas le bloc preview de la home).

Catégorie : **ABSENT NOTION** entièrement.

---

### Section : FAQ (8 questions + titres + CTA)

#### FAQ - Titre section
- Notion ID : `3469ea1e-2812-81b8-849d-d7720777f1b7`
- Type : Titre · Validé FR · P1
- Notion FR : `Questions fréquentes.`
- Code (`homeFaq.headline`) : `Avant de nous appeler, lisez ceci.`
- Catégorie : **IMPORTANT**

#### FAQ - Sous-titre
- Notion ID : `3469ea1e-2812-8199-98a5-f05f63495a0d`
- Type : Sous-titre · Validé FR · P1
- Notion FR : `Si votre question n'est pas là, parlez-en à IRIS ou réservez un appel.`
- Code : aucun sous-titre.
- Catégorie : **ABSENT CODE**

#### FAQ - Question 1 (budget) à Question 8 (sélectivité)
Notion contient **8 questions** (Q1 budget, Q2 durée, Q3 géographie, Q4 process, Q5 différenciation, Q6 réseaux sociaux, Q7 démarrer, Q8 sélectivité).

Code contient **5 questions** (`Combien coûte un projet`, `Combien de temps`, `France et international`, `Reprendre projet existant`, `Mesure d'impact`).

| Notion | Code (mapping approximatif) | Catégorie |
|---|---|---|
| Q1 budget | `Combien coûte un projet` | **IMPORTANT** (formulation différente) |
| Q2 durée | `Combien de temps` | **IMPORTANT** |
| Q3 géographie | `France et international` | **IMPORTANT** |
| Q4 process | (absent code) | **ABSENT CODE** |
| Q5 différenciation | (absent code) | **ABSENT CODE** |
| Q6 réseaux sociaux | (absent code) | **ABSENT CODE** |
| Q7 démarrer | (absent code) | **ABSENT CODE** |
| Q8 sélectivité | (absent code) | **ABSENT CODE** |
| (absent Notion) | `Reprendre projet existant` | **ABSENT NOTION** |
| (absent Notion) | `Mesure d'impact` | **ABSENT NOTION** |

**Catégorie globale FAQ : STRUCTUREL** (5 vs 8, mapping incomplet, formulations divergentes).

---

### Section : CTA final (titre + sous-titre)

#### CTA final - Titre
- Notion ID : `3459ea1e-2812-81e2-842f-cb5601aae00e`
- Type : Titre · Validé FR · P0 critique
- Notion FR : `Parlons de votre projet maintenant.`
- Code (`homePreFooter.headline` reconstitué) : `On comprend votre projet en 30 minutes.`
- Catégorie : **IMPORTANT**

#### CTA final - Sous-titre
- Notion ID : `3459ea1e-2812-8174-b613-e9a8471cd9a9`
- Type : Sous-titre · Validé FR · P0 critique
- Notion FR : `30 minutes d'appel gratuit. Sans engagement. Des recommandations concrètes à la clé.`
- Code (`homePreFooter.sub`) : `Pas de présentation commerciale. Pas de slides. Une discussion, des bonnes questions, un avis honnête.`
- Catégorie : **IMPORTANT**

Notion contient aussi des entrées P2 sur l'architecture du CTA final (Note d'architecture, Zone IRIS description, Zone Calendly description, Zone Calendly titre) qui sont des spécifications de structure plus que des wordings rendus. Non traités ici.

---

### Section : Footer

#### Footer - Tagline
- Notion ID : `3459ea1e-2812-814b-a8cf-db6daab0fb3e`
- Type : Titre · Validé FR · P1
- Notion FR : `Agence créative au service de votre croissance. On comprend. On conçoit. On construit.`
- Code Footer : baseline `Le cinéma rencontre le tableau de bord.`
- Catégorie : **IMPORTANT** (le code utilise une autre baseline)

#### Footer - Structure colonnes (3 colonnes)
- Notion ID : `3459ea1e-2812-8175-80ef-c116ab1ccd37`
- Notion FR : `3 colonnes. Colonne 1 Paradeyes. Colonne 2 Services. Colonne 3 Contact.`
- Code : 4 colonnes (id, nav `Plan du site`, contact, social).
- Catégorie : **STRUCTUREL** (voir arbitrage 3).

#### Footer - Colonne 1 Paradeyes
- Notion ID : `3469ea1e-2812-81ff-8991-d835bcb1e171`
- Notion FR : `A propos | Journal | Mentions légales`
- Code colonne nav : `Agence | Réalisations | Journal | FAQ | Contact`
- Catégorie : **STRUCTUREL** + **IMPORTANT** (libellés différents)

#### Footer - Colonne 2 Services
- Notion ID : `3469ea1e-2812-8187-a154-ce0c6b751dcd`
- Notion FR : `Identité de marque | Site web sur-mesure | Vidéo et captation | Lancement complet | Conseil et stratégie créative`
- Code : pas de colonne Services. Les 5 offres canoniques sont dans `homeOffres`, pas affichées en footer.
- Catégorie : **STRUCTUREL** + **ABSENT CODE** (la colonne Services n'existe pas dans le footer actuel).

#### Footer - Colonne 3 Contact
- Notion ID : `3469ea1e-2812-81b3-b529-fb6e3502cd08`
- Notion FR : `hello@paradeyesagency.com | Réserver un appel | LinkedIn | Instagram`
- Code colonne contact : `hello@paradeyesagency.com` + `PARIS - CANNES` + `Du lundi au vendredi, 9h à 19h`
- Code colonne social : `LinkedIn | Instagram`
- Catégorie : **STRUCTUREL** (ces deux colonnes code = colonne 3 Notion concaténée). Wordings ville et horaires absents Notion.

#### Footer - Copyright
- Notion ID : `3469ea1e-2812-8133-990c-c1876c345f16`
- Type : Label · Validé FR · P1
- Notion FR : `© Paradeyes Agency. Tous droits réservés.`
- Code : `© {year} Paradeyes Agency. Tous droits réservés.` (avec année dynamique).
- Catégorie : **MINEUR** (l'année dynamique 2026 vs absence d'année dans Notion)

---

### Section : Signature de marque

#### Signature de marque globale FR
- Notion ID : `3469ea1e-2812-8196-8e5a-d7fc2d634d0c`
- Type : Signature · Validé FR · P0 critique
- Notion FR : `Agence créative au service de votre croissance. On comprend. On conçoit. On construit.`
- Code : pas affichée comme signature centralisée. Le footer contient `Le cinéma rencontre le tableau de bord.` comme baseline. Le marquee footer reprend `On comprend. On conçoit. On construit.`.
- Catégorie : **IMPORTANT** + **ABSENT CODE** (la signature complète n'est pas affichée en bloc).

---

## Wordings code SANS source Notion (improvisations)

### Strip marquee — section entière absente Notion
8 items affichés (`Branding`, `Sites web`, `Contenus`, `Déploiement`, `Acquisition`, `Conseil stratégique`, `Identité visuelle`, `Direction artistique`).
**Recommandation** : créer page Notion `Strip - Items marquee` (P2 normal), ou supprimer la section.

### Manifesto — section entière absente Notion
- Eyebrow `Notre philosophie`
- Headline `Le cinéma rencontre le tableau de bord.`
- Body `Chaque projet croise l'œil d'un réalisateur et la rigueur d'un analyste. L'intention crée le signal. La mesure garantit l'impact.`
- 3 mini-stats (`+42% CTR moyen`, `×3,4 Conversion`, `98% Rétention`)

**Recommandation** : créer 5 pages Notion (P2 normal), ou supprimer la section.

### Moments tags
`Mois 1 à 6`, `Plan sur 6 à 12 mois`, `Récurrent`, `Ponctuel` — non validés Notion.

### Hero IRIS placeholder + irisLead + suggestions
- `Décrivez votre projet. IRIS vous oriente en 2 minutes.`
- `Qu'aimeriez-vous améliorer pour rendre votre business plus performant ?`
- 6 chips (`Branding`, `Site web`, `Contenus`, `Déploiement`, `Acquisition`, `Événement`)
Notion : section `Barre IRIS persistante` existe (hors scope home selon filtres) mais ces wordings spécifiques home Hero IRIS n'ont pas été trouvés.

### FAQ Q (Reprendre projet existant) + Q (Mesure d'impact)
2 questions code sans entrée Notion correspondante. Les 6 autres Q Notion (Q4 process, Q5 différenciation, Q6 réseaux sociaux, Q7 démarrer, Q8 sélectivité) ne sont pas dans le code.

### Cases (4 réalisations) + Testimonials (4 quotes) + Journal articles (3)
Improvisations entières du code, à terme remplacées par Sanity (`caseStudy`, `testimonial`, `article`).

### Footer baseline `Le cinéma rencontre le tableau de bord.`
Improvisation. Notion donne `Footer - Tagline` = `Agence créative au service de votre croissance. On comprend. On conçoit. On construit.`

### Footer city/hours `PARIS - CANNES` + `Du lundi au vendredi, 9h à 19h`
Improvisations. Notion ne contient pas ces wordings dans la home (peut-être dans `Page Contact`, hors scope).

### Hero CTA principal "Un appel gratuit de 30 min" du Header
Le Header CTA (`Un appel gratuit de 30 min`) est cohérent avec l'esprit Notion (CTA appel gratuit) mais l'entrée exacte n'a pas été trouvée pour la section `Header`.

---

## Wordings Notion SANS implémentation code

| Notion | Statut | Action recommandée |
|---|---|---|
| Hero - CTA secondaire (`Prendre rendez-vous directement pour un appel gratuit de 30 minutes`) | Validé FR · P0 | Décider si réintégrer dans le Hero (sous IRIS card) |
| Chiffres - Transition vers méthode (`Ces chiffres racontent une méthode. La voici.`) | Validé FR · P1 | Ajouter en bas de la section Chiffres |
| Moments - Phrase de sortie (`Votre situation ne figure pas ici ? Parlez-en à IRIS, on trouvera ensemble.`) | Validé FR · P1 | Ajouter en bas de la section Moments |
| Études de cas - Sous-titre section (`Chaque projet est une réponse sur-mesure à un enjeu précis.`) | Validé FR · P1 | Ajouter en sous-titre Cases |
| FAQ - Sous-titre (`Si votre question n'est pas là, parlez-en à IRIS ou réservez un appel.`) | Validé FR · P1 | Ajouter en sous-titre FAQ |
| FAQ Questions 4-8 (process, différenciation, réseaux sociaux, démarrer, sélectivité) | Validé FR · P1 | Compléter le code de 5 à 8 questions |
| Footer - Tagline complète (`Agence créative au service de votre croissance. On comprend. On conçoit. On construit.`) | Validé FR · P1 | Remplacer la baseline `Le cinéma rencontre le tableau de bord.` |
| Signature de marque globale FR | Validé FR · P0 | Adopter comme tagline footer ou ailleurs |

---

## Recommandations finales

### Priorité 1 (avant synchronisation, arbitrage Basilide indispensable)
1. **Trancher la structure Méthode 4 étapes** : le code utilise `Construire` + `Accompagner`, le titre Notion utilise `Produire` + `Faire grandir`. Le contenu Notion confirme `Construire` + `Accompagner`. **Recommandation : aligner les titres de bloc Notion sur `Construire` et `Accompagner` pour cohérence.**
2. **Trancher Chiffres : 3 stats vs 4 stats** : Notion = 3 stats validés + 1 archivé. Le code en a 4. **Recommandation : retirer la 4e stat (`Impact ×3,4`) du code.**
3. **Trancher Footer : 3 colonnes (Notion) vs 4 colonnes (code)** : changement structurel important. Décision DA nécessaire.
4. **Trancher l'existence de Strip marquee et Manifesto** : sections présentes dans le code, absentes de Notion. **Recommandation : créer pages Notion P2 si elles restent. Sinon supprimer.**

### Priorité 2 (synchronisation simple)
5. Corriger la promesse Carte Création : `unique` → `esthétique`.
6. Remplacer `homeOffres.sub` par le sous-titre Notion.
7. Aligner Chiffres titre + sous-titre + valeurs (60+/7+/90%+) + captions sur Notion.
8. Aligner Méthode titre + sous-titre + 4 paragraphes étapes sur Notion.
9. Aligner Moments titre + 4 paragraphes sur Notion (en gardant ou retirant les tags selon arbitrage).
10. Aligner Études de cas titre + ajouter sous-titre.
11. Aligner Témoignages titre.
12. Aligner CTA final / PreFooter titre + sous-titre.
13. Aligner Footer copyright (gérer l'année dynamique).
14. Adopter la Signature de marque globale FR (`Agence créative au service de votre croissance...`) comme tagline canonique.

### Priorité 3 (compléments)
15. Ajouter les 5 questions FAQ manquantes dans le code (Q4, Q5, Q6, Q7, Q8 Notion).
16. Réintégrer Hero CTA secondaire si décision de le faire revenir.
17. Ajouter les phrases de transition manquantes (Chiffres transition, Moments phrase de sortie, FAQ sous-titre, Études sous-titre).

### À ne PAS faire avant arbitrage
- Modifier la structure Footer (3 cols vs 4 cols).
- Supprimer les sections Strip marquee ou Manifesto.
- Modifier les noms d'étapes Méthode (Construire/Accompagner sont déjà cohérents avec le contenu Notion).

---

## Note de méthode

Cet audit a été conduit en 75 minutes via 14 recherches Notion + 47 fetch de pages individuelles. Les pages avec statuts `À rédiger`, `En cours`, `À valider par Basilide` ont été ignorées (aucune trouvée pour les sections home). Les statuts `Archivé` ont été signalés comme commentaires informatifs. Aucune page avec statut `Validé EN` ou `Validé FR+EN` rencontrée (l'EN n'a pas encore été produit pour la home).

Le rapport ne traite pas les sections suivantes (hors scope) : Page Agence, Page Contact, Page Espace Client, Page Réalisations, Page Journal, 5 pages Offres détaillées, Blog, SEO, Légal, Problèmes, Barre IRIS persistante. Ces sections feront l'objet d'audits séparés lors de leurs sessions respectives.
