import categoriesData from "@/lib/data/categories.json";
import type { CategoryItem } from "@/types";

export type { CategoryItem };

const categories = categoriesData as CategoryItem[];

export async function getCategories(): Promise<CategoryItem[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryItem | undefined> {
  return categories.find((category) => category.slug === slug);
}

export async function getCategorySlugs(): Promise<string[]> {
  return categories.map((category) => category.slug);
}
