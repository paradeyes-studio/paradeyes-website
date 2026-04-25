/**
 * Authoritative fallback wordings for the home page.
 * Synchronized with Notion Wording database (collection
 * 4511498a-227f-4b3d-9064-ebae3924a989) on 2026-04-25.
 *
 * 44 Notion wordings validated (Validé FR) + Basilide arbitrages applied:
 * - Manifesto section removed entirely (not in Notion).
 * - Chiffres reduced to 3 stats (Stat 4 archived in Notion).
 * - Moments tags removed (Mois 1 à 6 etc., not in Notion).
 * - Footer baseline replaced by Signature de marque globale FR.
 * - Strip kept as-is (Notion pages "À valider par Basilide" pending).
 *
 * Audit reference: docs/wordings/notion-export-2026-04-25.md (commit 58fce0d).
 *
 * Rules:
 * - vouvoiement only
 * - no emoji
 * - no em-dash / en-dash (use ".", ",", ":", "·")
 * - palette references stay symbolic (use tokens, not hex)
 */

// TODO Notion sync : Strip items pending validation (8 pages "À valider par Basilide" Notion)
export const homeStrip = {
  items: [
    "Branding",
    "Sites web",
    "Contenus",
    "Déploiement",
    "Acquisition",
    "Conseil stratégique",
    "Identité visuelle",
    "Direction artistique",
  ],
} as const;

export const homeOffres = {
  eyebrow: "Nos offres",
  headline: {
    before: "Cinq leviers pour ",
    italic: "transformer",
    after: " votre business.",
  },
  // Notion 3459ea1e-2812-81cd-a280-d0c05b8e1399 (Validé FR)
  sub: "Chaque levier répond à un moment précis de votre croissance. On vous aide à choisir le bon.",
  cards: [
    {
      number: "01",
      tag: "Branding",
      title: "Branding et Identité de marque",
      titleItalic: "marque",
      // Notion 3459ea1e-2812-81b3-9bdf-db36c65e5aa0 (Validé FR)
      promise: "Structurez la perception de votre marque avant de la dessiner.",
      glyph: "Æ",
      // TODO Notion sync : livrables et durée non validés Notion
      livrables: [
        "Plateforme de marque et naming",
        "Système d'identité visuelle complet",
        "Charte d'usage et déploiement",
      ],
      duration: "03 livrables · 6-10 sem.",
      href: "/offres/branding",
    },
    {
      number: "02",
      tag: "Site web",
      title: "Sites et Plateformes digitales",
      titleItalic: "Plateformes",
      // Notion 3459ea1e-2812-81a8-a9e5-c289aaced50f (Validé FR)
      promise: "Un site qui ne présente pas. Un site qui convertit.",
      glyph: "⌘",
      livrables: [
        "Design hi-fi et prototypes",
        "Développement sur-mesure",
        "Analytics et optimisation",
      ],
      duration: "03 livrables · 8-12 sem.",
      href: "/offres/sites-et-plateformes",
    },
    {
      number: "03",
      tag: "Contenus",
      title: "Création et production de contenus",
      titleItalic: "production",
      // Notion 3459ea1e-2812-81ce-883b-e72136b82f34 (Validé FR), corrigé "unique" -> "esthétique"
      promise:
        "Le contenu comme actif stratégique, pas comme livrable esthétique.",
      glyph: "◉",
      livrables: [
        "Films, photos, éditorial",
        "De l'écriture au montage",
        "Diffusion et mesure d'impact",
      ],
      duration: "récurrent · 3-12 mois",
      href: "/offres/creation-de-contenus",
    },
    {
      number: "04",
      tag: "Déploiement",
      title: "Déploiement et supports de marque",
      titleItalic: "supports",
      // Notion 3459ea1e-2812-81d5-a9b2-ced673867a1c (Validé FR)
      promise:
        "Le support est secondaire. La perception qu'il crée est centrale.",
      glyph: "❋",
      livrables: [
        "Print premium et signalétique",
        "Stand, événementiel, scénographie",
        "Activations physiques",
      ],
      duration: "ponctuel · 2-8 sem.",
      href: "/offres/deploiement-et-supports",
    },
    {
      number: "05",
      tag: "Acquisition",
      title: "Acquisition et réputation digitale",
      titleItalic: "réputation",
      // Notion 3489ea1e-2812-81e7-a3b6-ec7aa3b86b8b (Validé FR)
      promise:
        "Visibilité, perception, conversion. Les trois alignés ou aucun résultat.",
      glyph: "↗",
      livrables: [
        "Stratégie SEO et éditorial",
        "Campagnes Ads et social paid",
        "Reporting et optimisation",
      ],
      duration: "récurrent · 6-12 mois",
      href: "/offres/acquisition-et-reputation",
    },
  ],
} as const;

