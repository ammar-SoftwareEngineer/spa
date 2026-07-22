import aboutData from "@/lib/data/about.json";
import type { AboutCounter } from "@/types";

export type { AboutCounter };

export async function getAboutCounters(): Promise<AboutCounter[]> {
  return aboutData as AboutCounter[];
}
