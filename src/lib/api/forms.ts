/**
 * Forms API — إرسال فورمز الموقع للباكند
 * حالياً: لو مفيش API بيرجع نجاح وهمي عشان الـ UI يشتغل
 * بعد الباكند: حط NEXT_PUBLIC_API_URL وخلاص
 */

import { apiPost } from "@/lib/api/client";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type ProductInquiryPayload = {
  product: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type NewsletterPayload = {
  email: string;
};

export async function submitContact(data: ContactPayload) {
  return apiPost("/contact", data);
}

export async function submitProductInquiry(data: ProductInquiryPayload) {
  return apiPost("/product-inquiry", data);
}

export async function submitNewsletter(data: NewsletterPayload) {
  return apiPost("/newsletter", data);
}
