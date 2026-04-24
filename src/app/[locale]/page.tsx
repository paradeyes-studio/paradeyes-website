import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

type SectionTheme = "light" | "dark";

type HomeSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  theme: SectionTheme;
};

const SECTIONS: HomeSection[] = [
  {
    id: "hero",
    eyebrow: "PARADEYES AGENCY",
    title: "Agence créative au service de votre croissance.",
    description:
      "On comprend. On conçoit. On construit. Stratégie, identité, design, développement. Une équipe, une vision, des résultats mesurables.",
    theme: "dark",
  },
  {
    id: "proof",
    eyebrow: "ILS NOUS FONT CONFIANCE",
    title: "60+ marques accompagnées depuis 2019.",
    description:
      "Volkswagen, Unilever, Mini, Magnum, Air France, Amnesty International, Elizabeth Arden, Tramier. Des marques exigeantes, des projets ambitieux.",
    theme: "light",
  },
  {
    id: "offers",
    eyebrow: "NOS OFFRES",
    title: "Cinq leviers pour faire grandir votre marque.",
    description:
      "Branding, Sites et plateformes, Création de contenus, Déploiement et supports, Acquisition et réputation. Chaque levier répond à un enjeu précis.",
    theme: "dark",
  },
  {
    id: "method",
    eyebrow: "NOTRE MÉTHODE",
    title: "Trois temps. Aucun détour.",
    description:
      "On comprend votre contexte avant de proposer. On conçoit une réponse sur-mesure. On construit avec vous, jamais à votre place.",
    theme: "light",
  },
  {
    id: "projects",
    eyebrow: "RÉALISATIONS",
    title: "Études de cas sélectionnées.",
    description:
      "Des projets livrés, des marques transformées, des résultats publiés. Aperçu de notre travail récent.",
    theme: "dark",
  },
  {
    id: "journal",
    eyebrow: "JOURNAL",
    title: "Nos dernières idées, à froid.",
    description:
      "Analyses, points de vue, coulisses. Les convictions qui structurent notre pratique et nourrissent chaque projet.",
    theme: "light",
  },
  {
    id: "iris",
    eyebrow: "IRIS",
    title: "Un assistant créatif, disponible à toute heure.",
    description:
      "IRIS vous guide, qualifie votre besoin, et prépare le premier appel. Intégration finale prévue à l'Étape 9.",
    theme: "dark",
  },
];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as "fr" | "en";

  return (
    <>
      <Header locale={typedLocale} />

      <main id="main">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-section-theme={section.theme}
            className={cn(
              "relative flex min-h-screen items-center",
              section.theme === "dark"
                ? "bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]"
                : "bg-[var(--color-bg-canvas)] text-[var(--color-text-primary)]",
            )}
          >
            <div className="max-w-[var(--container-4xl)] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-6)] py-[var(--spacing-10)]">
              <p
                className={cn(
                  "font-mono text-mono-md uppercase tracking-[0.08em] font-medium mb-[var(--spacing-5)]",
                  section.theme === "dark"
                    ? "text-[var(--color-accent-on-dark)]"
                    : "text-[var(--color-accent-special)]",
                )}
              >
                {section.eyebrow}
              </p>
              <h2 className="font-display text-display-md lg:text-display-lg leading-[var(--leading-heading-1)] tracking-[var(--tracking-tight)] font-medium max-w-[22ch] mb-[var(--spacing-5)]">
                {section.title}
              </h2>
              <p
                className={cn(
                  "font-body text-body-lg leading-[var(--leading-body-lg)] max-w-[60ch]",
                  section.theme === "dark"
                    ? "text-[rgb(255_255_255/0.75)]"
                    : "text-[var(--color-text-secondary)]",
                )}
              >
                {section.description}
              </p>
            </div>
          </section>
        ))}
      </main>

      <Footer locale={typedLocale} showPreFooter preFooterVariant="default" />
    </>
  );
}
