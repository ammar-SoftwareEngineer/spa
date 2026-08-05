/**
 * API Client — نقطة واحدة للتعامل مع الباكند
 *
 * لو في NEXT_PUBLIC_API_URL → يجيب البيانات من السيرفر
 * لو مفيش → تستخدم ملفات JSON المحلية (الوضع الحالي)
 *
 * مثال بعد ما الباكند يجهز:
 *   const products = await apiGet<ProductItem[]>("/products");
 */

import { getBaseUrl } from "@/lib/utils";

/** عنوان الـ API من env — فاضي = استخدم JSON المحلي */
export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
}

/** هل الموقع مربوط بباكند حقيقي؟ */
export function hasRemoteApi() {
  return Boolean(getApiBaseUrl());
}

/**
 * GET بسيط من الـ API
 * بيرمي error لو الرد مش OK عشان الصفحة تعرف تتعامل
 */
export async function apiGet<T>(path: string): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    // next.js caching — غيّره حسب احتياجك
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${url}`);
  }

  return res.json() as Promise<T>;
}

/**
 * POST بسيط (فورمز التواصل / الاستفسار / النشرة)
 */
export async function apiPost<TBody extends object, TResult = unknown>(
  path: string,
  body: TBody
): Promise<TResult> {
  const base = getApiBaseUrl();

  // بدون باكند: نعمل simulate نجاح عشان الواجهة تشتغل في التطوير
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

/** رابط الموقع للـ SEO (sitemap / metadata) */
export function getSiteUrl() {
  return getBaseUrl();
}
