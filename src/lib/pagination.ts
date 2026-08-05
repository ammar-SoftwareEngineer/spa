export const PRODUCT_LINES_PER_PAGE = 9;

export function paginateItems<T>(
  items: T[],
  page: number,
  perPage: number = PRODUCT_LINES_PER_PAGE,
): {
  items: T[];
  activePage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  startIndex: number;
} {
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const activePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (activePage - 1) * perPage;

  return {
    items: items.slice(startIndex, startIndex + perPage),
    activePage,
    totalPages,
    totalCount,
    perPage,
    startIndex,
  };
}
