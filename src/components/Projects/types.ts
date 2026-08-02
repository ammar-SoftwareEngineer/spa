import type { ProjectItem } from "@/types";

/** Project with ready-to-show text (already translated on the server). */
export type ProjectListItem = ProjectItem & {
  title: string;
  description: string;
  location: string;
  categoryLabels: string[];
  sectorLabels: string[];
};

export type SortOption =
  | "recommended"
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc";
