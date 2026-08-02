"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import ProjectCard from "@/components/Services/ProjectCard";
import type { CategoryItem, ProjectItem, SectorItem } from "@/types";

export type ProjectListItem = ProjectItem & {
  title: string;
  description: string;
  location: string;
  categoryLabels: string[];
  sectorLabels: string[];
};

type SortOption = "recommended" | "newest" | "oldest" | "name-asc" | "name-desc";

type ProjectsExplorerProps = {
  projects: ProjectListItem[];
  categories: CategoryItem[];
  sectors: SectorItem[];
  /** Category pages: always show the project grid under the filter. */
  alwaysShowProjects?: boolean;
  /** Pre-select Scope of Works (category slug). */
  initialScope?: string;
  /** Main projects page: category cards while filters are idle. */
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
  const t = useTranslations("projects");
  const tHome = useTranslations("home.projects");
  const tSectors = useTranslations("home.sectors");

  const [scope, setScope] = useState(initialScope);
  const [sector, setSector] = useState("");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [query, setQuery] = useState("");

  const isDirty =
    scope !== initialScope ||
    Boolean(sector) ||
    Boolean(query.trim()) ||
    sort !== "recommended";

  const showProjects = alwaysShowProjects || isDirty;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = projects.filter((project) => {
      if (scope && !project.categorySlugs.includes(scope)) return false;
      if (sector && !project.sectorSlugs.includes(sector)) return false;
      if (!q) return true;

      const haystack = [
        project.title,
        project.description,
        project.location,
        ...project.categoryLabels,
        ...project.sectorLabels,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.date.localeCompare(a.date);
        case "oldest":
          return a.date.localeCompare(b.date);
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "recommended":
        default: {
          const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
          if (featuredDiff !== 0) return featuredDiff;
          return b.date.localeCompare(a.date);
        }
      }
    });

    return list;
  }, [projects, scope, sector, sort, query]);

  function clearFilters() {
    setScope(initialScope);
    setSector("");
    setSort("recommended");
    setQuery("");
  }

  const selectClass =
    "w-full appearance-none rounded-xl border border-border bg-bg-primary px-4 py-3 pe-10 text-[0.92rem] text-text-primary outline-none transition-[border-color,box-shadow] focus:border-brand focus:shadow-[0_0_0_3px_rgba(33,118,149,0.15)]";

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="rounded-[24px] border border-border/70 bg-bg-secondary/60 p-4 shadow-[var(--card-shadow)] backdrop-blur-sm md:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="flex flex-col gap-2">
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-text-muted">
              {t("filters.scope")}
            </span>
            <div className="relative">
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className={selectClass}
                aria-label={t("filters.scope")}
              >
                <option value="">{t("filters.scopeAll")}</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {tHome(category.titleKey)}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-text-muted">
                ▾
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-text-muted">
              {t("filters.sector")}
            </span>
            <div className="relative">
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className={selectClass}
                aria-label={t("filters.sector")}
              >
                <option value="">{t("filters.sectorAll")}</option>
                {sectors.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {tSectors(item.titleKey)}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-text-muted">
                ▾
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-text-muted">
              {t("filters.sort")}
            </span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className={selectClass}
                aria-label={t("filters.sort")}
              >
                <option value="recommended">{t("filters.sortRecommended")}</option>
                <option value="newest">{t("filters.sortNewest")}</option>
                <option value="oldest">{t("filters.sortOldest")}</option>
                <option value="name-asc">{t("filters.sortNameAsc")}</option>
                <option value="name-desc">{t("filters.sortNameDesc")}</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-text-muted">
                ▾
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-text-muted">
              {t("filters.search")}
            </span>
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("filters.searchPlaceholder")}
                className={`${selectClass} ps-10`}
                aria-label={t("filters.search")}
              />
            </div>
          </label>
        </div>

        {showProjects ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
            <p className="m-0 text-[0.9rem] text-text-secondary">
              {t("filters.results", { count: filtered.length })}
            </p>
            {isDirty ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.85rem] font-semibold text-brand transition-colors hover:bg-brand/10"
              >
                <X size={14} />
                {t("filters.clear")}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {!showProjects && idleContent ? idleContent : null}

      {showProjects ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 md:gap-7">
            {filtered.map((project, index) => (
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
        ) : (
          <p className="rounded-[24px] border border-dashed border-border px-6 py-16 text-center text-text-secondary">
            {t("filters.empty")}
          </p>
        )
      ) : null}
    </div>
  );
}
