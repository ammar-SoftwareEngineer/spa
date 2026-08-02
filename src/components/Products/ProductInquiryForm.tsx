"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type ProductInquiryFormProps = {
  productTitle: string;
};

type ProductInquiryValues = {
  product: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const fieldClass =
  "w-full rounded-[14px] border border-border bg-bg-secondary/60 px-4 py-3 text-[0.95rem] text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-brand focus:bg-bg-primary focus:shadow-[0_0_0_3px_rgba(33,118,149,0.12)]";

const fieldErrorClass =
  "w-full rounded-[14px] border border-red-500/70 bg-bg-secondary/60 px-4 py-3 text-[0.95rem] text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-red-500 focus:bg-bg-primary focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]";

export default function ProductInquiryForm({ productTitle }: ProductInquiryFormProps) {
  const t = useTranslations("products.form");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductInquiryValues>({
    defaultValues: {
      product: productTitle,
      name: "",
      email: "",
      phone: "",
      message: t("messageDefault", { product: productTitle }),
    },
    mode: "onBlur",
  });

  useEffect(() => {
    setSubmitted(false);
    setValue("product", productTitle);
    setValue("message", t("messageDefault", { product: productTitle }));
  }, [productTitle, setValue, t]);

  const onSubmit = handleSubmit(async (_data) => {
    setSubmitted(true);
  });

  const handleSendAnother = () => {
    setSubmitted(false);
    reset({
      product: productTitle,
      name: "",
      email: "",
      phone: "",
      message: t("messageDefault", { product: productTitle }),
    });
  };

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col justify-center gap-3 rounded-[28px] border border-border/70 bg-bg-primary p-6 shadow-[0_16px_48px_rgba(13,59,77,0.1)] md:p-8">
        <p className="m-0 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-brand">
          {t("successEyebrow")}
        </p>
        <h3 className="m-0 text-[1.4rem] font-bold text-text-primary">{t("successTitle")}</h3>
        <p className="m-0 text-[0.98rem] leading-[1.7] text-text-secondary">
          {t("successDescription")}
        </p>
        <button type="button" onClick={handleSendAnother} className="btn-skew mt-4 w-fit">
          <span>{t("sendAnother")}</span>
        </button>
      </div>
    );
  }

  return (
    <form
      id="product-inquiry"
      onSubmit={onSubmit}
      noValidate
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-bg-primary p-6 shadow-[0_16px_48px_rgba(13,59,77,0.1)] md:p-8"
    >
      <div className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative z-[1] mb-6 flex flex-col gap-2">
        <span className="text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
          {t("eyebrow")}
        </span>
        <h3 className="m-0 text-[1.45rem] font-bold leading-[1.25] text-text-primary">
          {t("title")}
        </h3>
        <p className="m-0 text-[0.95rem] leading-[1.7] text-text-secondary">{t("description")}</p>
        <p className="m-0 mt-1 rounded-[12px] border border-brand/20 bg-brand/5 px-3 py-2 text-[0.9rem] font-semibold text-brand">
          {productTitle}
        </p>
      </div>

      <div className="relative z-[1] flex flex-1 flex-col gap-4">
        <input type="hidden" {...register("product", { required: true })} />

        <label className="flex flex-col gap-2">
          <span className="text-[0.88rem] font-semibold text-text-primary">{t("name")}</span>
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            className={errors.name ? fieldErrorClass : fieldClass}
            aria-invalid={Boolean(errors.name)}
            {...register("name", {
              required: t("errors.nameRequired"),
              minLength: { value: 2, message: t("errors.nameMin") },
            })}
          />
          {errors.name ? (
            <span className="text-[0.8rem] text-red-500">{errors.name.message}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.88rem] font-semibold text-text-primary">{t("email")}</span>
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className={errors.email ? fieldErrorClass : fieldClass}
            aria-invalid={Boolean(errors.email)}
            {...register("email", {
              required: t("errors.emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("errors.emailInvalid"),
              },
            })}
          />
          {errors.email ? (
            <span className="text-[0.8rem] text-red-500">{errors.email.message}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.88rem] font-semibold text-text-primary">{t("phone")}</span>
          <input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className={errors.phone ? fieldErrorClass : fieldClass}
            dir="ltr"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone", {
              pattern: {
                value: /^[0-9+\-\s()]{7,20}$/,
                message: t("errors.phoneInvalid"),
              },
            })}
          />
          {errors.phone ? (
            <span className="text-[0.8rem] text-red-500">{errors.phone.message}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[0.88rem] font-semibold text-text-primary">{t("message")}</span>
          <textarea
            rows={4}
            placeholder={t("messagePlaceholder")}
            className={`${errors.message ? fieldErrorClass : fieldClass} min-h-[110px] resize-y`}
            aria-invalid={Boolean(errors.message)}
            {...register("message", {
              required: t("errors.messageRequired"),
              minLength: { value: 10, message: t("errors.messageMin") },
            })}
          />
          {errors.message ? (
            <span className="text-[0.8rem] text-red-500">{errors.message.message}</span>
          ) : null}
        </label>

        <div className="mt-auto pt-2">
          <Button type="submit" size="lg" rtl={isRtl} className={isSubmitting ? "opacity-70" : ""}>
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>
      </div>
    </form>
  );
}
