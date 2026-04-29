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
import { NarrativeThread } from "@/components/visuals/NarrativeThread";
import { sanityClient } from "@/lib/sanity";
import {
  homePageQuery,
  type HomePageData,
  siteSettingsQuery,
  type SiteSettingsData,
  contactQuery,
  type ContactData,
} from "@/lib/sanity.queries";

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
          ctaHref:
            typeof siteSettings?.headerCtaUrl === "string"
              ? siteSettings.headerCtaUrl
              : undefined,
        }}
      />

      <main id="main">
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

        <Offres
          data={{
            sub: resolveLocalized(homeData?.offresSubtitle, typedLocale),
          }}
        />
        <Moments
          data={{
            sub: resolveLocalized(homeData?.momentsSubtitle, typedLocale),
            outroCta: resolveLocalized(homeData?.momentsPhraseSortie, typedLocale),
          }}
        />
        <Chiffres
          data={{
            sub: resolveLocalized(homeData?.chiffresSubtitle, typedLocale),
          }}
        />
        <div className="pdy-narrative-section">
          <NarrativeThread variant="methode-cases" />
          <Methode
            data={{
              sub: resolveLocalized(homeData?.methodeSubtitle, typedLocale),
            }}
          />
          <Cases
            data={{
              sub: resolveLocalized(homeData?.etudesSubtitle, typedLocale),
              ctaLabel: resolveLocalized(homeData?.etudesCtaLabel, typedLocale),
              ctaHref: typeof homeData?.etudesUrl === "string" ? homeData.etudesUrl : undefined,
            }}
          />
        </div>
        <Testimonials />
        {/* Testimonials accepts a `data` prop with eyebrow/title/items.
            No simple Sanity field maps to the structured items shape today;
            wiring stays at the prop contract level for future Studio expansion. */}
        <JournalPreview />
        <Faq
          data={{
            sub: resolveLocalized(homeData?.faqSubtitle, typedLocale),
          }}
        />
        <MarqueeTags data={homeData?.marqueeTagsSection} />
      </main>

      <Footer
        locale={typedLocale}
        showPreFooter
        preFooterVariant="default"
        preFooterData={{
          description: resolveLocalized(
            homeData?.ctaFinalSubtitle,
            typedLocale,
          ),
        }}
        data={{
          tagline:
            resolveLocalized(siteSettings?.footerBaseline, typedLocale) ??
            resolveLocalized(siteSettings?.baseline, typedLocale),
          email: contact?.email,
        }}
      />
    </>
  );
}
