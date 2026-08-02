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
  // Category page: always show the project list
  alwaysShowProjects?: boolean;
  // Category page: start with this scope selected
  initialScope?: string;
  // Main projects page: show this when filters are empty (category cards)
  idleContent?: ReactNode;
};

/**
 * Filter bar + project list.
 *
 * - Main /projects page: shows idleContent until user filters
 * - Category page: alwaysShowProjects + initialScope
 */
export default function ProjectsExplorer({
  projects,
  categories,
  sectors,
  alwaysShowProjects = false,
  initialScope = "",
  idleContent,
}: ProjectsExplorerProps) {
  const filters = useProjectFilters(projects, initialScope);

  // Show projects on category pages, or when the user starts filtering
  const showProjects = alwaysShowProjects || filters.isDirty;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
      <ProjectFilters
        categories={categories}
        sectors={sectors}
        scope={filters.scope}
        sector={filters.sector}
        sort={filters.sort}
        query={filters.query}
        resultCount={filters.filtered.length}
        showResults={showProjects}
        isDirty={filters.isDirty}
        onScopeChange={filters.setScope}
        onSectorChange={filters.setSector}
        onSortChange={filters.setSort}
        onQueryChange={filters.setQuery}
        onClear={filters.clearFilters}
      />

      {!showProjects && idleContent}

      {showProjects && <ProjectGrid projects={filters.filtered} />}
    </div>
  );
}
