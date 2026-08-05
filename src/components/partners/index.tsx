import Image from "next/image";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import Reveal from "@/components/ui/Reveal";
import { getPartners } from "@/lib/api/partners";

export default async function PartnersPageView() {
  const [partners, t, tNav] = await Promise.all([
    getPartners(),
    getTranslations("partners"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("partners")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
       

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={Math.min(index * 0.04, 0.4)}>
              <article className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border/70 bg-bg-secondary/80 px-4 py-6 shadow-[var(--card-shadow)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_36px_rgba(33,118,149,0.18)] md:px-5 md:py-7">
                <div className="flex h-16 w-full items-center justify-center md:h-20">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={72}
                    className="h-12 w-auto max-w-[140px] object-contain transition-transform duration-500 group-hover:scale-105 md:h-14 md:max-w-[160px]"
                    style={{ width: "auto" }}
                  />
                </div>
                <h3 className="m-0 text-center text-[0.85rem] font-semibold text-text-primary md:text-[0.95rem]">
                  {partner.name}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
