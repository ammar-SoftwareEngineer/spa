/**
 * InquirySuccess — رسالة نجاح بعد إرسال استفسار المنتج
 */
"use client";

import { CheckCircle2 } from "lucide-react";

type InquirySuccessProps = {
  eyebrow: string;
  title: string;
  description: string;
  sendAnotherLabel: string;
  onSendAnother: () => void;
};

export default function InquirySuccess({
  eyebrow,
  title,
  description,
  sendAnotherLabel,
  onSendAnother,
}: InquirySuccessProps) {
  return (
    <div className="relative flex min-h-[420px] flex-col items-start justify-center overflow-hidden rounded-[28px] border border-border/70 bg-bg-primary p-6 shadow-[0_16px_48px_rgba(13,59,77,0.1)] md:p-8 lg:p-10">
      <div className="pointer-events-none absolute -end-20 -top-20 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />
      <span className="relative z-[1] mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <CheckCircle2 size={28} />
      </span>
      <p className="relative z-[1] m-0 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-brand">
        {eyebrow}
      </p>
      <h3 className="relative z-[1] m-0 mt-2 text-[1.6rem] font-bold text-text-primary md:text-[1.8rem]">
        {title}
      </h3>
      <p className="relative z-[1] m-0 mt-3 max-w-[480px] text-[1rem] leading-[1.7] text-text-secondary">
        {description}
      </p>
      <button type="button" onClick={onSendAnother} className="btn-skew relative z-[1] mt-8 w-fit">
        <span>{sendAnotherLabel}</span>
      </button>
    </div>
  );
}
