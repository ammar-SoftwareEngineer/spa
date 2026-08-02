import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteData } from "@/lib/api/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  currentLabel: string;
};

export default async function PageHero({
  eyebrow,
  title,
  description,
  currentLabel,
}: PageHeroProps) {
  const [t, site] = await Promise.all([
    getTranslations("nav"),
    getSiteData(),
  ]);

  return (
    <section className="relative overflow-hidden border-b border-border pt-[100px] pb-12 sm:pt-[110px] sm:pb-16 md:pt-[140px] md:pb-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={site.media.pageHeroImage}
          alt="S&PA"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#061018]/92 via-[#0d3b4d]/78 to-[#0d3b4d]/45 rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018]/70 via-transparent to-[#061018]/35" />

      <div className="container relative z-[2] mx-auto w-full px-4 sm:px-5 md:px-10 lg:px-20">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-[0.8rem] text-white/65 sm:mb-6 sm:text-[0.85rem]">
          <Link href="/" className="transition-colors hover:text-brand">
            {t("home")}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-white">{currentLabel}</span>
        </nav>
        <h1 className="m-0 max-w-[760px] text-[1.9rem] font-bold leading-[1.15] text-white sm:text-[2.4rem] md:text-[3.4rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-[620px] text-[0.95rem] leading-[1.7] text-white/78 sm:mt-5 sm:text-[1.05rem] sm:leading-[1.75]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
