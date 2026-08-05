/**
 * robots.txt — يقول لمحركات البحث إيه يتفهرس
 * بتتولد تلقائياً على /robots.txt
 */
import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
