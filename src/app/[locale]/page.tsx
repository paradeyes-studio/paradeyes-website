import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { Offres } from "@/components/sections/Offres";
import { Moments } from "@/components/sections/Moments";
import { Chiffres } from "@/components/sections/Chiffres";
import { Methode } from "@/components/sections/Methode";
import { Cases } from "@/components/sections/Cases";
import { Testimonials } from "@/components/sections/Testimonials";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { Faq } from "@/components/sections/Faq";
import { MarqueeTags } from "@/components/sections/MarqueeTags";
import { SectionCard } from "@/components/layout/SectionCard";
import { sanityClient } from "@/lib/sanity";
import {
  homePageQuery,
  type HomePageData,
  siteSettingsQuery,
  type SiteSettingsData,
  contactQuery,
  type ContactData,
} from "@/lib/sanity.queries";
import {
  mapSanityOfferCards,
  mapSanityMethodeSteps,
  mapSanityMoments,
  mapSanityStats,
  mapSanityCaseStudies,
  mapSanityTestimonials,
  mapSanityJournalArticles,
  mapSanityFaqItems,
} from "@/lib/sanity-mappers";

type Props = {
  params: Promise<{ locale: string }>;
};

async function getHomeData(): Promise<HomePageData | null> {
  try {
    return await sanityClient.fetch<HomePageData | null>(homePageQuery);
  } catch (error) {
    console.error("[home] Sanity fetch failed:", error);
    return null;
  }
}

async function getSiteSettings(): Promise<SiteSettingsData | null> {
  try {
    return await sanityClient.fetch<SiteSettingsData | null>(siteSettingsQuery);
  } catch (error) {
    console.error("[home] Sanity siteSettings fetch failed:", error);
    return null;
  }
}

async function getContact(): Promise<ContactData | null> {
  try {
    return await sanityClient.fetch<ContactData | null>(contactQuery);
  } catch (error) {
    console.error("[home] Sanity contact fetch failed:", error);
    return null;
  }
}

function resolveLocalized(field: unknown, locale: string): string | undefined {
  if (typeof field === "string") return field;
  if (Array.isArray(field)) {
    const match = field.find(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        "language" in entry &&
        (entry as { language?: string }).language === locale,
    ) as { value?: unknown } | undefined;
    if (match && typeof match.value === "string") return match.value;
    const first = field[0] as { value?: unknown } | undefined;
    if (first && typeof first.value === "string") return first.value;
  }
  return undefined;
}

function resolveLocalizedBadges(
  field: unknown,
  locale: string,
): Array<{ label: string }> | undefined {
  if (!Array.isArray(field)) return undefined;
  const labels = field
    .map((entry) => {
      if (!entry || typeof entry !== "object") return undefined;
      const raw = (entry as { label?: unknown }).label;
      return resolveLocalized(raw, locale);
    })
    .filter((v): v is string => typeof v === "string" && v.length > 0)
    .map((label) => ({ label }));
  return labels.length > 0 ? labels : undefined;
}

/**
 * Resolves a Phase 3 split title (before/italic/after) into the {before, italic, after} shape
 * expected by SectionHeadline. Returns undefined if any of the 3 parts is missing,
 * so the component falls back to the home-fallback split title.
 */
function resolveTitleEclate(
  beforeField: unknown,
  italicField: unknown,
  afterField: unknown,
  locale: string,
): { before: string; italic: string; after: string } | undefined {
  const before = resolveLocalized(beforeField, locale);
  const italic = resolveLocalized(italicField, locale);
  const after = resolveLocalized(afterField, locale);
  if (!before || !italic || !after) return undefined;
  return { before, italic, after };
}

/**
 * Resolves a plain string array (Sanity field of type `array of string`, no i18n wrapper).
 * Used for clients list, marquee tags lines, etc.
 */
function resolvePlainStringArray(field: unknown): string[] | undefined {
  if (!Array.isArray(field)) return undefined;
  const values = field.filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );
  return values.length > 0 ? values : undefined;
}

