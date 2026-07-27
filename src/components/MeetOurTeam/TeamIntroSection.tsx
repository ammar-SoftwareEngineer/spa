import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { getSiteData } from "@/lib/api/site";

export default async function TeamIntroSection() {
  const [site, t] = await Promise.all([getSiteData(), getTranslations("team")]);

  return (
    <Section className="overflow-x-clip py-20 md:py-28">
      <Reveal>
        <div className="group relative mb-10 overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)] md:mb-12 md:rounded-[36px]">
          <div className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[580px]">
            <Image
              src={site.media.teamBannerImage}
              alt={t("intro.imageAlt")}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/55 via-[#0d3b4d]/15 to-transparent" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className=" w-6xl ">
        <span className="mb-3 block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
          {t("intro.eyebrow")}
        </span>
        <h2 className="mb-5 text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.6rem]">
          {t("intro.title")}
        </h2>
        <p className="m-0 text-[1.02rem] leading-[1.8] text-text-secondary">
          {t("intro.text")}
        </p>
      </Reveal>
    </Section>
  );
}
