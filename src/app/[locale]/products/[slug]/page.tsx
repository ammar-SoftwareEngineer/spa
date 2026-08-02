import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductDetailView from "@/components/Products/ProductDetailView";
import { getProductBySlug, getProductSlugs } from "@/lib/api/products";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: `${t(product.titleKey)} | S&PA`,
    description: t(product.descKey),
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
