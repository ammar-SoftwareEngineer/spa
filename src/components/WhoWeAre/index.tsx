import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import AboutSection from "@/components/WhoWeAre/AboutSection";
import CountersSection from "@/components/WhoWeAre/CountersSection";
import MissionSection from "@/components/WhoWeAre/MissionSection";
import VisionSection from "@/components/WhoWeAre/VisionSection";
import WhatWeDoSection from "@/components/WhoWeAre/WhatWeDoSection";

export default async function WhoWeArePage() {
  const [t, tNav] = await Promise.all([
    getTranslations("about"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("whoWeAre")}
      />
      <AboutSection />
      <CountersSection />
      <MissionSection />
      <VisionSection />
      <WhatWeDoSection />
    </>
  );
}
