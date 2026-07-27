import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import type { ServiceItem } from "@/types";

type ServiceCardProps = {
  service: ServiceItem;
  title: string;
  description: string;
  cta: string;
  index?: number;
  delay?: number;
};

export default function ServiceCard({
  service,
  title,
  description,
  cta,
  index = 0,
  delay = 0,
}: ServiceCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={delay} className="col-span-12 sm:col-span-6 xl:col-span-3">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-bg-primary shadow-[0_16px_48px_rgba(13,59,77,0.12)] outline-none transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_28px_64px_rgba(33,118,149,0.24)] focus-visible:ring-2 focus-visible:ring-brand"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018]/80 via-[#0d3b4d]/25 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 start-0 z-[2] w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[260%]" />
          <span
            aria-hidden
            className="pointer-events-none absolute end-3 top-2 z-[2] select-none text-[4.5rem] font-bold leading-none text-white/[0.1] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
          >
            {number}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
          <h3 className="m-0 text-[1.2rem] font-bold leading-[1.25] text-text-primary md:text-[1.3rem]">
            {title}
          </h3>
          <p className="m-0 flex-1 text-[0.95rem] leading-[1.7] text-text-secondary">
            {description}
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-brand transition-colors group-hover:text-brand-hover">
            {cta}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
