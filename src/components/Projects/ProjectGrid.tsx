"use client";

import { useTranslations } from "next-intl";
import ProjectCard from "@/components/Services/ProjectCard";
import type { ProjectListItem } from "@/components/Projects/types";

type ProjectGridProps = {
  projects: ProjectListItem[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useTranslations("projects");

  if (projects.length === 0) {
    return (
      <p className="rounded-[20px] border border-dashed border-border px-4 py-12 text-center text-[0.95rem] text-text-secondary sm:rounded-[24px] sm:px-6 sm:py-16">
        {t("filters.empty")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          title={project.title}
          description={project.description}
          location={project.location}
          tags={[
            ...project.categoryLabels.slice(0, 1),
            ...project.sectorLabels.slice(0, 1),
          ]}
          delay={Math.min(index, 8) * 0.06}
        />
      ))}
    </div>
  );
}
