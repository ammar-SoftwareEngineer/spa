import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import ProductDetailContent from "@/components/Products/ProductDetailContent";
import { paginateItems } from "@/lib/pagination";
import type { ProductItem } from "@/types";

type ProductDetailViewProps = {
  product: ProductItem;
  page?: number;
};

export default async function ProductDetailView({
  product,
  page = 1,
}: ProductDetailViewProps) {
  const [t, tNav] = await Promise.all([
    getTranslations("products"),
    getTranslations("nav"),
  ]);

  const allLines = product.lines.map((line) => ({
    line,
    title: t(line.titleKey),
    description: t(line.descKey),
  }));

  const paged = paginateItems(allLines, page);

  if (page > paged.totalPages && paged.totalCount > 0) {
    notFound();
  }

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
        lines={paged.items}
        startIndex={paged.startIndex}
        productsLabel={tNav("products")}
        pagination={
          <Pagination
            basePath={`/products/${product.slug}`}
            activePage={paged.activePage}
            totalPages={paged.totalPages}
            hash="product-gallery"
            labelsNamespace="products.pagination"
          />
        }
      />
    </>
  );
}
