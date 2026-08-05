/**
 * ProductOverview — قسم نظرة عامة على فئة المنتج (صورة + مميزات)
 * Server Component — مفيش تفاعل هنا
 */
import Image from "next/image";
import { CheckCircle2, ExternalLink } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import type { ProductItem } from "@/types";

type ProductOverviewProps = {
  product: ProductItem;
  categoryTitle: string;
  categoryDetail: string;
  featureLabels: string[];
  productsLabel: string;
  featuresTitle: string;
  visitWebsiteLabel: string;
};

export default function ProductOverview({
  product,
  categoryTitle,
  categoryDetail,
  featureLabels,
  productsLabel,
  featuresTitle,
  visitWebsiteLabel,
}: ProductOverviewProps) {
  const Icon = getIcon(product.icon);

  return (
    <Section className="overflow-x-clip py-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
            <div className="relative aspect-[4/4]">
              <Image
                src={product.image}
                alt={categoryTitle}
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
              {categoryTitle}
            </h2>
            <p className="mb-8 max-w-[560px] text-[1.02rem] leading-[1.8] text-text-secondary">
              {categoryDetail}
            </p>

            <h3 className="mb-4 text-[1.15rem] font-bold text-text-primary">{featuresTitle}</h3>
            <ul className="mb-8 flex list-none flex-col gap-3">
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

            {product.website ? (
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-skew"
                >
                  <span>
                    {visitWebsiteLabel}
                    <ExternalLink size={16} />
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
