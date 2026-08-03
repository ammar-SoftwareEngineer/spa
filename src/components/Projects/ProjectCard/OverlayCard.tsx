import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ProjectCardBodyProps } from "@/components/Projects/ProjectCard/types";

export default function OverlayCard({
  href,
  image,
  title,
  description,
  location,
  tags,
  year,
  number,
}: ProjectCardBodyProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-[24px] outline-none transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-[380px] shadow-[0_14px_40px_rgba(13,59,77,0.14)] hover:shadow-[0_24px_56px_rgba(33,118,149,0.22)]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#061018] via-[#061018]/50 to-transparent" />
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(33,118,149,0.28),transparent_55%)] opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

      <span
        aria-hidden
        className="pointer-events-none absolute end-3 top-2 select-none text-[4rem] font-bold leading-none text-white/[0.12] sm:end-4 sm:top-3 sm:text-[5rem] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
      >
        {number}
      </span>

      <span className="absolute start-4 top-4 z-[1] inline-flex rounded-md bg-brand px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white">
        {year}
      </span>

      <span className="relative z-[1] mt-auto flex flex-col gap-2 p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-white/80">
          <MapPin size={14} className="shrink-0 text-brand" />
          <span className="truncate">{location}</span>
        </span>
        <span className="h-0.5 w-8 origin-start scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
        <span className="text-[1.2rem] font-bold leading-[1.25] text-white">{title}</span>
        <span className="line-clamp-2 text-[0.9rem] leading-[1.65] text-white/75">{description}</span>
        {tags.length > 0 ? (
          <span className="mt-1 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
