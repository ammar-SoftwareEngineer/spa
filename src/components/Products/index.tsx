import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/Products/ProductCard";
import { getProducts } from "@/lib/api/products";

export default async function ProductsPageView() {
  const [products, t, tNav] = await Promise.all([
    getProducts(),
    getTranslations("products"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("products")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              title={t(product.titleKey)}
              description={t(product.descKey)}
              index={index}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
