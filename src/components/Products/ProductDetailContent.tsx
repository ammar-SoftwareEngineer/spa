"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import ProductInquiryForm from "@/components/Products/ProductInquiryForm";
import ProductLineCard from "@/components/Products/ProductLineCard";
import { getIcon } from "@/lib/icons";
import type { ProductItem, ProductLineItem } from "@/types";

type LineView = {
  line: ProductLineItem;
  title: string;
  description: string;
};

type SelectedProduct = {
  title: string;
  description: string;
  image: string;
  isCategory: boolean;
};

type ProductDetailContentProps = {
  product: ProductItem;
  categoryTitle: string;
  categoryDetail: string;
  featureLabels: string[];
  lines: LineView[];
  productsLabel: string;
};

export default function ProductDetailContent({
  product,
  categoryTitle,
  categoryDetail,
  featureLabels,
  lines,
  productsLabel,
}: ProductDetailContentProps) {
  const t = useTranslations("products");
  const Icon = getIcon(product.icon);

  const [selected, setSelected] = useState<SelectedProduct>({
    title: categoryTitle,
    description: categoryDetail,
    image: product.image,
    isCategory: true,
  });

  const selectLine = useCallback((line: LineView) => {
    setSelected({
      title: line.title,
      description: line.description,
      image: line.line.image,
      isCategory: false,
    });

    window.requestAnimationFrame(() => {
      document.getElementById("product-inquiry")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, []);

  return (
    <>
      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/45 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <span className="mb-3 inline-flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
                  <Icon size={18} />
                  {productsLabel}
                </span>
                <h2 className="mb-5 text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.5rem]">
                  {selected.title}
                </h2>
                <p className="mb-8 max-w-[560px] text-[1.02rem] leading-[1.8] text-text-secondary">
                  {selected.description}
                </p>

                {selected.isCategory ? (
                  <>
                    <h3 className="mb-4 text-[1.15rem] font-bold text-text-primary">
                      {t("detail.featuresTitle")}
                    </h3>
                    <ul className="flex list-none flex-col gap-3">
                      {featureLabels.map((label) => (
                        <li
                          key={label}
                          className="flex items-start gap-3 text-[0.98rem] leading-[1.6] text-text-secondary"
                        >
                          <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={20} />
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <ProductInquiryForm productTitle={selected.title} />
          </Reveal>
        </div>
      </Section>

      <Section variant="alt" className="overflow-x-clip py-20 md:py-28">
        <HeaderSection
          subtitle={t("detail.linesEyebrow")}
          title={t("detail.linesTitle")}
          description={t("detail.linesDescription")}
          className="mb-12 md:mb-16"
        />

        {lines.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
            {lines.map((item, index) => (
              <ProductLineCard
                key={item.line.titleKey}
                line={item.line}
                title={item.title}
                description={item.description}
                index={index}
                delay={index * 0.08}
                inquireLabel={t("form.inquire")}
                onInquire={() => selectLine(item)}
                active={selected.title === item.title}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary">{t("detail.noLines")}</p>
        )}
      </Section>
    </>
  );
}
