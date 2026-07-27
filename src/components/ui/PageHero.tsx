import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteData } from "@/lib/api/site";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  currentLabel: string;
  backgroundImage?: string;
  backgroundAlt?: string;
};

export default async function PageHero({
  eyebrow,
  title,
  description,
  currentLabel,
  backgroundImage,
  backgroundAlt = "S&PA",
}: PageHeroProps) {
  const [t, site] = await Promise.all([
    getTranslations("nav"),
    getSiteData(),
  ]);

  const imageSrc = backgroundImage || site.media.teamBannerImage;

  return (
    <section className="relative overflow-hidden border-b border-border pt-[110px] pb-16 md:pt-[140px] md:pb-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#061018]/92 via-[#0d3b4d]/78 to-[#0d3b4d]/45 rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018]/70 via-transparent to-[#061018]/35" />
      {/* <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
        style={{
          backgroundImage: `url(${site.media.servicesPattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "420px",
        }}
      /> */}

      <div className="container relative z-[2] mx-auto w-full px-5 md:px-10 lg:px-20">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[0.85rem] text-white/65">
          <Link href="/" className="transition-colors hover:text-brand">
            {t("home")}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-white">{currentLabel}</span>
        </nav>

        <span className="mb-3 block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </span>
        <h1 className="m-0 max-w-[760px] text-[2.4rem] font-bold leading-[1.15] text-white md:text-[3.4rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-[620px] text-[1.05rem] leading-[1.75] text-white/78">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
