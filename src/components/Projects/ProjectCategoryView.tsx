import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import ProjectsExplorer from "@/components/Projects/ProjectsExplorer";
import { mapProjectsToListItems } from "@/components/Projects/mapProjects";
import { getCategories } from "@/lib/api/categories";
import { getProjects } from "@/lib/api/projects";
import { getSectors } from "@/lib/api/sectors";
import type { CategoryItem } from "@/types";

type ProjectCategoryViewProps = {
  category: CategoryItem;
};

export default async function ProjectCategoryView({ category }: ProjectCategoryViewProps) {
  const [allCategories, projects, sectors, t, tNav, tHome, locale] = await Promise.all([
    getCategories(),
    getProjects(),
    getSectors(),
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("home.projects"),
    getLocale(),
  ]);

  const categoryTitle = tHome(category.titleKey);
  const categoryDescription = tHome(category.descKey);
  const listItems = await mapProjectsToListItems(projects, allCategories, sectors);

  return (
    <>
      <PageHero
        eyebrow={tNav("projects")}
        title={categoryTitle}
        description={categoryDescription}
        currentLabel={categoryTitle}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
       

        <ProjectsExplorer
          projects={listItems}
          categories={allCategories}
          sectors={sectors}
          alwaysShowProjects
          initialScope={category.slug}
        />
      </Section>
    </>
  );
}
