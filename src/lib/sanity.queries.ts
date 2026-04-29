import { groq } from "next-sanity";

/**
 * GROQ queries — Paradeyes Website
 *
 * Architecture : read-only. Schemas live in paradeyes-dashboard.
 * Studio : dashboard.paradeyesagency.com/admin/cms
 *
 * Project ID : tw2dddh1
 * Dataset : production
 */

// ============================================================
// SINGLETONS
// ============================================================

/**
 * Global SEO defaults. Used by layout.tsx for generateMetadata.
 */
export const seoQuery = groq`*[_type == "seo"][0]{
  titleGoogle,
  descriptionGoogle,
  titleSocial,
  descriptionSocial,
  keywords
}`;

export type SeoData = {
  titleGoogle: string;
  descriptionGoogle: string;
  titleSocial: string;
  descriptionSocial: string;
  keywords: string[];
};

/**
 * Public contact info. Used in footer, contact page, JSON-LD.
 */
export const contactQuery = groq`*[_type == "contact"][0]{
  email,
  linkedinUrl,
  instagramUrl,
  behanceUrl,
  phone,
  address
}`;

export type ContactData = {
  email: string;
  linkedinUrl: string;
  instagramUrl: string;
  behanceUrl?: string;
  phone?: string;
  address?: string;
};

