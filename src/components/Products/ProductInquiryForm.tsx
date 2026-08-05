/**
 * ProductInquiryForm — product inquiry form.
 * Keeps the selected product in sync when a gallery line is chosen.
 */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Package } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import InquiryFields, {
  type ProductInquiryValues,
} from "@/components/Products/InquiryFields";
import InquirySuccess from "@/components/Products/InquirySuccess";
import { submitProductInquiry } from "@/lib/api/forms";

type ProductInquiryFormProps = {
  productTitle: string;
};

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

  // Sync fields when the user picks another line from the gallery
  useEffect(() => {
    setSubmitted(false);
    setValue("product", productTitle);
    setValue("message", t("messageDefault", { product: productTitle }));
  }, [productTitle, setValue, t]);

  const onSubmit = handleSubmit(async (data) => {
    await submitProductInquiry(data);
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
      <InquirySuccess
        eyebrow={t("successEyebrow")}
        title={t("successTitle")}
        description={t("successDescription")}
        sendAnotherLabel={t("sendAnother")}
        onSendAnother={handleSendAnother}
      />
    );
  }

  return (
    <form
      id="product-inquiry"
      onSubmit={onSubmit}
      noValidate
      className="relative flex flex-col overflow-hidden rounded-[28px] border border-border/70 bg-bg-primary p-6 shadow-[0_16px_48px_rgba(13,59,77,0.1)] md:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -end-20 -top-20 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -start-16 h-40 w-40 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative z-[1] mb-8 flex flex-col gap-3">
        <span className="text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
          {t("eyebrow")}
        </span>
        <h2 className="m-0 text-[1.8rem] font-bold leading-[1.2] text-text-primary md:text-[2.2rem]">
          {t("title")}
        </h2>
        <p className="m-0 max-w-[560px] text-[1rem] leading-[1.7] text-text-secondary">
          {t("description")}
        </p>

        <div className="mt-2 inline-flex max-w-full items-center gap-3 rounded-[16px] border border-brand/20 bg-brand/5 px-4 py-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <Package size={18} />
          </span>
          <div className="min-w-0">
            <p className="m-0 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-brand/80">
              {t("selectedProduct")}
            </p>
            <p className="m-0 truncate text-[0.98rem] font-semibold text-text-primary">
              {productTitle}
            </p>
          </div>
        </div>
      </div>

      <InquiryFields
        register={register}
        errors={errors}
        labels={{
          name: t("name"),
          namePlaceholder: t("namePlaceholder"),
          email: t("email"),
          emailPlaceholder: t("emailPlaceholder"),
          phone: t("phone"),
          phonePlaceholder: t("phonePlaceholder"),
          message: t("message"),
          messagePlaceholder: t("messagePlaceholder"),
          nameRequired: t("errors.nameRequired"),
          nameMin: t("errors.nameMin"),
          emailRequired: t("errors.emailRequired"),
          emailInvalid: t("errors.emailInvalid"),
          phoneInvalid: t("errors.phoneInvalid"),
          messageRequired: t("errors.messageRequired"),
          messageMin: t("errors.messageMin"),
        }}
      />

      <div className="relative z-[1] mt-8">
        <Button type="submit" size="lg" rtl={isRtl} className={isSubmitting ? "opacity-70" : ""}>
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
