import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/PagePlaceholder";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DeploymentAndMediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PagePlaceholder
      name="Déploiement et supports"
      path="/offres/deploiement-et-supports"
    />
  );
}
