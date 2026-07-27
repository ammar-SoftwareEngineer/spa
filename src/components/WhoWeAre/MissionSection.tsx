import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import MediaContentBlock from "@/components/WhoWeAre/MediaContentBlock";
import { getSiteData } from "@/lib/api/site";

export default async function MissionSection() {
  const [site, t] = await Promise.all([getSiteData(), getTranslations("about")]);

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <MediaContentBlock
        imageSrc={site.media.missionImage}
        imageAlt={t("mission.imageAlt")}
        eyebrow={t("mission.eyebrow")}
        title={t("mission.title")}
        text={t("mission.text")}
        reverse
        badgeIcon="Target"
      />
    </Section>
  );
}
