import type { MetadataRoute } from "next";

const baseUrl = "https://paradeyesagency.com";

// TODO: extend with dynamic Sanity content (case studies /realisations/[slug],
// journal articles /journal/[slug]) once the CMS is connected.
const staticPages = [
  "",
  "/agence",
  "/offres/branding",
  "/offres/sites-et-plateformes",
  "/offres/creation-de-contenus",
  "/offres/deploiement-et-supports",
  "/offres/acquisition-et-reputation",
  "/realisations",
  "/journal",
  "/contact",
  "/espace-client",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/offres") ? 0.9 : 0.7,
    alternates: {
      languages: {
        fr: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
  }));
}
