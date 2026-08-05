/**
 * Forms API — submit site forms to the backend.
 * Without an API URL, returns a stub success so the UI still works.
 * After backend is ready: set NEXT_PUBLIC_API_URL and you're done.
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
