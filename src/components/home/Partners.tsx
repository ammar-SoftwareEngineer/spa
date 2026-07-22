import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import PartnersSwiper from "@/components/partners/PartnersSwiper";
import { getPartners } from "@/lib/api/partners";

export default async function Partners() {
  const [partners, t] = await Promise.all([
    getPartners(),
    getTranslations("home.partners"),
  ]);

  return (
    <Section id="partners" variant="alt" className="overflow-x-clip py-[70px] md:py-[100px]">
      <HeaderSection
        subtitle={t("title")}
        title={t("header")}
        description={t("description")}
        className="mb-12 md:mb-14"
      />

      <Reveal>
        <PartnersSwiper partners={partners} />
      </Reveal>
    </Section>
  );
}
