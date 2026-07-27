import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import MediaContentBlock from "@/components/WhoWeAre/MediaContentBlock";
import { getSiteData } from "@/lib/api/site";

export default async function AboutSection() {
  const [site, t] = await Promise.all([getSiteData(), getTranslations("about")]);

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <MediaContentBlock
        imageSrc={site.media.whoWeAreImage}
        imageAlt={t("about.imageAlt")}
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        text={t("about.text")}
      />
    </Section>
  );
}
