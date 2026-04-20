import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/PagePlaceholder";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AcquisitionAndReputationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PagePlaceholder
      name="Acquisition et réputation"
      path="/offres/acquisition-et-reputation"
    />
  );
}
