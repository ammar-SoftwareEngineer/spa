import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import { getCategories } from "@/lib/api/categories";
import { getSectors } from "@/lib/api/sectors";
import type { ProjectItem } from "@/types";

type ProjectDetailViewProps = {
  project: ProjectItem;
};

export default async function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [categories, sectors, t, tNav, tServices, tHome, tSectors, locale] = await Promise.all([
    getCategories(),
    getSectors(),
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("services"),
    getTranslations("home.projects"),
    getTranslations("home.sectors"),
    getLocale(),
  ]);

  const title = tServices(project.titleKey);
  const location = tServices(project.locationKey);
  const year = project.date.slice(0, 4);
  const overviewImage = project.gallery[1] ?? project.image;
  const scopeImage = project.gallery[2] ?? project.gallery[0] ?? project.image;

  const categoryLabels = project.categorySlugs
    .map((slug) => categories.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => tHome(item!.titleKey));

  const sectorLabels = project.sectorSlugs
    .map((slug) => sectors.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => tSectors(item!.titleKey));

  const meta = [
    { label: t("detail.client"), value: t(project.clientKey) },
    { label: t("detail.location"), value: location },
    { label: t("detail.consultant"), value: t(project.consultantKey) },
    { label: t("detail.status"), value: t(project.statusKey) },
  ];

  return (
    <div className="overflow-x-clip bg-bg-primary">
      {/* Hero — cinematic full-bleed like SPA PageHero */}
      <section className="relative overflow-hidden border-b border-border pt-[110px] pb-28 md:pt-[140px] md:pb-36">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#061018]/94 via-[#0d3b4d]/78 to-[#0d3b4d]/40 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018]/80 via-transparent to-[#061018]/30" />

        <div className="container relative z-[2] mx-auto w-full px-5 md:px-10 lg:px-20">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[0.85rem] text-white/65">
            <Link href="/" className="transition-colors hover:text-brand">
              {tNav("home")}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/projects" className="transition-colors hover:text-brand">
              {t("detail.breadcrumbProjects")}
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-white">{title}</span>
          </nav>

          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-md bg-brand px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
                {year}
              </span>
              {sectorLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-md bg-white/12 px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-md border border-white/25 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white/90"
                >
                  {label}
                </span>
              ))}
            </div>

            <h1 className="m-0 max-w-[900px] text-[2.5rem] leading-[1.1] text-white md:text-[3.8rem]">
              {title}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Meta — overlapping strip */}
      <div className="relative z-[3] -mt-16 md:-mt-20">
        <div className="container mx-auto w-full px-5 md:px-10 lg:px-20">
          <Reveal>
            <dl className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-border/70 bg-bg-primary shadow-[0_24px_64px_rgba(13,59,77,0.18)] sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((item, index) => (
                <div
                  key={item.label}
                  className={`px-6 py-6 md:px-7 md:py-8 ${
                    index < meta.length - 1
                      ? "border-b border-border/70 sm:border-b-0 sm:[&:nth-child(odd)]:border-e lg:border-e lg:[&:nth-child(odd)]:border-e"
                      : ""
                  }`}
                >
                  <dt className="m-0 mb-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand">
                    {item.label}
                  </dt>
                  <dd className="m-0 text-[1.02rem] font-semibold leading-[1.45] text-text-primary">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Overview — image + content */}
      <section className="overflow-x-clip py-20 md:py-28">
        <div className="container mx-auto w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-12 items-center gap-10 lg:gap-16">
            <Reveal className="col-span-12 lg:col-span-6">
              <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={overviewImage}
                    alt={t(project.overviewTitleKey)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/45 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute start-5 top-5 h-10 w-10 border-s-2 border-t-2 border-brand" />
                  <div className="pointer-events-none absolute bottom-5 end-5 h-10 w-10 border-e-2 border-b-2 border-white/45" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="col-span-12 lg:col-span-6">
              <span className="mb-3 block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
                {t("detail.overview")}
              </span>
              <h2 className="mb-5 text-[2rem] leading-[1.2] text-text-primary md:text-[2.6rem]">
                {t(project.overviewTitleKey)}
              </h2>
              <div className="mb-6 h-px w-16 bg-brand/50" aria-hidden />
              <p className="m-0 max-w-[540px] text-[1.05rem] leading-[1.85] text-text-secondary whitespace-pre-line">
                {t(project.overviewBodyKey)}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scope — reverse image + content on alt bg */}
      <section className="overflow-x-clip border-y border-border bg-bg-secondary py-20 md:py-28">
        <div className="container mx-auto w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-12 items-center gap-10 lg:gap-16">
            <Reveal className="col-span-12 lg:col-span-6 lg:order-2">
              <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={scopeImage}
                    alt={t(project.scopeTitleKey)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/45 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute start-5 top-5 h-10 w-10 border-s-2 border-t-2 border-white/50" />
                  <div className="pointer-events-none absolute bottom-5 end-5 h-10 w-10 border-e-2 border-b-2 border-brand" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:order-1">
              <span className="mb-3 block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
                {t("detail.scope")}
              </span>
              <h2 className="mb-5 text-[2rem] leading-[1.2] text-text-primary md:text-[2.6rem]">
                {t(project.scopeTitleKey)}
              </h2>
              <div className="mb-6 h-px w-16 bg-brand/50" aria-hidden />
              <p className="m-0 max-w-[540px] text-[1.05rem] leading-[1.85] text-text-secondary whitespace-pre-line">
                {t(project.scopeBodyKey)}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ProjectGallery images={project.gallery} title={t("detail.gallery")} />

     
    </div>
  );
}