export const homeMoments = {
  eyebrow: "Quatre moments de croissance",
  headline: {
    // Notion 3459ea1e-2812-8125-8d83-cce68bfe2cad (Validé FR)
    before: "À quel ",
    italic: "moment",
    after: " de votre croissance nous vous rejoignons ?",
  },
  // TODO Notion sync : sous-titre Moments non validé Notion
  sub: "Chaque levier répond à un moment précis. Identifiez le vôtre, on vous oriente vers la bonne combinaison.",
  items: [
    {
      number: "01",
      title: "Lancement",
      // Notion 3459ea1e-2812-8158-b065-e59a70de8427 (Validé FR)
      description:
        "Vous créez, vous lancez, vous ouvrez. Tout est à construire en partant d'une page blanche. On pose les fondations d'une communication cohérente dès le départ.",
    },
    {
      number: "02",
      title: "Repositionnement",
      // Notion 3459ea1e-2812-81c9-8f23-f1b689d7f2c6 (Validé FR)
      description:
        "Votre activité existe, elle tourne, mais votre image n'est plus alignée avec votre niveau actuel. L'écart se creuse entre ce que vous valez et ce qu'on voit de vous.",
    },
    {
      number: "03",
      title: "Accélération",
      // Notion 3459ea1e-2812-8136-a933-c73e8ce36f5f (Validé FR)
      description:
        "Votre business performe, votre marché s'ouvre. Vous voulez passer au niveau supérieur et capturer la croissance qui se présente. On construit les outils pour y aller.",
    },
    {
      number: "04",
      title: "Événement stratégique",
      // Notion 3459ea1e-2812-818c-a7f1-fd1e3fbf37e2 (Validé FR)
      description:
        "Un lancement produit, un salon, une levée de fonds, une ouverture, une campagne ciblée. Vous avez besoin d'une communication qui performe sur un moment précis, avec un rendu à la hauteur de l'enjeu.",
    },
  ],
  // Notion 3459ea1e-2812-8145-98a6-c0a9b31c72fc (Validé FR)
  outroCta:
    "Votre situation ne figure pas ici ? Parlez-en à IRIS, on trouvera ensemble.",
} as const;

export const homeChiffres = {
  eyebrow: "Ils nous font confiance",
  headline: {
    // Notion 3459ea1e-2812-8147-bce8-e9d2acd341aa (Validé FR)
    before: "Ce que Paradeyes ",
    italic: "construit",
    after: ", en chiffres.",
  },
  // Notion 3459ea1e-2812-81bb-a09b-fe06c80d7524 (Validé FR)
  sub: "Pas de storytelling. Juste des faits.",
  // 3 stats (Stat 4 archivée Notion : "Bloc finalisé avec 3 stats. Quatrième stat non retenue.")
  stats: [
    {
      number: "01",
      label: "Marques accompagnées",
      value: 60,
      suffix: "+",
      // Notion 3459ea1e-2812-817a-be51-c75d615972c4 (Validé FR)
      caption:
        "De Mini à Magnum, des artisans premium aux PME en croissance.",
    },
    {
      number: "02",
      label: "Années d'expertise",
      value: 7,
      suffix: "+",
      // Notion 3459ea1e-2812-812d-b17f-c5c4ba4953a5 (Validé FR)
      caption:
        "Construite auprès de marques exigeantes, désormais structurée en agence.",
    },
    {
      number: "03",
      label: "Clients fidèles",
      value: 90,
      suffix: "%+",
      // Notion 3459ea1e-2812-8195-b4be-efbfba9c10ed (Validé FR)
      caption: "Ils reviennent. Plusieurs fois.",
    },
  ],
  // Notion 3459ea1e-2812-8148-9f6c-c373af828b73 (Validé FR)
  transition: "Ces chiffres racontent une méthode. La voici.",
  clientsLabel: "Sélection de clients · Secteurs confondus",
  clients: [
    "Volkswagen",
    "Mini",
    "Magnum",
    "Air France",
    "Unilever",
    "Amnesty Int.",
    "Elizabeth Arden",
    "Permobil",
  ],
} as const;

