import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/PagePlaceholder";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContentCreationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PagePlaceholder
      name="Création de contenus"
      path="/offres/creation-de-contenus"
    />
  );
}
