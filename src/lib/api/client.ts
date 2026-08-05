/**
 * API Client — single place to talk to the backend.
 *
 * If NEXT_PUBLIC_API_URL is set → fetch from the server.
 * Otherwise → use local JSON files (current setup).
 *
 * Example after the backend is ready:
 *   const products = await apiGet<ProductItem[]>("/products");
 */

import { getBaseUrl } from "@/lib/utils";

/** API base URL from env — empty means use local JSON. */
export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
}

/** Whether a real backend API URL is configured. */
export function hasRemoteApi() {
  return Boolean(getApiBaseUrl());
}

/**
 * Simple API GET.
 * Throws if the response is not OK so callers can handle errors.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    // Next.js caching — adjust revalidate as needed
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${url}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Simple API POST (contact / inquiry / newsletter forms).
 */
export async function apiPost<TBody extends object, TResult = unknown>(
  path: string,
  body: TBody
): Promise<TResult> {
  const base = getApiBaseUrl();

  // No backend yet: simulate success so the UI works in development
  if (!base) {
    console.info("[apiPost stub]", path, body);
    return { ok: true } as TResult;
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${url}`);
  }

  return res.json() as Promise<TResult>;
}

/** Public site URL for SEO (sitemap / metadata). */
export function getSiteUrl() {
  return getBaseUrl();
}
