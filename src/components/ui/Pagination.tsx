import { ArrowLeft, ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import PaginationButton from "@/components/ui/PaginationButton";

type PaginationProps = {
  activePage: number;
  totalPages: number;
  basePath: string;
  className?: string;
  pageParam?: string;
  /** e.g. `material=wood&isNew=true` — page number is added automatically */
  filterQuery?: string;
  hash?: string;
  /** next-intl namespace for labels, e.g. "products.pagination" */
  labelsNamespace?: string;
};

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function pageHref(
  basePath: string,
  page: number,
  pageParam: string,
  filterQuery?: string,
  hash?: string,
) {
  const params = new URLSearchParams(filterQuery);
  if (page > 1) params.set(pageParam, String(page));
  else params.delete(pageParam);
  const qs = params.toString();
  const path = qs ? `${basePath}?${qs}` : basePath;
  return hash ? `${path}#${hash}` : path;
}

export default async function Pagination({
  activePage,
  totalPages,
  basePath,
  className = "",
  pageParam = "page",
  filterQuery,
  hash,
  labelsNamespace = "products.pagination",
}: PaginationProps) {
  const [t, locale] = await Promise.all([
    getTranslations(labelsNamespace),
    getLocale(),
  ]);

  if (totalPages < 2) return null;

  const pages = getPages(activePage, totalPages);
  const previousPage = activePage - 1;
  const nextPage = activePage + 1;
  const isRtl = locale === "ar";
  const PrevIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <nav
      aria-label={t("navAria")}
      className={`mt-10 flex flex-col items-center gap-4 border-t border-border pt-8 ${className}`}
    >
      <p className="text-sm tabular-nums text-text-secondary">
        {t("summary", { page: activePage, total: totalPages })}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <PaginationButton
          href={pageHref(basePath, previousPage, pageParam, filterQuery, hash)}
          label={t("previous")}
          isDisabled={previousPage < 1}
        >
          <PrevIcon size={18} />
        </PaginationButton>

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-text-muted"
              aria-hidden
            >
              ...
            </span>
          ) : (
            <PaginationButton
              key={page}
              href={pageHref(basePath, page, pageParam, filterQuery, hash)}
              label={t("goToPage", { n: page })}
              isActive={page === activePage}
            >
              {page}
            </PaginationButton>
          ),
        )}

        <PaginationButton
          href={pageHref(basePath, nextPage, pageParam, filterQuery, hash)}
          label={t("next")}
          isDisabled={nextPage > totalPages}
        >
          <NextIcon size={18} />
        </PaginationButton>
      </div>
    </nav>
  );
}
