/**
 * ProductLinesAndForm — جاليري خطوط المنتج + فورم الاستفسار
 * Client Component لأن اختيار الخط يحدّث الفورم ويعمل scroll
 */
"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import ProductInquiryForm from "@/components/Products/ProductInquiryForm";
import ProductLineCard from "@/components/Products/ProductLineCard";
import type { ProductLineItem } from "@/types";

type LineView = {
  line: ProductLineItem;
  title: string;
  description: string;
};

type ProductLinesAndFormProps = {
  categoryTitle: string;
  lines: LineView[];
  startIndex?: number;
  pagination?: ReactNode;
};

export default function ProductLinesAndForm({
  categoryTitle,
  lines,
  startIndex = 0,
  pagination,
}: ProductLinesAndFormProps) {
  const t = useTranslations("products");
  const [selectedTitle, setSelectedTitle] = useState(categoryTitle);

  function selectLine(line: LineView) {
    setSelectedTitle(line.title);
    // نزل للفورم بعد اختيار المنتج
    window.requestAnimationFrame(() => {
      document.getElementById("product-inquiry")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  return (
    <>
      <Section
        id="product-gallery"
        variant="alt"
        className="scroll-mt-28 overflow-x-clip py-20 md:py-28"
      >
        <HeaderSection
          subtitle={t("detail.linesEyebrow")}
          title={t("detail.linesTitle")}
          description={t("detail.linesDescription")}
          className="mb-12 md:mb-16"
        />

        {lines.length > 0 ? (
          <>
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
              {lines.map((item, index) => (
                <ProductLineCard
                  key={item.line.titleKey}
                  line={item.line}
                  title={item.title}
                  description={item.description}
                  index={startIndex + index}
                  delay={Math.min(index * 0.08, 0.4)}
                  inquireLabel={t("form.inquire")}
                  onInquire={() => selectLine(item)}
                  active={selectedTitle === item.title}
                />
              ))}
            </div>
            {pagination}
          </>
        ) : (
          <p className="text-center text-text-secondary">{t("detail.noLines")}</p>
        )}
      </Section>

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ProductInquiryForm productTitle={selectedTitle} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
