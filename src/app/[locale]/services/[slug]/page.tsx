import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServiceDetailView from "@/components/Services/ServiceDetailView";
import { getServiceBySlug, getServiceSlugs } from "@/lib/api/services";
import { getProjectsByServiceSlug } from "@/lib/api/projects";


export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: `${t(service.titleKey)} | S&PA`,
    description: t(service.descKey),
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const projects = await getProjectsByServiceSlug(slug);

  return <ServiceDetailView service={service} projects={projects} />;
}
