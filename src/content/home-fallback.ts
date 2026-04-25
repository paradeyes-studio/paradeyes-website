/**
 * Authoritative fallback wordings for the home page.
 * These values are used when Sanity returns nothing.
 * All strings are validated by Basilide and ARE the source of truth
 * for the home body. Do not edit without explicit approval.
 *
 * Rules:
 * - vouvoiement only
 * - no emoji
 * - no em-dash / en-dash (use ".", ",", ":", "·")
 * - palette references stay symbolic (use tokens, not hex)
 */

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

export const homeManifesto = {
  eyebrow: "Notre philosophie",
  headline: {
    before: "Le cinéma rencontre le ",
    italic: "tableau de bord",
    after: ".",
  },
  body: "Chaque projet croise l'œil d'un réalisateur et la rigueur d'un analyste. L'intention crée le signal. La mesure garantit l'impact.",
  miniStats: [
    { value: "+42%", label: "CTR moyen" },
    { value: "×3,4", label: "Conversion" },
    { value: "98%", label: "Rétention" },
  ],
} as const;

export const homeOffres = {
  eyebrow: "Nos offres",
  headline: {
    before: "Cinq leviers pour ",
    italic: "transformer",
    after: " votre business.",
  },
  sub: "Une équipe intégrée qui orchestre chaque levier, du positionnement à l'acquisition. Cohérence, mesure, durée.",
  cards: [
    {
      number: "01",
      tag: "Branding",
      title: "Branding et Identité de marque",
      titleItalic: "marque",
      promise: "Structurez la perception de votre marque avant de la dessiner.",
      glyph: "Æ",
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
      promise: "Le contenu comme actif stratégique, pas comme livrable unique.",
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
      promise: "Le support est secondaire. La perception qu'il crée est centrale.",
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
      promise: "Visibilité, perception, conversion. Les trois alignés ou aucun résultat.",
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
    before: "On accompagne aux ",
    italic: "moments",
    after: " décisifs.",
  },
  sub: "Chaque levier répond à un moment précis. Identifiez le vôtre, on vous oriente vers la bonne combinaison.",
  items: [
    {
      number: "01",
      title: "Lancement",
      description:
        "Vous lancez un produit, une marque ou un projet. Il faut exister vite, avec impact, sans bavure.",
      tag: "Mois 1 à 6",
    },
    {
      number: "02",
      title: "Repositionnement",
      description:
        "Votre marque a évolué, votre marché aussi. Il est temps d'aligner perception et réalité.",
      tag: "Plan sur 6 à 12 mois",
    },
    {
      number: "03",
      title: "Accélération",
      description:
        "Vos fondamentaux fonctionnent. On vient amplifier, professionnaliser, mesurer.",
      tag: "Récurrent",
    },
    {
      number: "04",
      title: "Événement stratégique",
      description:
        "Salon, levée, lancement majeur. Une fenêtre étroite, une exécution sans erreur possible.",
      tag: "Ponctuel",
    },
  ],
} as const;

export const homeChiffres = {
  eyebrow: "Ils nous font confiance",
  headline: {
    before: "Soixante marques ",
    italic: "accompagnées",
    after: " depuis 2019.",
  },
  sub: "Du groupe mondial au label indépendant, des équipes exigeantes qui attendent un niveau d'exécution sans compromis.",
  stats: [
    {
      number: "01",
      label: "Marques",
      value: 60,
      suffix: "+",
      trend: "+18% YoY",
      caption: "Accompagnées depuis 2019 sur au moins un levier majeur.",
    },
    {
      number: "02",
      label: "Expertise",
      value: 7,
      suffix: " ans",
      trend: "Stable",
      caption: "Rayonnement international depuis Cannes.",
    },
    {
      number: "03",
      label: "Fidélité",
      value: 98,
      suffix: "%",
      trend: "+4 pts",
      caption: "De nos clients renouvellent leur collaboration.",
    },
    {
      number: "04",
      label: "Impact",
      value: 3.4,
      suffix: "",
      prefix: "×",
      decimals: 1,
      trend: "+0,6×",
      caption: "De croissance moyenne sur les KPIs suivis.",
    },
  ],
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
    before: "Quatre temps. ",
    italic: "Aucun détour",
    after: ".",
  },
  sub: "Une méthode resserrée, pensée pour éliminer le bruit. Chaque phase a un livrable, une décision, un jalon.",
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
      headline: {
        before: "On comprend votre business avant de ",
        italic: "proposer",
        after: ".",
      },
      description:
        "Audit, entretiens, lecture de la data. On repart de la vérité du terrain, pas d'un template réutilisé.",
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
      description:
        "Territoire de marque, design système, prototypes. Validés sur pièces, sur des critères mesurables.",
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
      description:
        "Production, intégration, lancement. Chaque livrable respecte la vision définie ensemble.",
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
      description:
        "Suivi, optimisation, reporting. Chaque action génère du retour mesurable et documenté.",
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
    before: "Des projets livrés, des marques ",
    italic: "transformées",
    after: ".",
  },
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
    before: "Ce qu'on entend, en ",
    italic: "mieux",
    after: ".",
  },
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
    before: "Avant de nous appeler, ",
    italic: "lisez ceci",
    after: ".",
  },
  items: [
    {
      q: "Combien coûte un projet avec Paradeyes ?",
      a: "Nos projets démarrent à 15 000 € HT pour un repositionnement et 25 000 € HT pour un lancement complet. Chaque devis est sur-mesure, basé sur le scope, l'urgence et le périmètre. L'appel gratuit de 30 minutes permet de cadrer ces variables.",
    },
    {
      q: "En combien de temps un projet est-il livré ?",
      a: "Cela dépend de l'ambition. Un site éditorial premium prend 8 à 12 semaines. Une refonte d'identité complète, 6 à 10 semaines. Un événement stratégique, 4 à 8 semaines. On respecte le calendrier convenu, point.",
    },
    {
      q: "Travaillez-vous en France et à l'international ?",
      a: "Oui. Notre siège est à Cannes, avec une présence Paris. Nous accompagnons des marques en France, Europe et Amérique du Nord. Tous les projets sont menés en français ou en anglais selon votre besoin.",
    },
    {
      q: "Pouvez-vous reprendre un projet existant ?",
      a: "Oui, c'est même fréquent. Dans ce cas, on commence par un audit de l'existant pour comprendre ce qui marche, ce qui freine, ce qu'il faut sauver. Puis on bâtit un plan d'action priorisé avec votre équipe.",
    },
    {
      q: "Comment mesurez-vous l'impact ?",
      a: "On définit ensemble 3 à 5 KPIs business avant le démarrage. On les suit chaque mois et on les remet en perspective chaque trimestre. La mesure n'est pas optionnelle, elle est consubstantielle à la méthode.",
    },
  ],
} as const;

export const homePreFooter = {
  eyebrow: "Vous voulez avancer ?",
  headline: {
    before: "On comprend votre ",
    italic: "projet",
    after: " en 30 minutes.",
  },
  sub: "Pas de présentation commerciale. Pas de slides. Une discussion, des bonnes questions, un avis honnête.",
  cta: "Un appel gratuit de 30 min",
  ctaHref: "/contact#appel",
} as const;
