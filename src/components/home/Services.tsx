import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/api/services";
import { getSiteData } from "@/lib/api/site";
import { getIcon } from "@/lib/icons";
export default async function Services() {
  const [services, site, t, locale] = await Promise.all([
    getServices(),
    getSiteData(),
    getTranslations("home.services"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";

  return (
    <Section
      id="services"
      variant="alt"
      className="overflow-x-clip py-[80px] lg:py-[120px]"
      containerClassName="flex flex-col items-center"
      style={{
        backgroundImage: `url(${site.media.servicesPattern})`,
        backgroundSize: "contain",
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderSection subtitle={t("title")} title={t("header")} />

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = getIcon(service.icon);
          return (
            <Reveal
              key={service.titleKey}
              delay={index * 0.08}
              className="flex h-full flex-col rounded-[28px] bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3 className="text-[1.05rem] font-bold leading-snug text-[#0d3b4d] md:text-[1.15rem]">
                  {t(service.titleKey)}
                </h3>
              </div>
              <p className="mb-6 flex-1 text-[0.92rem] leading-[1.7] text-[#666666]">
                {t(service.descKey)}
              </p>
              <a
                href="#services-all"
                className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                <span>{t("readMore")}</span>
                <ArrowRight size={15} className="rtl:rotate-180" />
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={services.length * 0.08} className="mt-12 md:mt-14">
        <Button href="#services-all" size="lg" rtl={isRtl}>
          {t("viewAll")}
        </Button>
      </Reveal>
    </Section>
  );
}
