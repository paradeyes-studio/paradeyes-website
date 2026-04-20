import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/components/providers/LenisProvider";

const satoshi = localFont({
  src: [
    { path: "../../fonts/satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paradeyesagency.com"),
  title: {
    default:
      "Paradeyes Agency — Agence créative au service de votre croissance",
    template: "%s | Paradeyes Agency",
  },
  description:
    "Paradeyes orchestre stratégie, identité, design et développement pour les marques qui veulent scaler.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Paradeyes Agency",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://paradeyesagency.com",
    languages: {
      fr: "https://paradeyesagency.com",
      en: "https://paradeyesagency.com/en",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${satoshi.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
