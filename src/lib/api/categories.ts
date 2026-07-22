import categoriesData from "@/lib/data/categories.json";
import type { CategoryItem } from "@/types";

export type { CategoryItem };

export async function getCategories(): Promise<CategoryItem[]> {
  return categoriesData as CategoryItem[];
}
