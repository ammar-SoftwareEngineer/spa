"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

export type CategoryCardData = {
  title: string;
  description: string;
  badge: string;
  image: string;
  link: string;
  cta: string;
  index: number;
};

type Props = {
  categories: CategoryCardData[];
};

export default function CategoryCards({ categories }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {categories.map((category, index) => (
        <Reveal
          key={category.title}
          delay={index * 0.08}
          className={index === 1 ? "lg:mt-12" : undefined}
        >
          <CategoryCard category={category} />
        </Reveal>
      ))}
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryCardData }) {
  const number = String(category.index + 1).padStart(2, "0");

  return (
    <Link
      href={category.link}
      className="group relative flex h-[400px] items-end overflow-hidden rounded-[28px] border border-border/60 shadow-[0_16px_48px_rgba(13,59,77,0.14)] outline-none transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_28px_64px_rgba(33,118,149,0.28)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:h-[520px] md:rounded-[32px]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={category.index === 0}
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018] via-[#0d3b4d]/72 to-[#0d3b4d]/15 transition-opacity duration-700 group-hover:via-[#0d3b4d]/78" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(33,118,149,0.35),transparent_55%)] opacity-50 transition-opacity duration-700 group-hover:opacity-80" />

      <div className="pointer-events-none absolute inset-y-0 start-0 z-[2] w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[260%]" />

      <span
        aria-hidden
        className="pointer-events-none absolute end-5 top-3 z-[2] select-none text-[7rem] font-bold leading-none text-white/[0.07] transition-all duration-500 group-hover:text-white/[0.12] md:end-8 md:top-4 md:text-[9rem] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
      >
        {number}
      </span>

      <div className="pointer-events-none absolute inset-4 z-[2] rounded-[22px] border border-white/0 transition-all duration-500 group-hover:border-white/15 md:inset-5 md:rounded-[26px]" />
      <div className="pointer-events-none absolute start-8 top-8 z-[2] h-10 w-10 border-s-2 border-t-2 border-brand/0 transition-all duration-500 group-hover:border-brand/80" />
      <div className="pointer-events-none absolute bottom-8 end-8 z-[2] h-10 w-10 border-e-2 border-b-2 border-white/0 transition-all duration-500 group-hover:border-white/50" />

      <div className="relative z-[3] flex w-full flex-col gap-4 p-7 md:gap-5 md:p-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-md bg-brand px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(33,118,149,0.35)]">
            {category.badge}
          </span>
          <span className="h-px flex-1 origin-start scale-x-0 bg-gradient-to-r from-brand/80 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:bg-gradient-to-l" />
        </div>

        <div className="flex flex-col gap-2.5">
          <h3 className="max-w-[18ch] text-[1.75rem] font-bold leading-[1.1] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] md:text-[2.35rem] ltr:font-[family-name:var(--font-bebas-neue)] ltr:tracking-[0.04em]">
            {category.title}
          </h3>
          <p className="max-w-[420px] text-[0.92rem] leading-[1.65] text-white/75 transition-colors duration-500 group-hover:text-white/90 md:text-[0.98rem]">
            {category.description}
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between gap-4">
          <span className="text-[0.95rem] font-semibold text-white transition-colors duration-300 group-hover:text-brand">
            {category.cta}
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:translate-x-1 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_10px_28px_rgba(33,118,149,0.45)] rtl:group-hover:-translate-x-1">
            <ArrowRight size={18} className="rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
}
