/**
 * Products API
 * دلوقتي: من JSON محلي
 * لاحقاً: غيّر جوه getProducts فقط — الـ UI مش هيتأثر
 */
import productsData from "@/lib/data/products.json";
import { apiGet, hasRemoteApi } from "@/lib/api/client";
import type { ProductItem } from "@/types";

export type { ProductItem };

const localProducts = productsData as ProductItem[];

export async function getProducts(): Promise<ProductItem[]> {
  if (hasRemoteApi()) {
    return apiGet<ProductItem[]>("/products");
  }
  return localProducts;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}
