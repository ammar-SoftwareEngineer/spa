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
      <div className="relative">
        <div className="pointer-events-none absolute start-7 top-0 hidden h-full w-px bg-linear-to-b from-brand/10 via-brand/35 to-brand/10 lg:block xl:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-linear-to-r from-brand/10 via-brand/35 to-brand/10 xl:block" />

        <div className="grid grid-cols-12 gap-5 md:gap-6 xl:gap-0">
          {counters.map((counter, index) => {
            const Icon = getIcon(counter.icon);
            const isLast = index === counters.length - 1;

            return (
              <Reveal
                key={counter.key}
                delay={index * 0.08}
                className="group col-span-12 sm:col-span-6 xl:col-span-3"
              >
                <div className="relative h-full xl:px-4">
                  <div className="relative flex h-full gap-4 px-1 py-2 md:px-2 xl:min-h-[220px] xl:flex-col xl:py-0">
                    <div className="relative z-2 flex shrink-0 flex-col items-center xl:items-start">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/15 bg-bg-primary text-brand shadow-[0_10px_30px_rgba(13,59,77,0.08)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand/35 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_16px_40px_rgba(33,118,149,0.22)]">
                        <Icon size={24} />
                      </div>
                      <div className="mt-4 hidden h-full w-px flex-1 bg-linear-to-b from-brand/70 to-transparent transition-colors duration-500 group-hover:from-brand lg:block xl:hidden" />
                    </div>

                    <div className="relative z-2 min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-end gap-3">
               
                        <span
                          aria-hidden
                          className="select-none text-[3.2rem] font-bold leading-none text-brand/[0.06] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-end gap-2">
                        <span className="pb-1 text-[1.05rem] font-bold leading-none text-brand ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]">
                          {counter.suffix}
                        </span>
                        <div className="text-[2.2rem] font-bold leading-none text-text-primary transition-colors duration-500 group-hover:text-brand ltr:font-[family-name:var(--font-bebas-neue)] ltr:text-[2.7rem] rtl:font-[family-name:var(--font-cairo)]">
                          <CountUp value={counter.value} />
                        </div>
                      </div>

                      <span className="mt-3 block h-px w-14 bg-linear-to-r from-brand to-transparent transition-all duration-500 group-hover:w-24 rtl:bg-linear-to-l" />

                      <p className="mt-4 max-w-[18rem] text-[0.95rem] font-medium leading-[1.65] text-text-secondary transition-colors duration-500 group-hover:text-text-primary">
                        {t(`counters.${counter.key}`)}
                      </p>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute start-11 top-7 hidden h-px w-[calc(100%-1rem)] bg-linear-to-r from-brand/40 to-transparent xl:block" />
                  {!isLast ? (
                    <div className="pointer-events-none absolute end-0 top-[1.55rem] hidden h-3 w-3 rounded-full border-2 border-brand bg-bg-secondary xl:block" />
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
