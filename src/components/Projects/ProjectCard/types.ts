import type { ProjectItem } from "@/types";

export type ProjectCardProps = {
  project: ProjectItem;
  title: string;
  description: string;
  location: string;
  tags?: string[];
  index?: number;
  delay?: number;
};

export type ProjectCardBodyProps = {
  href: string;
  image: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  year: string;
  number: string;
};
