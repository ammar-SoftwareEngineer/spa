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
