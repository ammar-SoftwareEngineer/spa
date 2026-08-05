/**
 * ProjectDetailView — صفحة تفاصيل مشروع واحد
 */
import { getTranslations } from "next-intl/server";
import ProjectHero from "@/components/Projects/ProjectHero";
import ProjectMeta from "@/components/Projects/ProjectMeta";
import ProjectTextBlock from "@/components/Projects/ProjectTextBlock";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import ProjectVideo from "@/components/Projects/ProjectVideo";
import { getCategories } from "@/lib/api/categories";
import { getSectors } from "@/lib/api/sectors";
import type { ProjectItem } from "@/types";

type ProjectDetailViewProps = {
  project: ProjectItem;
};

export default async function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [categories, sectors, t, tNav, tServices, tHome, tSectors] = await Promise.all([
    getCategories(),
    getSectors(),
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("services"),
    getTranslations("home.projects"),
    getTranslations("home.sectors"),
  ]);

  const title = tServices(project.titleKey);
  const location = tServices(project.locationKey);
  const year = project.date.slice(0, 4);
  const overviewImage = project.gallery[1] ?? project.image;
  const scopeImage = project.gallery[2] ?? project.gallery[0] ?? project.image;

  const categoryLabels = project.categorySlugs
    .map((slug) => categories.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => tHome(item!.titleKey));

  const sectorLabels = project.sectorSlugs
    .map((slug) => sectors.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => tSectors(item!.titleKey));

  const meta = [
    { label: t("detail.client"), value: t(project.clientKey) },
    { label: t("detail.location"), value: location },
    { label: t("detail.consultant"), value: t(project.consultantKey) },
    { label: t("detail.status"), value: t(project.statusKey) },
  ];

  return (
    <div className="overflow-x-clip bg-bg-primary">
      <ProjectHero
        image={project.image}
        title={title}
        year={year}
        homeLabel={tNav("home")}
        projectsLabel={t("detail.breadcrumbProjects")}
        sectorLabels={sectorLabels}
        categoryLabels={categoryLabels}
      />

      <ProjectMeta items={meta} />

      <ProjectTextBlock
        imageSrc={overviewImage}
        imageAlt={t(project.overviewTitleKey)}
        eyebrow={t("detail.overview")}
        title={t(project.overviewTitleKey)}
        text={t(project.overviewBodyKey)}
      />

      <ProjectTextBlock
        imageSrc={scopeImage}
        imageAlt={t(project.scopeTitleKey)}
        eyebrow={t("detail.scope")}
        title={t(project.scopeTitleKey)}
        text={t(project.scopeBodyKey)}
        reverse
        altBackground
      />

      {project.videoUrl ? (
        <ProjectVideo
          url={project.videoUrl}
          title={t("detail.video")}
          iframeTitle={`${title} — ${t("detail.video")}`}
        />
      ) : null}

      <ProjectGallery images={project.gallery} title={t("detail.gallery")} />
    </div>
  );
}
