import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ProductDetailContent from "@/components/Products/ProductDetailContent";
import type { ProductItem } from "@/types";

type ProductDetailViewProps = {
  product: ProductItem;
};

export default async function ProductDetailView({ product }: ProductDetailViewProps) {
  const [t, tNav] = await Promise.all([
    getTranslations("products"),
    getTranslations("nav"),
  ]);

  const lines = product.lines.map((line) => ({
    line,
    title: t(line.titleKey),
    description: t(line.descKey),
  }));

  return (
    <>
      <PageHero
        eyebrow={tNav("products")}
        title={t(product.titleKey)}
        description={t(product.descKey)}
        currentLabel={t(product.titleKey)}
      />

      <ProductDetailContent
        product={product}
        categoryTitle={t(product.titleKey)}
        categoryDetail={t(product.detailKey)}
        featureLabels={product.featureKeys.map((key) => t(key))}
        lines={lines}
        productsLabel={tNav("products")}
      />
    </>
  );
}
