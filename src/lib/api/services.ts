import servicesData from "@/lib/data/services.json";
import type { ServiceItem } from "@/types";

export type { ServiceItem };

const services = servicesData as ServiceItem[];

export async function getServices(): Promise<ServiceItem[]> {
  return services;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  return services.find((service) => service.slug === slug);
}

export async function getServiceSlugs(): Promise<string[]> {
  return services.map((service) => service.slug);
}
