import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ContactMainSection from "@/components/ContactUs/ContactMainSection";
import ContactMapSection from "@/components/ContactUs/ContactMapSection";

export default async function ContactUsPage() {
  const [t, tNav] = await Promise.all([
    getTranslations("contact"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("contact")}
      />
      <ContactMainSection />
      <ContactMapSection />
    </>
  );
}
