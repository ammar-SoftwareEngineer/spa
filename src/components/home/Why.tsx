import { getTranslations } from "next-intl/server";
import { WhyCtaCard, WhyMetricCard } from "@/components/why/WhyCards";
import HeaderSection from "@/components/ui/HeaderSection";
import Section from "@/components/ui/Section";
import { getWhyMetrics } from "@/lib/api/why";

export default async function Why() {
  const [metrics, t] = await Promise.all([
    getWhyMetrics(),
    getTranslations("home.whyChooseUs"),
  ]);

  return (
    <Section id="metrics" className="py-32" containerClassName="relative z-[2]">
      <HeaderSection
        subtitle={t("title")}
        title={t("header")}
        description={t("subtitle")}
        className="mb-[55px]"
      />

      <div className="grid grid-cols-12 gap-8">
        {metrics.map((item, index) =>
          item.isCta ? (
            <div key={item.titleKey} className="col-span-12 md:col-span-6 lg:col-span-4">
              <WhyCtaCard
                staggerIndex={index}
                title={t(item.titleKey)}
                description={t(item.descKey)}
              />
            </div>
          ) : (
            <div key={item.titleKey} className="col-span-12 md:col-span-6 lg:col-span-4">
              <WhyMetricCard
                item={item}
                staggerIndex={index}
                title={t(item.titleKey)}
                description={t(item.descKey)}
                textValue={item.textValKey ? t(item.textValKey) : undefined}
              />
            </div>
          ),
        )}
      </div>
    </Section>
  );
}
