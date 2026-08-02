"use client";

import { useMemo, useState } from "react";
import type { ProjectListItem, SortOption } from "@/components/Projects/types";

/**
 * Holds filter state and returns the filtered project list.
 * Used by ProjectsExplorer.
 */
export function useProjectFilters(
  projects: ProjectListItem[],
  initialScope = ""
) {
  const [scope, setScope] = useState(initialScope);
  const [sector, setSector] = useState("");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [query, setQuery] = useState("");

  // True when the user changed something from the starting values
  const isDirty =
    scope !== initialScope ||
    sector !== "" ||
    query.trim() !== "" ||
    sort !== "recommended";

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    const list = projects.filter((project) => {
      const matchScope = !scope || project.categorySlugs.includes(scope);
      const matchSector = !sector || project.sectorSlugs.includes(sector);

      if (!matchScope || !matchSector) return false;
      if (!search) return true;

      const text = [
        project.title,
        project.description,
        project.location,
        ...project.categoryLabels,
        ...project.sectorLabels,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(search);
    });

    return sortProjects(list, sort);
  }, [projects, scope, sector, sort, query]);

  function clearFilters() {
    setScope(initialScope);
    setSector("");
    setSort("recommended");
    setQuery("");
  }

  return {
    scope,
    setScope,
    sector,
    setSector,
    sort,
    setSort,
    query,
    setQuery,
    filtered,
    isDirty,
    clearFilters,
  };
}

function sortProjects(list: ProjectListItem[], sort: SortOption) {
  const copy = [...list];

  copy.sort((a, b) => {
    if (sort === "newest") return b.date.localeCompare(a.date);
    if (sort === "oldest") return a.date.localeCompare(b.date);
    if (sort === "name-asc") return a.title.localeCompare(b.title);
    if (sort === "name-desc") return b.title.localeCompare(a.title);

    // recommended: featured first, then newest
    const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDiff !== 0) return featuredDiff;
    return b.date.localeCompare(a.date);
  });

  return copy;
}
