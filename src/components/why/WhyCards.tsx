"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { getIcon } from "@/lib/icons";
import type { WhyMetric } from "@/types";

const cardBase =
  "group relative overflow-hidden rounded-[20px] border border-border/70 glass-card interactive-card transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/45 hover:shadow-[0_18px_42px_rgba(33,118,149,0.22)]";

const metricClass = `${cardBase} flex min-h-[240px] flex-col justify-start gap-4 px-7 py-[35px] text-start`;
const highlightClass = `${cardBase} flex min-h-[240px] flex-col justify-start gap-4 border-brand/30 bg-gradient-to-br from-brand to-[#0d3b4d] px-7 py-[35px] text-start shadow-[0_10px_30px_rgba(33,118,149,0.2)] hover:border-brand/60 hover:shadow-[0_20px_48px_rgba(33,118,149,0.38)]`;
const ctaClass = `${cardBase} flex min-h-[240px] cursor-pointer flex-col justify-between border-dashed border-brand px-7 py-[35px] text-start hover:border-solid`;

const dots =
  "pointer-events-none absolute inset-0 opacity-60 [background-size:16px_16px] [background-image:radial-gradient(rgba(0,0,0,0.04)_1.2px,transparent_1.2px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1.2px,transparent_1.2px)]";

function HoverBg({ variant }: { variant: "metric" | "highlight" | "cta" }) {
  if (variant === "highlight") {
    return (
      <>
        <div className="pointer-events-none absolute inset-0 z-0 origin-top-right scale-0 bg-gradient-to-bl from-white/25 via-white/5 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
        <div className="pointer-events-none absolute -end-10 -top-10 z-0 h-32 w-32 rounded-full bg-white/0 blur-2xl transition-all duration-700 group-hover:end-2 group-hover:top-2 group-hover:bg-white/20" />
        <div className={`${dots} z-[2] transition-opacity duration-700 group-hover:opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.12)_1.2px,transparent_1.2px)]`} />
      </>
    );
  }
  if (variant === "cta") {
    return (
      <>
        <div className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-gradient-to-tr from-brand/30 via-brand/15 to-brand/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
        <div className="pointer-events-none absolute inset-0 z-0 origin-center scale-0 rounded-[20px] bg-brand/10 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
        <div className={`${dots} z-[1] transition-opacity duration-700 group-hover:opacity-30`} />
      </>
    );
  }
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand via-[#1a85a3] to-[#0d3b4d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
      <div className="pointer-events-none absolute inset-y-0 start-0 z-[1] w-2/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[220%]" />
      <div className={`${dots} z-[2] transition-opacity duration-700 group-hover:opacity-25`} />
    </>
  );
}

type Props = {
  item: WhyMetric;
  staggerIndex: number;
  title: string;
  description: string;
  textValue?: string;
};

export function WhyMetricCard({ item, staggerIndex, title, description, textValue }: Props) {
  const isHighlight = item.isHighlight === true;
  const Icon = item.icon ? getIcon(item.icon) : null;

  return (
    <Reveal delay={staggerIndex * 0.08} className={isHighlight ? highlightClass : metricClass}>
      <HoverBg variant={isHighlight ? "highlight" : "metric"} />
      <div className="relative z-[3] flex items-center justify-between">
        <div
          className={`text-[2.4rem] font-bold leading-none transition-colors duration-700 ltr:font-[family-name:var(--font-bebas-neue)] ltr:text-[2.6rem] ${
            isHighlight ? "text-white" : "text-brand group-hover:text-white"
          }`}
        >
          {item.rawNumber > 0 ? (
            <>
              <CountUp value={item.rawNumber} />
              {item.suffix ?? ""}
            </>
          ) : (
            textValue
          )}
        </div>
        {Icon ? (
          <span
            className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.06] ${
              isHighlight
                ? "text-white/80 group-hover:text-white"
                : "text-text-muted opacity-60 group-hover:text-white group-hover:opacity-100"
            }`}
          >
            <Icon size={26} />
          </span>
        ) : null}
      </div>
      <h3
        className={`relative z-[3] text-[1.15rem] font-bold transition-colors duration-700 ${
          isHighlight ? "text-white" : "text-text-primary group-hover:text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`relative z-[3] text-[0.88rem] leading-[1.6] transition-colors duration-700 ${
          isHighlight ? "text-white/85 group-hover:text-white" : "text-text-secondary group-hover:text-white/85"
        }`}
      >
        {description}
      </p>
    </Reveal>
  );
}

export function WhyCtaCard({
  staggerIndex,
  title,
  description,
}: {
  staggerIndex: number;
  title: string;
  description: string;
}) {
  return (
    <Reveal delay={staggerIndex * 0.08} className={ctaClass}>
      <HoverBg variant="cta" />
      <div className="relative z-[3] flex flex-col gap-3">
        <h3 className="text-[1.25rem] font-bold text-text-primary transition-colors duration-700 group-hover:text-brand">
          {title}
        </h3>
        <p className="text-[0.88rem] leading-[1.5] text-text-secondary transition-colors duration-700 group-hover:text-text-primary">
          {description}
        </p>
      </div>
      <div className="relative z-[3] flex h-[42px] w-[42px] items-center justify-center rounded-full bg-brand text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px] group-hover:bg-navy group-hover:shadow-[0_8px_20px_rgba(33,118,149,0.4)] rtl:group-hover:-translate-x-[5px]">
        <ArrowRight size={18} className="rtl:rotate-180" />
      </div>
    </Reveal>
  );
}
