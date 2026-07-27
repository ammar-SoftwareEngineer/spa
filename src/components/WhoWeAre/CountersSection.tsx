import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CountUp from "@/components/ui/CountUp";
import { getAboutCounters } from "@/lib/api/about";
import { getIcon } from "@/lib/icons";

export default async function CountersSection() {
  const [counters, t] = await Promise.all([
    getAboutCounters(),
    getTranslations("about"),
  ]);

  return (
    <Section variant="alt" className="overflow-x-clip py-16 md:py-20">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {counters.map((counter, index) => {
          const Icon = getIcon(counter.icon);
          return (
            <Reveal
              key={counter.key}
              delay={index * 0.08}
              className="group col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-bg-primary p-6 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_36px_rgba(33,118,149,0.14)] md:p-7">
                <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-brand via-[#1a85a3] to-[#0d3b4d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                <div className="relative z-[1] mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/12 text-brand transition-all duration-500 group-hover:bg-white/20 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-text-muted transition-colors duration-500 group-hover:text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative z-[1] text-[2.2rem] font-bold leading-none text-text-primary transition-colors duration-500 group-hover:text-white ltr:font-[family-name:var(--font-bebas-neue)] ltr:text-[2.5rem] rtl:font-[family-name:var(--font-cairo)]">
                  <CountUp value={counter.value} />
                  {counter.suffix}
                </div>
                <p className="relative z-[1] mt-3 text-[0.92rem] font-medium leading-snug text-text-secondary transition-colors duration-500 group-hover:text-white/85">
                  {t(`counters.${counter.key}`)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
