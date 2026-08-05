/**
 * ProjectsExplorer — فلتر + شبكة مشاريع
 * الصفحة الرئيسية تعرض idleContent لحد ما المستخدم يفلتر
 */
"use client";

import type { ReactNode } from "react";
import ProjectFilters from "@/components/Projects/ProjectFilters";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import { useProjectFilters } from "@/components/Projects/useProjectFilters";
import type { ProjectListItem } from "@/components/Projects/types";
import type { CategoryItem, SectorItem } from "@/types";

export type { ProjectListItem };

type ProjectsExplorerProps = {
  projects: ProjectListItem[];
  categories: CategoryItem[];
  sectors: SectorItem[];
  alwaysShowProjects?: boolean;
  initialScope?: string;
  idleContent?: ReactNode;
};

export default function ProjectsExplorer({
  projects,
  categories,
  sectors,
  alwaysShowProjects = false,
  initialScope = "",
  idleContent,
}: ProjectsExplorerProps) {
  const filters = useProjectFilters(projects, initialScope);
  const showProjects = alwaysShowProjects || filters.isDirty;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
      <ProjectFilters
        categories={categories}
        sectors={sectors}
        filters={{
          ...filters,
          resultCount: filters.filtered.length,
          showResults: showProjects,
        }}
      />

      {!showProjects && idleContent}
      {showProjects && <ProjectGrid projects={filters.filtered} />}
    </div>
  );
}
