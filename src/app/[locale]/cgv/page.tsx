import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/PagePlaceholder";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder name="CGV" path="/cgv" />;
}