type HeaderNavItem = { label: string; href: string };

/**
 * Resolves the Sanity siteSettings.headerLinks array into the shape Header expects.
 * Each link in Sanity has {label (i18n), slug (string), isExternal (bool)}.
 * Header expects {label, href}.
 */
function resolveHeaderNavItems(
  field: unknown,
  locale: string,
): ReadonlyArray<HeaderNavItem> | undefined {
  if (!Array.isArray(field)) return undefined;
  const items: HeaderNavItem[] = [];
  for (const entry of field) {
    if (!entry || typeof entry !== "object") continue;
    const raw = entry as { label?: unknown; slug?: unknown; isExternal?: unknown };
    const label = resolveLocalized(raw.label, locale);
    const slug = typeof raw.slug === "string" ? raw.slug : undefined;
    if (!label || !slug) continue;
    const isExternal = raw.isExternal === true;
    const href = isExternal || slug.startsWith("/") || slug.startsWith("#")
      ? slug
      : `/${slug}`;
    items.push({ label, href });
  }
  return items.length > 0 ? items : undefined;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as "fr" | "en";
  const [homeData, siteSettings, contact] = await Promise.all([
    getHomeData(),
    getSiteSettings(),
    getContact(),
  ]);

  return (
    <>
      <Header
        locale={typedLocale}
        data={{
          navItems: resolveHeaderNavItems(
            (siteSettings as { headerLinks?: unknown } | null)?.headerLinks,
            typedLocale,
          ),
          ctaLabel: resolveLocalized(
            (siteSettings as { headerCtaLabel?: unknown } | null)?.headerCtaLabel,
            typedLocale,
          ),
          ctaHref:
            typeof siteSettings?.headerCtaUrl === "string"
              ? siteSettings.headerCtaUrl
              : undefined,
        }}
      />

      <main
        id="main"
        className="min-h-screen bg-cream-deep px-4 pt-24 pb-4 md:px-6 md:pt-28 md:pb-6 lg:px-8 lg:pt-32 lg:pb-8"
      >
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
          <SectionCard variant="deep-green" id="hero">
            <HeroSection
              locale={typedLocale}
              data={{
                heroBadgePositionnement: resolveLocalized(
                  homeData?.heroBadgePositionnement,
                  typedLocale,
                ),
                heroPhraseAccroche: resolveLocalized(
                  homeData?.heroPhraseAccroche,
                  typedLocale,
                ),
                heroSubtitle: resolveLocalized(homeData?.heroSubtitle, typedLocale),
                heroPlaceholderIris: resolveLocalized(
                  homeData?.heroPlaceholderIris,
                  typedLocale,
                ),
                heroBadges: resolveLocalizedBadges(homeData?.heroBadges, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="cream" id="offres">
            <Offres
              data={{
                eyebrow: resolveLocalized(homeData?.offresEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.offresTitleBefore,
                  homeData?.offresTitleItalic,
                  homeData?.offresTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.offresSubtitle, typedLocale),
                cards: mapSanityOfferCards(homeData?.offresCards, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="deep-green" id="moments">
            <Moments
              data={{
                eyebrow: resolveLocalized(homeData?.momentsEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.momentsTitleBefore,
                  homeData?.momentsTitleItalic,
                  homeData?.momentsTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.momentsSubtitle, typedLocale),
                items: mapSanityMoments(homeData?.momentsItems, typedLocale),
                outroCta: resolveLocalized(homeData?.momentsPhraseSortie, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="cream" id="chiffres">
            <Chiffres
              data={{
                eyebrow: resolveLocalized(homeData?.chiffresEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.chiffresTitleBefore,
                  homeData?.chiffresTitleItalic,
                  homeData?.chiffresTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.chiffresSubtitle, typedLocale),
                stats: mapSanityStats(homeData?.chiffresItems, typedLocale),
                clients: resolvePlainStringArray(homeData?.chiffresClients),
                clientsLabel: resolveLocalized(
                  homeData?.chiffresClientsLabel,
                  typedLocale,
                ),
              }}
            />
          </SectionCard>

          <SectionCard variant="deep-green" id="methode">
            <Methode
              data={{
                eyebrow: resolveLocalized(homeData?.methodeEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.methodeTitleBefore,
                  homeData?.methodeTitleItalic,
                  homeData?.methodeTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.methodeSubtitle, typedLocale),
                steps: mapSanityMethodeSteps(homeData?.methodeSteps, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="cream" id="cases">
            <Cases
              data={{
                eyebrow: resolveLocalized(homeData?.etudesEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.etudesTitleBefore,
                  homeData?.etudesTitleItalic,
                  homeData?.etudesTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.etudesSubtitle, typedLocale),
                cases: mapSanityCaseStudies(homeData?.etudesFeatured, typedLocale),
                ctaLabel: resolveLocalized(homeData?.etudesCtaLabel, typedLocale),
                ctaHref: typeof homeData?.etudesUrl === "string" ? homeData.etudesUrl : undefined,
              }}
            />
          </SectionCard>

          <SectionCard variant="deep-green" id="testimonials">
            <Testimonials
              data={{
                eyebrow: resolveLocalized(homeData?.temoignagesEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.temoignagesTitleBefore,
                  homeData?.temoignagesTitleItalic,
                  homeData?.temoignagesTitleAfter,
                  typedLocale,
                ),
                items: mapSanityTestimonials(homeData?.temoignagesFeatured, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="cream" id="journal">
            <JournalPreview
              data={{
                eyebrow: resolveLocalized(homeData?.journalEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.journalTitleBefore,
                  homeData?.journalTitleItalic,
                  homeData?.journalTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.journalSubtitle, typedLocale),
                cta: resolveLocalized(homeData?.journalCtaLabel, typedLocale),
                ctaHref: typeof homeData?.journalCtaUrl === "string" ? homeData.journalCtaUrl : undefined,
                articles: mapSanityJournalArticles(homeData?.journalArticles, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="deep-green" id="faq">
            <Faq
              data={{
                eyebrow: resolveLocalized(homeData?.faqEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.faqTitleBefore,
                  homeData?.faqTitleItalic,
                  homeData?.faqTitleAfter,
                  typedLocale,
                ),
                sub: resolveLocalized(homeData?.faqSubtitle, typedLocale),
                items: mapSanityFaqItems(homeData?.faqItems, typedLocale),
              }}
            />
          </SectionCard>

          <SectionCard variant="cream" id="marquee">
            <MarqueeTags data={homeData?.marqueeTagsSection} />
          </SectionCard>

          <SectionCard variant="deep-green" id="footer">
            <Footer
              locale={typedLocale}
              showPreFooter
              preFooterVariant="default"
              preFooterData={{
                eyebrow: resolveLocalized(homeData?.ctaFinalEyebrow, typedLocale),
                title: resolveTitleEclate(
                  homeData?.ctaFinalTitleBefore,
                  homeData?.ctaFinalTitleItalic,
                  homeData?.ctaFinalTitleAfter,
                  typedLocale,
                ),
                description: resolveLocalized(
                  homeData?.ctaFinalSubtitle,
                  typedLocale,
                ),
                cta: resolveLocalized(homeData?.ctaFinalCtaLabel, typedLocale),
                ctaHref:
                  typeof homeData?.ctaFinalCtaUrl === "string"
                    ? homeData.ctaFinalCtaUrl
                    : undefined,
              }}
              data={{
                tagline:
                  resolveLocalized(siteSettings?.footerBaseline, typedLocale) ??
                  resolveLocalized(siteSettings?.baseline, typedLocale),
                address: resolveLocalized(
                  (siteSettings as { footerAddress?: unknown } | null)?.footerAddress,
                  typedLocale,
                ),
                email: contact?.email,
              }}
            />
          </SectionCard>
        </div>
      </main>
    </>
  );
}
