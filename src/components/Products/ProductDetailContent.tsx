/**
 * ProductDetailContent — محتوى صفحة تفاصيل المنتج
 * يجمع overview (server) مع الجاليري والفورم (client)
 */
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import ProductOverview from "@/components/Products/ProductOverview";
import ProductLinesAndForm from "@/components/Products/ProductLinesAndForm";
import type { ProductItem, ProductLineItem } from "@/types";

type LineView = {
  line: ProductLineItem;
  title: string;
  description: string;
};

type ProductDetailContentProps = {
  product: ProductItem;
  categoryTitle: string;
  categoryDetail: string;
  featureLabels: string[];
  lines: LineView[];
  startIndex?: number;
  productsLabel: string;
  pagination?: ReactNode;
};

export default async function ProductDetailContent({
  product,
  categoryTitle,
  categoryDetail,
  featureLabels,
  lines,
  startIndex = 0,
  productsLabel,
  pagination,
}: ProductDetailContentProps) {
  const t = await getTranslations("products");

  return (
    <>
      <ProductOverview
        product={product}
        categoryTitle={categoryTitle}
        categoryDetail={categoryDetail}
        featureLabels={featureLabels}
        productsLabel={productsLabel}
        featuresTitle={t("detail.featuresTitle")}
        visitWebsiteLabel={t("detail.visitWebsite")}
      />

      <ProductLinesAndForm
        categoryTitle={categoryTitle}
        lines={lines}
        startIndex={startIndex}
        pagination={pagination}
      />
    </>
  );
}