export const homeMethode = {
  eyebrow: "Notre méthode",
  headline: {
    // Notion 3459ea1e-2812-81ba-8bec-edd65130436b (Validé FR)
    before: "La ",
    italic: "méthode",
    after: " Paradeyes.",
  },
  // Notion 3459ea1e-2812-8120-8b6e-f2aa68835e0e (Validé FR)
  sub: "Quatre étapes. Un seul cap : votre croissance.",
  timelineLabel: "Timeline projet · ~16 semaines",
  timeline: [
    { label: "Comprendre", duration: "2 sem.", flex: 1 },
    { label: "Concevoir", duration: "5 sem.", flex: 1.4 },
    { label: "Construire", duration: "5 sem.", flex: 1.4 },
    { label: "Accompagner", duration: "récurrent", flex: 1.6 },
  ],
  steps: [
    {
      number: "01",
      tag: "Étape 01",
      title: "Comprendre",
      titleItalic: "Comprendre",
      // TODO Notion sync : headline italic découpée non validée Notion
      headline: {
        before: "On comprend votre business avant de ",
        italic: "proposer",
        after: ".",
      },
      // Notion 3459ea1e-2812-81ac-8695-d778824ab262 (Validé FR), préfixe "01 Comprendre. " retiré
      description:
        "On s'imprègne de votre business, de vos enjeux, de votre marché. Pas de solution avant le diagnostic.",
      // TODO Notion sync : livrables non validés Notion
      livrables: [
        { label: "Audit business et concurrentiel", duration: "10 j" },
        { label: "Entretiens clients et équipes", duration: "2 sem." },
        { label: "Synthèse stratégique écrite", duration: "livrable" },
      ],
    },
    {
      number: "02",
      tag: "Étape 02",
      title: "Concevoir",
      titleItalic: "Concevoir",
      headline: {
        before: "On conçoit ce qui doit exister, pas ce qui est ",
        italic: "à la mode",
        after: ".",
      },
      // Notion 3459ea1e-2812-81ac-af5d-cb890e2c4b1f (Validé FR), préfixe retiré
      description:
        "On construit une stratégie créative alignée sur vos objectifs business. Chaque recommandation répond à un enjeu identifié.",
      livrables: [
        { label: "Plateforme et territoire visuel", duration: "3 sem." },
        { label: "Prototypes haute fidélité", duration: "2 sem." },
        { label: "Revue stratégique conjointe", duration: "jalon" },
      ],
    },
    {
      number: "03",
      tag: "Étape 03",
      title: "Construire",
      titleItalic: "Construire",
      headline: {
        before: "On construit, on mesure, on ",
        italic: "ajuste",
        after: ".",
      },
      // Notion 3459ea1e-2812-81ea-8b51-c217592fea63 (Validé FR), préfixe retiré
      description:
        "On livre des outils de communication concrets, pensés pour convertir. Chaque livrable respecte la vision définie ensemble.",
      livrables: [
        { label: "Production multimédia", duration: "3 sem." },
        { label: "Intégration et déploiement", duration: "2 sem." },
        { label: "Lancement coordonné", duration: "jalon" },
      ],
    },
    {
      number: "04",
      tag: "Étape 04",
      title: "Accompagner",
      titleItalic: "Accompagner",
      headline: {
        before: "La livraison n'est pas la fin. C'est le ",
        italic: "début",
        after: ".",
      },
      // Notion 3459ea1e-2812-8191-8ffd-ee06892e6918 (Validé FR), préfixe retiré
      description:
        "On accompagne dans la durée pour que chaque action génère du retour. La livraison n'est pas la fin, c'est le début.",
      livrables: [
        { label: "Reporting mensuel structuré", duration: "récurrent" },
        { label: "Optimisations continues", duration: "récurrent" },
        { label: "Bilan trimestriel et roadmap", duration: "jalon" },
      ],
    },
  ],
} as const;

