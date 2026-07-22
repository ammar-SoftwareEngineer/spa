import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import { listBlogs } from "@/lib/api/blogs";
import type { AppLocale } from "@/types";

export default async function Blogs() {
  const [posts, t, locale] = await Promise.all([
    listBlogs(),
    getTranslations("home.articles"),
    getLocale(),
  ]);
  const lang: AppLocale = locale === "ar" ? "ar" : "en";
  const isRtl = locale === "ar";
  const leftColumn = posts.filter((_, i) => i % 2 === 0);
  const rightColumn = posts.filter((_, i) => i % 2 === 1);

  return (
    <Section id="news" variant="alt" className="py-[70px] md:py-[100px]">
      <HeaderSection
        subtitle={t("title")}
        title={t("header")}
        align="start"
        action={
          <Button href="/articles" className="shrink-0" rtl={isRtl}>
            {t("viewAll")}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0">
        {[leftColumn, rightColumn].map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-8">
            {column.map((post, i) => {
              const index = colIndex === 0 ? i * 2 : i * 2 + 1;
              return (
                <Reveal key={post.id} delay={index * 0.08} className="h-full">
                  <article className="group relative flex h-full min-h-[168px] flex-col gap-5 border-b border-border/60 pb-7 last:border-b-0 last:pb-0 sm:min-h-[180px] sm:flex-row sm:items-stretch sm:gap-6 md:gap-8">
                    <span className="pointer-events-none absolute -start-1 top-0 text-[3.5rem] font-bold leading-none text-brand/10 ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <a
                      href={post.href}
                      className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-[22px] sm:h-auto sm:w-[190px] md:w-[250px] lg:w-[280px]"
                    >
                      <Image
                        src={post.image}
                        alt={post.title[lang]}
                        fill
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 100vw, 230px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/50 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                      <span className="absolute bottom-3 start-3 z-[1] rounded-full bg-brand/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                        {post.category[lang]}
                      </span>
                    </a>

                    <div className="relative flex min-w-0 flex-1 flex-col justify-between gap-4 pt-1">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] font-medium text-text-muted">
                          <span className="text-brand">{post.date[lang]}</span>
                          <span className="h-1 w-1 rounded-full bg-brand/50" />
                          <span>{post.readTime[lang]}</span>
                        </div>
                        <a href={post.href} className="no-underline">
                          <h3 className="m-0 line-clamp-2 text-[1.05rem] font-bold leading-[1.4] text-text-primary transition-colors duration-500 group-hover:text-brand md:text-[1.12rem] rtl:font-[family-name:var(--font-cairo)]">
                            {post.title[lang]}
                          </h3>
                        </a>
                        <p className="m-0 line-clamp-2 text-[0.86rem] leading-[1.65] text-text-secondary">
                          {post.excerpt[lang]}
                        </p>
                      </div>
                      <Button href={post.href} className="w-fit" rtl={isRtl}>
                        {t("readMore")}
                      </Button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
    </Section>
  );
}
