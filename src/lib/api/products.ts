import productsData from "@/lib/data/products.json";
import type { ProductItem } from "@/types";

export type { ProductItem };

const products = productsData as ProductItem[];

export async function getProducts(): Promise<ProductItem[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}
