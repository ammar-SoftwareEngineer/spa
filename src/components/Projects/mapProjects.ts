import { getTranslations } from "next-intl/server";
import type { CategoryItem, ProjectItem, SectorItem } from "@/types";
import type { ProjectListItem } from "@/components/Projects/ProjectsExplorer";

/** Shared mapper so list + category pages build the same project cards. */
export async function mapProjectsToListItems(
  projects: ProjectItem[],
  categories: CategoryItem[],
  sectors: SectorItem[]
): Promise<ProjectListItem[]> {
  const [tServices, tHome, tSectors] = await Promise.all([
    getTranslations("services"),
    getTranslations("home.projects"),
    getTranslations("home.sectors"),
  ]);

  return projects.map((project) => ({
    ...project,
    title: tServices(project.titleKey),
    description: tServices(project.descKey),
    location: tServices(project.locationKey),
    categoryLabels: project.categorySlugs
      .map((slug) => categories.find((category) => category.slug === slug))
      .filter(Boolean)
      .map((category) => tHome(category!.titleKey)),
    sectorLabels: project.sectorSlugs
      .map((slug) => sectors.find((sector) => sector.slug === slug))
      .filter(Boolean)
      .map((sector) => tSectors(sector!.titleKey)),
  }));
}
