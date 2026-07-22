import sectorsData from "@/lib/data/sectors.json";
import type { SectorItem } from "@/types";

export type { SectorItem };

export async function getSectors(): Promise<SectorItem[]> {
  return sectorsData as SectorItem[];
}
