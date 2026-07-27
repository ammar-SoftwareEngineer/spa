import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { ProjectItem } from "@/types";

type ProjectCardProps = {
  project: ProjectItem;
  title: string;
  description: string;
  location: string;
  delay?: number;
};

export default function ProjectCard({
  project,
  title,
  description,
  location,
  delay = 0,
}: ProjectCardProps) {
  return (
    <Reveal delay={delay} className="col-span-12 sm:col-span-6 lg:col-span-4">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-bg-primary shadow-[0_16px_48px_rgba(13,59,77,0.12)] transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_28px_64px_rgba(33,118,149,0.24)]">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018] via-[#0d3b4d]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 start-0 z-[2] w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[260%]" />
          <span className="absolute start-5 bottom-5 z-[3] inline-flex rounded-md bg-brand px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white">
            {location}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
          <h3 className="m-0 text-[1.2rem] font-bold leading-[1.25] text-text-primary">
            {title}
          </h3>
          <p className="m-0 flex-1 text-[0.95rem] leading-[1.7] text-text-secondary">
            {description}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
