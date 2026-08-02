import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import type { ProductItem } from "@/types";

type ProductCardProps = {
  product: ProductItem;
  title: string;
  description: string;
  index?: number;
  delay?: number;
};

export default function ProductCard({
  product,
  title,
  description,
  index = 0,
  delay = 0,
}: ProductCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const Icon = getIcon(product.icon);

  return (
    <Reveal delay={delay} className="h-full w-full">
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex h-full min-h-[380px] w-full flex-col overflow-hidden rounded-[24px] outline-none transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-[420px] shadow-[0_14px_40px_rgba(13,59,77,0.14)] hover:shadow-[0_24px_56px_rgba(33,118,149,0.22)]"
      >
        <Image
          src={product.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-[#061018] via-[#061018]/50 to-transparent" />
        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(33,118,149,0.28),transparent_55%)] opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

        <span
          aria-hidden
          className="pointer-events-none absolute end-3 top-2 select-none text-[4.5rem] font-bold leading-none text-white/[0.12] transition-colors duration-500 group-hover:text-white/[0.18] sm:end-5 sm:top-3 sm:text-[6rem] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
        >
          {number}
        </span>

        <span className="pointer-events-none absolute start-5 top-5 h-9 w-9 border-s border-t border-white/30 transition-colors duration-500 group-hover:border-brand" />
        <span className="pointer-events-none absolute bottom-5 end-5 h-9 w-9 border-e border-b border-white/20 transition-colors duration-500 group-hover:border-white/50" />

        <span className="absolute start-5 top-5 z-[1] inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-colors duration-500 group-hover:bg-brand">
          <Icon size={18} />
        </span>

        <span className="relative z-[1] mt-auto flex flex-col gap-2.5 p-6 sm:p-7">
          <span className="h-0.5 w-8 origin-start scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
          <span className="text-[1.35rem] font-bold leading-[1.2] text-white sm:text-[1.5rem]">
            {title}
          </span>
          <span className="line-clamp-3 text-[0.95rem] leading-[1.7] text-white/75">
            {description}
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