/**
 * Site-wide settings. Branding, footer content, default pre-footer CTA.
 */
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  defaultOgImage,
  baseline,
  footerBaseline,
  footerStatement,
  footerLocation,
  headerCtaUrl,
  preFooterDefault{
    eyebrow,
    title,
    description,
    primaryLabel,
    secondaryLabel
  }
}`;

export type SiteSettingsData = {
  siteName: string;
  tagline: string;
  defaultOgImage?: { asset: { _ref: string } };
  baseline?: unknown;
  footerBaseline?: unknown;
  footerStatement?: string;
  footerLocation?: string;
  headerCtaUrl?: string;
  preFooterDefault?: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

/**
 * Home page content. Hero, proof, offers, method, projects highlight, journal highlight, IRIS.
 *
 * Extended 2026-04-29 to fetch all fields available in the Dashboard `homePage` schema.
 * Legacy fields (proof, offersIntro, method shorthand, projectsHighlight, journalHighlight, iris)
 * are kept for backward compat. New fields aligned with the Dashboard schema (heroBadge,
 * heroTitle, offresCards, methodeSteps, momentsItems, etc) are additive and optional.
 *
 * Components still consume `home-fallback.ts` as the primary source. Wiring each section
 * to Sanity is the next mission (estimated 4-6h with interactive testing).
 */
export const homePageQuery = groq`*[_type == "homePage"][0]{
  // === Hero (legacy + complete) ===
  heroBadge,
  heroTitle,
  heroSubtitle,
  heroCtaPrimary,
  heroCtaSecondary,
  heroSignatureMarque,
  heroIntroIris,
  heroBadgePositionnement,
  heroPhraseAccroche,
  heroPlaceholderIris,
  heroBadges[]{label},
  heroTrustBadges[]{label},
  hero{
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaHref
  },

  // === Problemes ===
  problemesTitle,
  problemesSubtitle,
  problemesItems[]{title, description},
  problemesTransition,
  problemesDouleurs[]{title, sousTexte},

  // === Offres ===
  offresTitle,
  offresSubtitle,
  offresEyebrow,
  offresTitleBefore,
  offresTitleItalic,
  offresTitleAfter,
  offresCards[]{
    number,
    tag,
    title,
    titleItalic,
    promesse,
    glyph,
    livrables,
    duration,
    size,
    "slug": slug->slug.current
  },
  offresCtaLabel,
  offersIntro{eyebrow, title, description},

  // === Chiffres ===
  chiffresTitle,
  chiffresSubtitle,
  chiffresEyebrow,
  chiffresTitleBefore,
  chiffresTitleItalic,
  chiffresTitleAfter,
  chiffresItems[],
  chiffresTransition,
  chiffresClientsLabel,
  chiffresClients,
  proof{
    eyebrow,
    title,
    description,
    brands[]->{name, logo}
  },

  // === Methode ===
  methodeTitle,
  methodeSubtitle,
  methodeEyebrow,
  methodeTitleBefore,
  methodeTitleItalic,
  methodeTitleAfter,
  methodeSteps[]{
    number,
    title,
    titleItalic,
    paragraph,
    tag,
    headlineBefore,
    headlineItalic,
    headlineAfter,
    livrablesItems[]{label, duration}
  },
  methodeTimelineLabel,
  methodeTimeline[]{label, duration, flex},
  method{
    eyebrow,
    title,
    steps[]{label, title, description}
  },

  // === Moments de croissance ===
  momentsTitle,
  momentsSubtitle,
  momentsEyebrow,
  momentsTitleBefore,
  momentsTitleItalic,
  momentsTitleAfter,
  momentsPhraseSortie,
  momentsBandeauSeo,
  momentsTransition,
  momentsItems[]->{_id, title, description, "order": order, "slug": slug.current},

  // === Temoignages ===
  temoignagesTitle,
  temoignagesSubtitle,
  temoignagesEyebrow,
  temoignagesTitleBefore,
  temoignagesTitleItalic,
  temoignagesTitleAfter,
  temoignagesFeatured[]->{
    _id,
    "quote": quoteShort,
    "quoteLong": quoteLong,
    "authorName": author.name,
    "authorRole": author.role,
    "authorPhoto": author.photo,
    "companyName": company.name,
    "companyLogo": company.logo,
    featured
  },

  // === Etudes de cas ===
  etudesTitle,
  etudesSubtitle,
  etudesEyebrow,
  etudesTitleBefore,
  etudesTitleItalic,
  etudesTitleAfter,
  etudesFeatured[]->{
    _id,
    "slug": slug.current,
    title,
    shortTag,
    shortSubtitle,
    homeMetrics[]{value, label},
    homeLocation,
    homeBgVariant,
    "year": metadata.year,
    coverImage
  },
  etudesCtaLabel,
  etudesUrl,
  projectsHighlight{
    eyebrow,
    title,
    projects[]->{_id, slug, title, cover}
  },

  // === Journal (Phase 3 nouvelle section) ===
  journalEyebrow,
  journalTitleBefore,
  journalTitleItalic,
  journalTitleAfter,
  journalSubtitle,
  journalCtaLabel,
  journalCtaUrl,
  journalArticles[]->{
    _id,
    "slug": slug.current,
    title,
    excerpt,
    category,
    "readingTime": readingTime,
    publishedAt,
    coverImage
  },

  // === FAQ ===
  faqTitle,
  faqSubtitle,
  faqEyebrow,
  faqTitleBefore,
  faqTitleItalic,
  faqTitleAfter,
  faqCtaFinal,
  faqItems[]->{_id, question, answer, category, order},

  // === CTA Final ===
  ctaFinalTitle,
  ctaFinalSubtitle,
  ctaFinalEyebrow,
  ctaFinalTitleBefore,
  ctaFinalTitleItalic,
  ctaFinalTitleAfter,
  ctaFinalCtaLabel,
  ctaFinalCtaUrl,
  ctaFinalIris{title, description, prefillContext},
  ctaFinalCalendly{title, description, embedUrl},
  ctaFinalTrustSignal,

  // === Bandeau de tags (MarqueeTags) ===
  marqueeTagsSection{
    line1,
    line1Accent,
    line2,
    line2Accent,
    line3,
    line3Accent
  },

  // === Journal highlight (legacy) ===
  journalHighlight{
    eyebrow,
    title,
    articles[]->{_id, slug, title, excerpt, publishedAt}
  },

  // === IRIS (legacy) ===
  iris{eyebrow, title, description}
}`;

export type HomePageData = {
  // Localized fields may arrive as plain strings or as
  // internationalized-array entries ({_key, language, value}[]).
  // Resolution happens at the page level via resolveLocalized().

  // === Hero (extended) ===
  heroBadge?: unknown;
  heroTitle?: unknown;
  heroSubtitle?: unknown;
  heroCtaPrimary?: unknown;
  heroCtaSecondary?: unknown;
  heroSignatureMarque?: unknown;
  heroIntroIris?: unknown;
  heroBadgePositionnement?: unknown;
  heroPhraseAccroche?: unknown;
  heroPlaceholderIris?: unknown;
  heroBadges?: unknown;
  heroTrustBadges?: unknown;
  hero?: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
  };

  // === Problemes ===
  problemesTitle?: unknown;
  problemesSubtitle?: unknown;
  problemesItems?: unknown;
  problemesTransition?: unknown;
  problemesDouleurs?: unknown;

  // === Offres ===
  offresTitle?: unknown;
  offresSubtitle?: unknown;
  offresEyebrow?: unknown;
  offresTitleBefore?: unknown;
  offresTitleItalic?: unknown;
  offresTitleAfter?: unknown;
  offresCards?: unknown;
  offresCtaLabel?: unknown;
  offersIntro?: { eyebrow: string; title: string; description: string };

  // === Chiffres ===
  chiffresTitle?: unknown;
  chiffresSubtitle?: unknown;
  chiffresEyebrow?: unknown;
  chiffresTitleBefore?: unknown;
  chiffresTitleItalic?: unknown;
  chiffresTitleAfter?: unknown;
  chiffresItems?: unknown;
  chiffresTransition?: unknown;
  chiffresClientsLabel?: unknown;
  chiffresClients?: unknown;
  proof?: {
    eyebrow: string;
    title: string;
    description: string;
    brands?: Array<{ name: string; logo?: { asset: { _ref: string } } }>;
  };

  // === Methode ===
  methodeTitle?: unknown;
  methodeSubtitle?: unknown;
  methodeEyebrow?: unknown;
  methodeTitleBefore?: unknown;
  methodeTitleItalic?: unknown;
  methodeTitleAfter?: unknown;
  methodeSteps?: unknown;
  methodeTimelineLabel?: unknown;
  methodeTimeline?: unknown;
  method?: {
    eyebrow: string;
    title: string;
    steps?: Array<{ label: string; title: string; description: string }>;
  };

  // === Moments ===
  momentsTitle?: unknown;
  momentsSubtitle?: unknown;
  momentsEyebrow?: unknown;
  momentsTitleBefore?: unknown;
  momentsTitleItalic?: unknown;
  momentsTitleAfter?: unknown;
  momentsPhraseSortie?: unknown;
  momentsBandeauSeo?: unknown;
  momentsTransition?: unknown;
  momentsItems?: unknown;

  // === Temoignages ===
  temoignagesTitle?: unknown;
  temoignagesSubtitle?: unknown;
  temoignagesEyebrow?: unknown;
  temoignagesTitleBefore?: unknown;
  temoignagesTitleItalic?: unknown;
  temoignagesTitleAfter?: unknown;
  temoignagesFeatured?: unknown;

  // === Etudes ===
  etudesTitle?: unknown;
  etudesSubtitle?: unknown;
  etudesEyebrow?: unknown;
  etudesTitleBefore?: unknown;
  etudesTitleItalic?: unknown;
  etudesTitleAfter?: unknown;
  etudesFeatured?: unknown;
  etudesCtaLabel?: unknown;
  etudesUrl?: string;
  projectsHighlight?: {
    eyebrow: string;
    title: string;
    projects?: Array<{
      _id: string;
      slug: { current: string };
      title: string;
      cover?: { asset: { _ref: string } };
    }>;
  };

  // === Journal (Phase 3 nouvelle section) ===
  journalEyebrow?: unknown;
  journalTitleBefore?: unknown;
  journalTitleItalic?: unknown;
  journalTitleAfter?: unknown;
  journalSubtitle?: unknown;
  journalCtaLabel?: unknown;
  journalCtaUrl?: string;
  journalArticles?: unknown;

  // === FAQ ===
  faqTitle?: unknown;
  faqSubtitle?: unknown;
  faqEyebrow?: unknown;
  faqTitleBefore?: unknown;
  faqTitleItalic?: unknown;
  faqTitleAfter?: unknown;
  faqCtaFinal?: unknown;
  faqItems?: unknown;

  // === CTA Final ===
  ctaFinalTitle?: unknown;
  ctaFinalSubtitle?: unknown;
  ctaFinalEyebrow?: unknown;
  ctaFinalTitleBefore?: unknown;
  ctaFinalTitleItalic?: unknown;
  ctaFinalTitleAfter?: unknown;
  ctaFinalCtaLabel?: unknown;
  ctaFinalCtaUrl?: string;
  ctaFinalIris?: unknown;
  ctaFinalCalendly?: unknown;
  ctaFinalTrustSignal?: unknown;

  // === MarqueeTags ===
  marqueeTagsSection?: {
    line1?: string[];
    line1Accent?: string;
    line2?: string[];
    line2Accent?: string;
    line3?: string[];
    line3Accent?: string;
  };

  // === Journal highlight (legacy) ===
  journalHighlight?: {
    eyebrow: string;
    title: string;
    articles?: Array<{
      _id: string;
      slug: { current: string };
      title: string;
      excerpt: string;
      publishedAt: string;
    }>;
  };
  iris?: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

// ============================================================
// COLLECTIONS (placeholders — activate when schemas exist in dashboard)
// ============================================================

/*
export const pageOffreQuery = groq`*[_type == "pageOffre" && slug.current == $slug][0]`;
export const allPageOffresQuery = groq`*[_type == "pageOffre"]`;

export const etudeDeCasQuery = groq`*[_type == "etudeDeCas" && slug.current == $slug][0]`;
export const allEtudesDeCasQuery = groq`*[_type == "etudeDeCas"] | order(publishedAt desc)`;

export const articleQuery = groq`*[_type == "article" && slug.current == $slug][0]`;
export const allArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc)`;
*/
