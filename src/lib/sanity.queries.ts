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
  footerStatement,
  footerLocation,
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
  footerStatement?: string;
  footerLocation?: string;
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
 */
export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroBadgePositionnement,
  heroPhraseAccroche,
  heroSubtitle,
  heroPlaceholderIris,
  heroBadges[]{label},
  hero{
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaHref
  },
  proof{
    eyebrow,
    title,
    description,
    brands[]->{name, logo}
  },
  offersIntro{
    eyebrow,
    title,
    description
  },
  method{
    eyebrow,
    title,
    steps[]{
      label,
      title,
      description
    }
  },
  projectsHighlight{
    eyebrow,
    title,
    projects[]->{
      _id,
      slug,
      title,
      cover
    }
  },
  journalHighlight{
    eyebrow,
    title,
    articles[]->{
      _id,
      slug,
      title,
      excerpt,
      publishedAt
    }
  },
  iris{
    eyebrow,
    title,
    description
  }
}`;

export type HomePageData = {
  // Localized fields may arrive as plain strings or as
  // internationalized-array entries ({_key, language, value}[]).
  // Resolution happens at the page level via resolveLocalized().
  heroBadgePositionnement?: unknown;
  heroPhraseAccroche?: unknown;
  heroSubtitle?: unknown;
  heroPlaceholderIris?: unknown;
  heroBadges?: unknown;
  hero?: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  proof?: {
    eyebrow: string;
    title: string;
    description: string;
    brands?: Array<{ name: string; logo?: { asset: { _ref: string } } }>;
  };
  offersIntro?: {
    eyebrow: string;
    title: string;
    description: string;
  };
  method?: {
    eyebrow: string;
    title: string;
    steps?: Array<{ label: string; title: string; description: string }>;
  };
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
