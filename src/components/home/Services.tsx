import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/api/services";
import { getSiteData } from "@/lib/api/site";
import { getIcon } from "@/lib/icons";
import ServiceCard from "../Services/ServiceCard";

export default async function Services() {
  const [services, site, t, tServices, locale] = await Promise.all([
    getServices(),
    getSiteData(),
    getTranslations("home.services"),
    getTranslations("services"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";

  return (
    <Section
      id="services"
      variant="alt"
      className="overflow-x-clip py-[80px] lg:py-[120px]"
      containerClassName="flex flex-col items-center"
   
    >
      <HeaderSection subtitle={t("title")} title={t("header")} />

      <div className="grid w-full grid-cols-12 gap-6">
        {services.slice(0, 2).map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            title={tServices(service.titleKey)}
            description={tServices(service.descKey)}
            cta={t("readMore")}
            index={index}
            delay={index * 0.08}
          />
        ))}
      </div>

      <Reveal delay={services.length * 0.08} className="mt-12 md:mt-14">
        <Button href="/services" size="lg" rtl={isRtl}>
          {t("viewAll")}
        </Button>
      </Reveal>
    </Section>
  );
}
