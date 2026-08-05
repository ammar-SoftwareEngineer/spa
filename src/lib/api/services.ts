/**
 * Services API — JSON محلي الآن، باكند لاحقاً عبر NEXT_PUBLIC_API_URL
 */
import servicesData from "@/lib/data/services.json";
import { apiGet, hasRemoteApi } from "@/lib/api/client";
import type { ServiceItem } from "@/types";

export type { ServiceItem };

const localServices = servicesData as ServiceItem[];

export async function getServices(): Promise<ServiceItem[]> {
  if (hasRemoteApi()) {
    return apiGet<ServiceItem[]>("/services");
  }
  return localServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}

export async function getServiceSlugs(): Promise<string[]> {
  const services = await getServices();
  return services.map((service) => service.slug);
}
