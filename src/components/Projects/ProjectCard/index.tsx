"use client";

import Reveal from "@/components/ui/Reveal";
import OverlayCard from "@/components/Projects/ProjectCard/OverlayCard";
import type { ProjectCardProps } from "@/components/Projects/ProjectCard/types";

export type { ProjectCardProps } from "@/components/Projects/ProjectCard/types";

export default function ProjectCard({
  project,
  title,
  description,
  location,
  tags = [],
  index = 0,
  delay = 0,
}: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const year = project.date.slice(0, 4);

  return (
    <Reveal delay={delay} className="h-full w-full">
      <OverlayCard
        href={`/projects/${project.slug}`}
        image={project.image}
        title={title}
        description={description}
        location={location}
        tags={tags}
        year={year}
        number={number}
      />
    </Reveal>
  );
}
