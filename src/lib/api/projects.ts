/**
 * Projects API — JSON محلي الآن، باكند لاحقاً عبر NEXT_PUBLIC_API_URL
 */
import projectsData from "@/lib/data/projects.json";
import { apiGet, hasRemoteApi } from "@/lib/api/client";
import type { ProjectItem } from "@/types";

export type { ProjectItem };

const localProjects = projectsData as ProjectItem[];

export async function getProjects(): Promise<ProjectItem[]> {
  if (hasRemoteApi()) {
    return apiGet<ProjectItem[]>("/projects");
  }
  return localProjects;
}

export async function getProjectsByServiceSlug(serviceSlug: string): Promise<ProjectItem[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.serviceSlugs.includes(serviceSlug));
}

export async function getProjectsByCategorySlug(categorySlug: string): Promise<ProjectItem[]> {
  const projects = await getProjects();
  return projects.filter((project) => project.categorySlugs.includes(categorySlug));
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((project) => project.slug);
}
