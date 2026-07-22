import whyData from "@/lib/data/why.json";
import type { WhyMetric } from "@/types";

export type { WhyMetric };

export async function getWhyMetrics(): Promise<WhyMetric[]> {
  return whyData as WhyMetric[];
}
