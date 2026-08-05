/**
 * Site API — shared site data (logo, contact, media).
 */
import siteData from "@/lib/data/site.json";
import { apiGet, hasRemoteApi } from "@/lib/api/client";
import type { SiteData } from "@/types";

export async function getSiteData(): Promise<SiteData> {
  if (hasRemoteApi()) {
    return apiGet<SiteData>("/site");
  }
  return siteData as SiteData;
}
