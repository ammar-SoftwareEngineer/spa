/**
 * InquiryFields — حقول فورم استفسار المنتج (react-hook-form)
 */
"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type ProductInquiryValues = {
  product: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const fieldClass =
  "w-full rounded-[14px] border border-border bg-bg-secondary/60 px-5 py-3.5 text-[0.95rem] text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-brand focus:bg-bg-primary focus:shadow-[0_0_0_3px_rgba(33,118,149,0.12)]";

const fieldErrorClass =
  "w-full rounded-[14px] border border-red-500/70 bg-bg-secondary/60 px-5 py-3.5 text-[0.95rem] text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-red-500 focus:bg-bg-primary focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]";

type InquiryFieldsProps = {
  register: UseFormRegister<ProductInquiryValues>;
  errors: FieldErrors<ProductInquiryValues>;
  labels: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    nameRequired: string;
    nameMin: string;
    emailRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    messageRequired: string;
    messageMin: string;
  };
};

export default function InquiryFields({ register, errors, labels }: InquiryFieldsProps) {
  return (
    <div className="relative z-[1] grid grid-cols-1 gap-5 md:grid-cols-2">
      <input type="hidden" {...register("product", { required: true })} />

      <label className="flex flex-col gap-2">
        <span className="text-[0.88rem] font-semibold text-text-primary">{labels.name}</span>
        <input
          type="text"
          placeholder={labels.namePlaceholder}
          className={errors.name ? fieldErrorClass : fieldClass}
          aria-invalid={Boolean(errors.name)}
          {...register("name", {
            required: labels.nameRequired,
            minLength: { value: 2, message: labels.nameMin },
          })}
        />
        {errors.name ? (
          <span className="text-[0.8rem] text-red-500">{errors.name.message}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[0.88rem] font-semibold text-text-primary">{labels.email}</span>
        <input
          type="email"
          placeholder={labels.emailPlaceholder}
          className={errors.email ? fieldErrorClass : fieldClass}
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            required: labels.emailRequired,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: labels.emailInvalid,
            },
          })}
        />
        {errors.email ? (
          <span className="text-[0.8rem] text-red-500">{errors.email.message}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-[0.88rem] font-semibold text-text-primary">{labels.phone}</span>
        <input
          type="tel"
          placeholder={labels.phonePlaceholder}
          className={errors.phone ? fieldErrorClass : fieldClass}
          dir="ltr"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone", {
            pattern: {
              value: /^[0-9+\-\s()]{7,20}$/,
              message: labels.phoneInvalid,
            },
          })}
        />
        {errors.phone ? (
          <span className="text-[0.8rem] text-red-500">{errors.phone.message}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-[0.88rem] font-semibold text-text-primary">{labels.message}</span>
        <textarea
          rows={5}
          placeholder={labels.messagePlaceholder}
          className={`${errors.message ? fieldErrorClass : fieldClass} min-h-[130px] resize-y`}
          aria-invalid={Boolean(errors.message)}
          {...register("message", {
            required: labels.messageRequired,
            minLength: { value: 10, message: labels.messageMin },
          })}
        />
        {errors.message ? (
          <span className="text-[0.8rem] text-red-500">{errors.message.message}</span>
        ) : null}
      </label>
    </div>
  );
}
