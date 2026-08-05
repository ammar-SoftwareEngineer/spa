/**
 * Partners API
 */
import partnersData from "@/lib/data/partners.json";
import { apiGet, hasRemoteApi } from "@/lib/api/client";
import type { PartnerItem } from "@/types";

export type { PartnerItem };

export async function getPartners(): Promise<PartnerItem[]> {
  if (hasRemoteApi()) {
    return apiGet<PartnerItem[]>("/partners");
  }
  return partnersData as PartnerItem[];
}
