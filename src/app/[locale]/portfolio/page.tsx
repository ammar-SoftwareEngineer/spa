import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PortfolioPageView from "@/components/Portfolio";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioPageView />;
}
