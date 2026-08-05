/**
 * Layout لكل اللغات — خطوط + هيدر/فوتر + metadata أساسي للـ SEO
 */
import type { Metadata } from "next";
import { Cairo, Bebas_Neue, Open_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getNavItems } from "@/lib/api/navbar";
import { getSiteData } from "@/lib/api/site";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/utils";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const base = getBaseUrl();

  return {
    metadataBase: new URL(base),
    title: {
      default: t("title.default"),
      template: `%s | S&PA`,
    },
    description: t("description.default"),
    alternates: {
      languages: {
        ar: `${base}/ar`,
        en: `${base}/en`,
      },
    },
    openGraph: {
      title: t("title.default"),
      description: t("description.default"),
      siteName: "S&PA",
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [
        {
          url: "/img/logo.png",
          width: 933,
          height: 381,
          alt: "S&PA Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title.default"),
      description: t("description.default"),
    },
  };
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
  const messages = await getMessages();
  const [navItems, site] = await Promise.all([getNavItems(), getSiteData()]);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`dark ${cairo.variable} ${bebasNeue.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* يمنع وميض الثيم الغلط قبل تحميل React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header navItems={navItems} logoSrc={site.branding.logo} />
            <main className="flex-1">{children}</main>
            <Footer site={site} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
