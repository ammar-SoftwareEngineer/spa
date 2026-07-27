import whatWeDoData from "@/lib/data/what-we-do.json";
import type { ServiceItem } from "@/types";

export async function getWhatWeDo(): Promise<ServiceItem[]> {
  return whatWeDoData as ServiceItem[];
}
