import partnersData from "@/lib/data/partners.json";
import type { PartnerItem } from "@/types";

export type { PartnerItem };

export async function getPartners(): Promise<PartnerItem[]> {
  return partnersData as PartnerItem[];
}
