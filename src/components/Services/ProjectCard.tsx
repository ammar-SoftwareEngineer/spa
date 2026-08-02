"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import type { ProjectItem } from "@/types";

type ProjectCardProps = {
  project: ProjectItem;
  title: string;
  description: string;
  location: string;
  tags?: string[];
  delay?: number;
};

export default function ProjectCard({
  project,
  title,
  description,
  location,
  tags = [],
  delay = 0,
}: ProjectCardProps) {
  const t = useTranslations("projects");

  return (
    <Reveal delay={delay} className="h-full w-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-border/60 bg-bg-primary shadow-[0_16px_48px_rgba(13,59,77,0.12)] outline-none transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_28px_64px_rgba(33,118,149,0.24)] focus-visible:ring-2 focus-visible:ring-brand sm:rounded-[28px]"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018] via-[#0d3b4d]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 start-0 z-[2] hidden w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[260%] sm:block" />
          <span className="absolute start-3 bottom-3 z-[3] inline-flex max-w-[calc(100%-1.5rem)] truncate rounded-md bg-brand px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white sm:start-5 sm:bottom-5 sm:px-2.5 sm:text-[0.7rem]">
            {location}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-5 sm:gap-3 sm:p-6 md:p-7">
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-md border border-border/80 bg-bg-secondary px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-text-secondary sm:px-2.5 sm:py-1 sm:text-[0.68rem]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <h3 className="m-0 text-[1.05rem] font-bold leading-[1.3] text-text-primary sm:text-[1.2rem] sm:leading-[1.25]">
            {title}
          </h3>
          <p className="m-0 flex-1 text-[0.9rem] leading-[1.65] text-text-secondary sm:text-[0.95rem] sm:leading-[1.7]">
            {description}
          </p>
          <span className="mt-1 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-brand transition-transform duration-500 group-hover:translate-x-1 sm:text-[0.9rem] rtl:group-hover:-translate-x-1">
            {t("detail.readMore")}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
