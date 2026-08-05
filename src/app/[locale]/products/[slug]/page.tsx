import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductDetailView from "@/components/Products/ProductDetailView";
import { getProductBySlug, getProductSlugs } from "@/lib/api/products";


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
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const q = await searchParams;
  const rawPage = Array.isArray(q.page) ? q.page[0] : q.page;
  const page = Number(rawPage) || 1;

  return <ProductDetailView product={product} page={page} />;
}
