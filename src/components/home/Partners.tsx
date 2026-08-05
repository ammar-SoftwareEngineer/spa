import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import PartnersSwiper from "@/components/partners/PartnersSwiper";
import { getPartners } from "@/lib/api/partners";

export default async function Partners() {
  const [partners, t, locale] = await Promise.all([
    getPartners(),
    getTranslations("home.partners"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";

  return (
    <Section id="partners" variant="alt" className="overflow-x-clip py-[70px] md:py-[100px]">
      <HeaderSection
        subtitle={t("title")}
        title={t("header")}
        description={t("description")}
        align="start"
        className="mb-12 md:mb-14"
        action={
          <Button href="/partners" className="shrink-0" rtl={isRtl}>
            {t("viewAll")}
          </Button>
        }
      />

      <Reveal>
        <PartnersSwiper partners={partners} />
      </Reveal>
    </Section>
  );
}
