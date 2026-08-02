import projectsData from "@/lib/data/projects.json";
import type { ProjectItem } from "@/types";

export type { ProjectItem };

const projects = projectsData as ProjectItem[];

export async function getProjects(): Promise<ProjectItem[]> {
  return projects;
}

export async function getProjectsByServiceSlug(serviceSlug: string): Promise<ProjectItem[]> {
  return projects.filter((project) => project.serviceSlugs.includes(serviceSlug));
}

export async function getProjectsByCategorySlug(categorySlug: string): Promise<ProjectItem[]> {
  return projects.filter((project) => project.categorySlugs.includes(categorySlug));
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  return projects.find((project) => project.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  return projects.map((project) => project.slug);
}
