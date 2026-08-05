/**
 * FooterNewsletter — فورم الاشتراك في النشرة
 * جاهز للربط مع submitNewsletter في lib/api/forms
 */
"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { submitNewsletter } from "@/lib/api/forms";

export default function FooterNewsletter() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string" || !email) return;

    setStatus("loading");
    await submitNewsletter({ email });
    setStatus("done");
    form.reset();
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="relative pb-3 text-[1.15rem] font-bold text-text-primary after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-10 after:bg-brand dark:text-white">
        {t("newsletter")}
      </h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          className="rounded-full border border-border bg-white px-5 py-3 text-[0.85rem] text-text-primary outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_10px_rgba(33,118,149,0.15)] dark:border-white/10 dark:bg-white/5 dark:text-white"
          required
        />
        <Button type="submit" className="w-full" rtl={isRtl} disabled={status === "loading"}>
          {t("subscribeBtn")}
        </Button>
      </form>
    </div>
  );
}
