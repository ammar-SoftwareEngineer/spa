"use client";

import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-[14px] border border-border bg-bg-secondary/60 px-5 py-3.5 text-[0.95rem] text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-brand focus:bg-bg-primary focus:shadow-[0_0_0_3px_rgba(33,118,149,0.12)]";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Reveal delay={0.1} className="h-full">
      <form
        className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-bg-primary p-6 shadow-[0_16px_48px_rgba(13,59,77,0.1)] md:p-8 lg:p-10"
        action="#"
        method="post"
      >
        <div className="pointer-events-none absolute -end-20 -top-20 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative z-[1] mb-8 flex flex-col gap-3">
          <span className="text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
            {t("eyebrow")}
          </span>
          <h2 className="m-0 text-[1.8rem] font-bold leading-[1.2] text-text-primary md:text-[2.2rem]">
            {t("title")}
          </h2>
          <p className="m-0 max-w-[520px] text-[1rem] leading-[1.7] text-text-secondary">
            {t("description")}
          </p>
        </div>

        <div className="relative z-[1] grid flex-1 grid-cols-1 gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[0.88rem] font-semibold text-text-primary">{t("name")}</span>
            <input
              type="text"
              name="name"
              required
              placeholder={t("namePlaceholder")}
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.88rem] font-semibold text-text-primary">{t("email")}</span>
            <input
              type="email"
              name="email"
              required
              placeholder={t("emailPlaceholder")}
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.88rem] font-semibold text-text-primary">{t("phone")}</span>
            <input
              type="tel"
              name="phone"
              placeholder={t("phonePlaceholder")}
              className={fieldClass}
              dir="ltr"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.88rem] font-semibold text-text-primary">{t("subject")}</span>
            <input
              type="text"
              name="subject"
              required
              placeholder={t("subjectPlaceholder")}
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-[0.88rem] font-semibold text-text-primary">{t("message")}</span>
            <textarea
              name="message"
              required
              rows={6}
              placeholder={t("messagePlaceholder")}
              className={`${fieldClass} min-h-[160px] resize-y`}
            />
          </label>
        </div>

        <div className="relative z-[1] mt-8">
          <Button type="submit" size="lg" rtl={isRtl}>
            {t("submit")}
          </Button>
        </div>
      </form>
    </Reveal>
  );
}
