import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectCategoryView from "@/components/Projects/ProjectCategoryView";
import ProjectDetailView from "@/components/Projects/ProjectDetailView";
import { getCategoryBySlug, getCategorySlugs } from "@/lib/api/categories";
import { getProjectBySlug, getProjectSlugs } from "@/lib/api/projects";


export async function generateStaticParams() {
  const [categories, projects] = await Promise.all([
    getCategorySlugs(),
    getProjectSlugs(),
  ]);

  return [...categories, ...projects].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (category) {
    const [tProjects, tHome] = await Promise.all([
      getTranslations({ locale, namespace: "projects" }),
      getTranslations({ locale, namespace: "home" }),
    ]);

    return {
      title: `${tHome(`projects.${category.titleKey}`)} | ${tProjects("meta.title")}`,
      description: tHome(`projects.${category.descKey}`),
    };
  }

  const project = await getProjectBySlug(slug);
  if (project) {
    const tServices = await getTranslations({ locale, namespace: "services" });
    return {
      title: `${tServices(project.titleKey)} | S&PA`,
      description: tServices(project.descKey),
    };
  }

  return { title: "Not Found" };
}

export default async function ProjectsSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const category = await getCategoryBySlug(slug);
  if (category) {
    return <ProjectCategoryView category={category} />;
  }

  const project = await getProjectBySlug(slug);
  if (project) {
    return <ProjectDetailView project={project} />;
  }

  notFound();
}
