import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import MediaContentBlock from "@/components/WhoWeAre/MediaContentBlock";
import { getSiteData } from "@/lib/api/site";

export default async function VisionSection() {
  const [site, t] = await Promise.all([getSiteData(), getTranslations("about")]);

  return (
    <Section variant="alt" className="overflow-x-clip py-24 md:py-32">
      <MediaContentBlock
        imageSrc={site.media.visionImage}
        imageAlt={t("vision.imageAlt")}
        eyebrow={t("vision.eyebrow")}
        title={t("vision.title")}
        text={t("vision.text")}
      
        badgeIcon="Eye"
      />
    </Section>
  );
}
