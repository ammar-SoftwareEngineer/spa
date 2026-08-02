import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import CategoryCards from "@/components/categories/CategoryCards";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import { mapProjectsToListItems } from "@/components/Projects/mapProjects";
import { getCategories } from "@/lib/api/categories";
import { getProjects } from "@/lib/api/projects";
import { getSectors } from "@/lib/api/sectors";

export default async function ProjectsPageView() {
  const [categories, projects, sectors, t, tNav, tHome, tServices] = await Promise.all([
    getCategories(),
    getProjects(),
    getSectors(),
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("home.projects"),
    getTranslations("home.services"),
  ]);

  const listItems = await mapProjectsToListItems(projects, categories, sectors);

  const cards = categories.map((category, index) => ({
    title: tHome(category.titleKey),
    description: tHome(category.descKey),
    badge: tServices(category.badgeKey),
    image: category.image,
    link: category.link,
    cta: tHome("viewCategory"),
    index,
  }));

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("projects")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        <ProjectsExplorer
          projects={listItems}
          categories={categories}
          sectors={sectors}
          idleContent={<CategoryCards categories={cards} />}
        />
      </Section>
    </>
  );
}
