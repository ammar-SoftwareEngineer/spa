import siteData from "@/lib/data/site.json";
import type { SiteData } from "@/types";

export async function getSiteData(): Promise<SiteData> {
  return siteData as SiteData;
}