export const homeCases = {
  eyebrow: "Réalisations",
  headline: {
    // Notion 3459ea1e-2812-81bc-b907-f2eb4464c7fa (Validé FR)
    before: "Des projets, des ",
    italic: "résultats",
    after: ".",
  },
  // Notion 3469ea1e-2812-8189-a15f-c7658d441bb7 (Validé FR)
  sub: "Chaque projet est une réponse sur-mesure à un enjeu précis.",
  // TODO Notion sync : 4 case studies non validés Notion (vivront dans Sanity caseStudy)
  cases: [
    {
      number: "01",
      total: "04",
      tag: "Branding · Film",
      title: "Ciné Cascade",
      sub: "Festival indépendant de la Côte d'Azur. Refonte d'identité et film de lancement.",
      metrics: [
        { value: "+180%", label: "CTR" },
        { value: "×2,4", label: "engagement" },
        { value: "94%", label: "recall" },
      ],
      year: "2024",
      location: "Cannes",
      bgVariant: 1,
      href: "/realisations/cine-cascade",
    },
    {
      number: "02",
      total: "04",
      tag: "Campagne · Activation",
      title: "Permobil, Salon 2025",
      sub: "Campagne 360 pour l'activation salon international. Stand, film, retombées presse.",
      metrics: [
        { value: "+62%", label: "leads" },
        { value: "×3,1", label: "presse" },
        { value: "4,2 M", label: "impressions" },
      ],
      year: "2025",
      location: "Düsseldorf",
      bgVariant: 2,
      href: "/realisations/permobil-salon-2025",
    },
    {
      number: "03",
      total: "04",
      tag: "Digital · Identité",
      title: "Magnum, refonte digitale",
      sub: "Plateforme de marque, design system et roll-out international. Activation produits saisonnière.",
      metrics: [
        { value: "+148%", label: "conversion" },
        { value: "×2,2", label: "RDV" },
        { value: "35%", label: "bounce" },
      ],
      year: "2025",
      location: "Londres",
      bgVariant: 3,
      href: "/realisations/magnum",
    },
    {
      number: "04",
      total: "04",
      tag: "Branding · Print",
      title: "Maison artisan premium",
      sub: "Repositionnement d'un label artisan en marque premium. Identité, packaging, retail.",
      metrics: [
        { value: "+32%", label: "prix moyen" },
        { value: "×4,1", label: "presse spé." },
        { value: "12", label: "points de vente" },
      ],
      year: "2025",
      location: "Provence",
      bgVariant: 4,
      href: "/realisations/maison-artisan",
    },
  ],
} as const;

export const homeTestimonials = {
  eyebrow: "Ils en parlent",
  headline: {
    // Notion 3459ea1e-2812-8116-9236-ce96635f0fad (Validé FR)
    before: "Ils en parlent ",
    italic: "mieux",
    after: " que nous.",
  },
  // TODO Notion sync : 4 témoignages non validés Notion (vivront dans Sanity testimonial)
  items: [
    {
      quote:
        "Une équipe qui comprend le business avant de toucher au pinceau. Rare et précieux.",
      author: "Marine D.",
      role: "Directrice Marketing, Groupe Mode",
    },
    {
      quote:
        "On nous avait promis un site. On a reçu un outil de croissance. Les chiffres parlent.",
      author: "Thomas L.",
      role: "Fondateur, Startup B2B",
    },
    {
      quote:
        "Un partenaire stratégique, pas un prestataire. La nuance change tout.",
      author: "Sophie R.",
      role: "DG, Groupe Hôtellerie",
    },
    {
      quote:
        "Cohérence, exigence, vitesse d'exécution. Trois qualités qu'on ne trouve presque jamais ensemble.",
      author: "Alexandre P.",
      role: "Marketing Director, Maison de Luxe",
    },
  ],
} as const;

// TODO Notion sync : section Journal preview entièrement absente Notion
export const homeJournal = {
  eyebrow: "Journal",
  headline: {
    before: "Notes, analyses, ",
    italic: "convictions",
    after: ".",
  },
  sub: "Trois articles par mois sur la croissance, le branding, la mesure d'impact.",
  cta: "Voir tous les articles",
  ctaHref: "/journal",
  articles: [
    {
      category: "Stratégie",
      title:
        "Pourquoi 80 % des refontes de site n'augmentent pas le CA.",
      excerpt:
        "Le diagnostic est presque toujours le même. Et il n'a rien à voir avec le design.",
      readTime: "8 min",
      date: "Avril 2026",
      href: "/journal/refonte-site-augmentation-ca",
    },
    {
      category: "Méthode",
      title: "Mesurer l'impact d'une marque, vraiment.",
      excerpt:
        "Au-delà du CTR. Trois indicateurs qu'on regarde tous les trimestres.",
      readTime: "6 min",
      date: "Avril 2026",
      href: "/journal/mesurer-impact-marque",
    },
    {
      category: "Tendance",
      title: "L'IA dans la création : levier ou paresse ?",
      excerpt:
        "Pour nous, c'est une question d'usage. Voici notre cadre interne.",
      readTime: "5 min",
      date: "Mars 2026",
      href: "/journal/ia-creation-levier-paresse",
    },
  ],
} as const;

