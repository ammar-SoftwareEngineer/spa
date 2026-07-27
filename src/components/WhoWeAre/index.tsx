import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import AboutSection from "@/components/WhoWeAre/AboutSection";
import CountersSection from "@/components/WhoWeAre/CountersSection";
import MissionSection from "@/components/WhoWeAre/MissionSection";
import VisionSection from "@/components/WhoWeAre/VisionSection";
import WhatWeDoSection from "@/components/WhoWeAre/WhatWeDoSection";
import { getSiteData } from "@/lib/api/site";

export default async function WhoWeArePage() {
  const [t, tNav, site] = await Promise.all([
    getTranslations("about"),
    getTranslations("nav"),
    getSiteData(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("whoWeAre")}
        backgroundImage={site.media.whoWeAreImage}
        backgroundAlt={t("hero.title")}
      />
      <AboutSection />
      <CountersSection />
      <MissionSection />
      <VisionSection />
      <WhatWeDoSection />
    </>
  );
}
