import servicesData from "@/lib/data/services.json";
import type { ServiceItem } from "@/types";

export type { ServiceItem };

export async function getServices(): Promise<ServiceItem[]> {
  return servicesData as ServiceItem[];
}
