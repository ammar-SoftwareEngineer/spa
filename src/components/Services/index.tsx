import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import ServiceCard from "@/components/Services/ServiceCard";
import { getServices } from "@/lib/api/services";

export default async function ServicesPageView() {
  const [services, t, tNav] = await Promise.all([
    getServices(),
    getTranslations("services"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("services")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
    

        <div className="grid grid-cols-12 gap-6 md:gap-7">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              title={t(service.titleKey)}
              description={t(service.descKey)}
              cta={t("list.readMore")}
              index={index}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