export const homeFaq = {
  eyebrow: "Questions fréquentes",
  headline: {
    // Notion 3469ea1e-2812-81b8-849d-d7720777f1b7 (Validé FR)
    before: "Questions ",
    italic: "fréquentes",
    after: ".",
  },
  // Notion 3469ea1e-2812-8199-98a5-f05f63495a0d (Validé FR)
  sub: "Si votre question n'est pas là, parlez-en à IRIS ou réservez un appel.",
  items: [
    {
      // Notion 3469ea1e-2812-8104-9f1d-c94dd33b7633 (Validé FR)
      q: "Comment évaluez-vous le budget d'un projet ?",
      a: "Chaque projet a son propre budget, aligné sur vos enjeux et les résultats attendus. Nous ne vendons pas des prestations à la grille, nous construisons des réponses sur-mesure. Le budget exact se définit ensemble pendant l'appel, une fois qu'on a compris votre situation.",
    },
    {
      // Notion 3469ea1e-2812-811b-a918-cd269e5122b4 (Validé FR)
      q: "Combien de temps prend un projet ?",
      a: "De quelques semaines à plusieurs mois selon l'ampleur. La seule constante : nous n'improvisons jamais et nous ne livrons jamais en urgence. Si votre deadline est serrée, parlons-en rapidement pour voir si c'est réalisable.",
    },
    {
      // Notion 3469ea1e-2812-8162-8dc9-df1a6700bb0f (Validé FR)
      q: "Où travaillez-vous ?",
      a: "Partout en France et à l'international. La proximité compte moins que la compréhension de votre business. Nous travaillons en visio pour la plupart des échanges et nous nous déplaçons quand c'est utile.",
    },
    {
      // Notion 3469ea1e-2812-8181-80c9-f83c04526c06 (Validé FR)
      q: "Comment se passe un projet concrètement ?",
      a: "Diagnostic approfondi, stratégie créative, production, suivi de croissance. Un interlocuteur unique, des validations régulières, zéro surprise. Le détail exact de votre projet se construit lors de l'appel de cadrage.",
    },
    {
      // Notion 3469ea1e-2812-814f-bb92-dc21ef8722f4 (Validé FR)
      q: "Qu'est-ce qui différencie Paradeyes d'une agence classique ?",
      a: "Nous refusons deux pratiques courantes dans notre métier : proposer avant d'avoir compris, livrer sans mesurer. Votre budget communication doit vous rapporter plus qu'il ne vous coûte. Sinon, nous n'avons pas fait notre travail.",
    },
    {
      // Notion 3469ea1e-2812-81d8-abbe-e76b716af596 (Validé FR)
      q: "Vous gérez aussi les réseaux sociaux ?",
      a: "Nous produisons les contenus qui alimentent vos réseaux : vidéo, photo, motion, campagnes, identité visuelle. Pour le périmètre exact de notre accompagnement, ça dépend de votre stratégie et de vos équipes. C'est précisément ce genre de sujet qu'on clarifie dans l'appel de 30 minutes.",
    },
    {
      // Notion 3469ea1e-2812-8127-9f6e-e226189320af (Validé FR)
      q: "Comment démarrer un projet avec vous ?",
      a: "Un échange de 30 minutes, gratuit, structuré. Vous repartez avec des recommandations concrètes, que vous choisissiez de travailler avec nous ou non. C'est la meilleure façon de savoir si on est la bonne agence pour vous.",
    },
    {
      // Notion 3469ea1e-2812-81b8-9d56-e78bf8a1ed66 (Validé FR)
      q: "Est-ce que vous acceptez tous les projets ?",
      a: "Non. Nous travaillons avec des clients qui veulent vraiment construire, pas juste livrer. Si votre projet manque de clarté ou si l'alignement n'est pas là, nous vous le dirons honnêtement.",
    },
  ],
} as const;

export const homePreFooter = {
  eyebrow: "Vous voulez avancer ?",
  headline: {
    // Notion 3459ea1e-2812-81e2-842f-cb5601aae00e (Validé FR)
    before: "Parlons de votre ",
    italic: "projet",
    after: " maintenant.",
  },
  // Notion 3459ea1e-2812-8174-b613-e9a8471cd9a9 (Validé FR)
  sub: "30 minutes d'appel gratuit. Sans engagement. Des recommandations concrètes à la clé.",
  cta: "Un appel gratuit de 30 min",
  ctaHref: "/contact#appel",
} as const;

export const homeFooter = {
  // Notion 3459ea1e-2812-814b-a8cf-db6daab0fb3e (Validé FR) +
  // Notion 3469ea1e-2812-8196-8e5a-d7fc2d634d0c Signature globale FR (Validé FR)
  tagline:
    "Agence créative au service de votre croissance. On comprend. On conçoit. On construit.",
} as const;
