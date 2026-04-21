import { groq } from "next-sanity";

/**
 * Queries GROQ Paradeyes Website
 *
 * Architecture : lecture seule. Les schémas sont définis dans paradeyes-dashboard.
 * Le Studio d'édition est accessible depuis dashboard.paradeyesagency.com/admin/cms
 *
 * Project ID : tw2dddh1
 * Dataset : production
 */

// ============================================================
// SINGLETONS (documents uniques partagés par toute l'organisation)
// ============================================================

/**
 * Configuration SEO globale du site
 * Utilisée par layout.tsx pour generateMetadata
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
 * Coordonnees de contact Paradeyes
 * Utilisee dans le footer, la page contact, le JSON-LD
 */
export const contactQuery = groq`*[_type == "contact"][0]{
  email,
  linkedinUrl,
  instagramUrl
}`;

export type ContactData = {
  email: string;
  linkedinUrl: string;
  instagramUrl: string;
};

/**
 * Home du site web
 * A completer avec les champs reels quand le schema home sera cree dans paradeyes-dashboard
 */
export const homeQuery = groq`*[_type == "home"][0]`;

// ============================================================
// COLLECTIONS (documents multiples, a activer au fur et a mesure)
// ============================================================

// Les queries ci-dessous sont des placeholders commentes pour le futur.
// Elles seront activees quand les schemas correspondants seront crees
// dans paradeyes-dashboard.

/*
export const pageOffreQuery = groq`*[_type == "pageOffre" && slug.current == $slug][0]`;
export const allPageOffresQuery = groq`*[_type == "pageOffre"]`;

export const etudeDeCasQuery = groq`*[_type == "etudeDeCas" && slug.current == $slug][0]`;
export const allEtudesDeCasQuery = groq`*[_type == "etudeDeCas"] | order(publishedAt desc)`;

export const articleQuery = groq`*[_type == "article" && slug.current == $slug][0]`;
export const allArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc)`;
*/
