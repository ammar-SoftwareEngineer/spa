import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import CategoryCards from "@/components/categories/CategoryCards";
import { getCategories } from "@/lib/api/categories";

export default async function Categories() {
  const [categories, t, tServices] = await Promise.all([
    getCategories(),
    getTranslations("home.projects"),
    getTranslations("home.services"),
  ]);

  const cards = categories.map((category, index) => ({
    title: t(category.titleKey),
    description: t(category.descKey),
    badge: tServices(category.badgeKey),
    image: category.image,
    link: category.link,
    cta: t("viewCategory"),
    index,
  }));

  return (
    <Section
      id="projects"
      className="overflow-x-clip py-[80px] lg:py-[120px]"
      containerClassName="flex flex-col"
    >
      <HeaderSection
        subtitle={t("title")}
        title={t("header")}
        className="mx-auto max-w-[720px]"
      />

      <CategoryCards categories={cards} />
    </Section>
  );
}
