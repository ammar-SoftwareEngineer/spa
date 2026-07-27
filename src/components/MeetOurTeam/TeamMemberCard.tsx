import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { TeamMember } from "@/types";

type TeamMemberCardProps = {
  member: TeamMember;
  name: string;
  role: string;
  index?: number;
  delay?: number;
};

export default function TeamMemberCard({
  member,
  name,
  role,
  index = 0,
  delay = 0,
}: TeamMemberCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={delay} className="col-span-12 sm:col-span-6 lg:col-span-3">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-bg-primary shadow-[0_16px_48px_rgba(13,59,77,0.12)] transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_28px_64px_rgba(33,118,149,0.24)]">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={member.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />

          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018] via-[#0d3b4d]/55 to-transparent transition-opacity duration-700 group-hover:via-[#0d3b4d]/70" />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(33,118,149,0.28),transparent_55%)] opacity-40 transition-opacity duration-700 group-hover:opacity-75" />

          <div className="pointer-events-none absolute inset-y-0 start-0 z-[2] w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[260%]" />

          <span
            aria-hidden
            className="pointer-events-none absolute end-3 top-2 z-[2] select-none text-[5rem] font-bold leading-none text-white/[0.08] transition-all duration-500 group-hover:text-white/[0.14] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
          >
            {number}
          </span>

          <div className="pointer-events-none absolute inset-3 z-[2] rounded-[22px] border border-white/0 transition-all duration-500 group-hover:border-white/15" />
          <div className="pointer-events-none absolute start-5 top-5 z-[2] h-8 w-8 border-s-2 border-t-2 border-brand/0 transition-all duration-500 group-hover:border-brand/80" />
          <div className="pointer-events-none absolute bottom-5 end-5 z-[2] h-8 w-8 border-e-2 border-b-2 border-white/0 transition-all duration-500 group-hover:border-white/50" />

          <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-2 p-5 md:p-6">
            <span className="inline-flex w-fit items-center rounded-md bg-brand px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(33,118,149,0.35)]">
              {role}
            </span>
            <div className="flex items-end justify-between gap-3">
              <h3 className="m-0 text-[1.2rem] font-bold leading-[1.2] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] md:text-[1.35rem]">
                {name}
              </h3>
              <span className="mb-0.5 h-px w-0 flex-1 origin-start bg-gradient-to-r from-brand/80 to-transparent transition-all duration-500 ease-out group-hover:w-full rtl:bg-gradient-to-l" />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
