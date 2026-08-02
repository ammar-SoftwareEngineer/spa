"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { ProductLineItem } from "@/types";

type ProductLineCardProps = {
  line: ProductLineItem;
  title: string;
  description: string;
  index?: number;
  delay?: number;
  inquireLabel: string;
  onInquire: () => void;
  active?: boolean;
};

export default function ProductLineCard({
  line,
  title,
  description,
  index = 0,
  delay = 0,
  inquireLabel,
  onInquire,
  active = false,
}: ProductLineCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={delay} className="h-full w-full">
      <button
        type="button"
        onClick={onInquire}
        aria-label={inquireLabel}
        aria-pressed={active}
        className={`group relative flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-[24px] text-start outline-none transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-[340px] ${
          active
            ? "shadow-[0_24px_56px_rgba(33,118,149,0.28)] ring-2 ring-brand"
            : "shadow-[0_14px_40px_rgba(13,59,77,0.14)] hover:shadow-[0_24px_56px_rgba(33,118,149,0.22)]"
        }`}
      >
        <Image
          src={line.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-[#061018] via-[#061018]/45 to-transparent" />
        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(33,118,149,0.28),transparent_55%)] opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

        <span
          aria-hidden
          className="pointer-events-none absolute end-3 top-2 select-none text-[4rem] font-bold leading-none text-white/[0.12] transition-colors duration-500 group-hover:text-white/[0.18] sm:end-4 sm:top-3 sm:text-[5rem] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
        >
          {number}
        </span>

        <span className="pointer-events-none absolute start-4 top-4 h-8 w-8 border-s border-t border-white/30 transition-colors duration-500 group-hover:border-brand sm:start-5 sm:top-5" />
        <span className="pointer-events-none absolute bottom-4 end-4 h-8 w-8 border-e border-b border-white/20 transition-colors duration-500 group-hover:border-white/50 sm:bottom-5 sm:end-5" />

        <span className="relative z-[1] mt-auto flex flex-col gap-2 p-5 sm:p-6">
          <span className="h-0.5 w-8 origin-start scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
          <span className="text-[1.15rem] font-bold leading-[1.25] text-white sm:text-[1.25rem]">
            {title}
          </span>
          <span className="line-clamp-2 text-[0.9rem] leading-[1.65] text-white/75">
            {description}
          </span>
        </span>
      </button>
    </Reveal>
  );
}
