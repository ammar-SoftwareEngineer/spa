/**
 * ProjectFilters — شريط فلترة المشاريع (نطاق / قطاع / ترتيب / بحث)
 * بياخد object واحد filters بدل props كتير
 */
"use client";

import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import type { CategoryItem, SectorItem } from "@/types";
import type { SortOption } from "@/components/Projects/types";

export type ProjectFiltersState = {
  scope: string;
  sector: string;
  sort: SortOption;
  query: string;
  resultCount: number;
  showResults: boolean;
  isDirty: boolean;
  setScope: (value: string) => void;
  setSector: (value: string) => void;
  setSort: (value: SortOption) => void;
  setQuery: (value: string) => void;
  clearFilters: () => void;
};

type ProjectFiltersProps = {
  categories: CategoryItem[];
  sectors: SectorItem[];
  filters: ProjectFiltersState;
};

const inputClass =
  "w-full min-h-11 appearance-none rounded-xl border border-border bg-bg-primary px-3 py-2.5 pe-10 text-[0.88rem] text-text-primary outline-none transition-[border-color,box-shadow] focus:border-brand focus:shadow-[0_0_0_3px_rgba(33,118,149,0.15)] sm:px-4 sm:py-3 sm:text-[0.92rem]";

export default function ProjectFilters({
  categories,
  sectors,
  filters,
}: ProjectFiltersProps) {
  const t = useTranslations("projects");
  const tHome = useTranslations("home.projects");
  const tSectors = useTranslations("home.sectors");

  return (
    <div className="rounded-[18px] border border-border/70 bg-bg-secondary/60 p-3 shadow-[var(--card-shadow)] sm:rounded-[24px] sm:p-4 md:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <label className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-text-muted sm:text-[0.78rem]">
            {t("filters.scope")}
          </span>
          <div className="relative">
            <select
              value={filters.scope}
              onChange={(e) => filters.setScope(e.target.value)}
              className={inputClass}
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

        <label className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-text-muted sm:text-[0.78rem]">
            {t("filters.sector")}
          </span>
          <div className="relative">
            <select
              value={filters.sector}
              onChange={(e) => filters.setSector(e.target.value)}
              className={inputClass}
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

        <label className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-text-muted sm:text-[0.78rem]">
            {t("filters.sort")}
          </span>
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => filters.setSort(e.target.value as SortOption)}
              className={inputClass}
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

        <label className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-text-muted sm:text-[0.78rem]">
            {t("filters.search")}
          </span>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(e) => filters.setQuery(e.target.value)}
              placeholder={t("filters.searchPlaceholder")}
              className={`${inputClass} ps-10`}
            />
          </div>
        </label>
      </div>

      {filters.showResults ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 sm:mt-4 sm:pt-4">
          <p className="m-0 text-[0.85rem] text-text-secondary sm:text-[0.9rem]">
            {t("filters.results", { count: filters.resultCount })}
          </p>
          {filters.isDirty ? (
            <button
              type="button"
              onClick={filters.clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8rem] font-semibold text-brand transition-colors hover:bg-brand/10 sm:text-[0.85rem]"
            >
              <X size={14} />
              {t("filters.clear")}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
