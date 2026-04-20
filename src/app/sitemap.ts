import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://paradeyesagency.com";

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

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/offres") ? 0.9 : 0.7,
  }));
}
