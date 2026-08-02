import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import { getCategories } from "@/lib/api/categories";
import { getSectors } from "@/lib/api/sectors";
import type { ProjectItem } from "@/types";

type ProjectDetailViewProps = {
  project: ProjectItem;
};

export default async function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [categories, sectors, t, tNav, tServices, tHome, tSectors] = await Promise.all([
    getCategories(),
    getSectors(),
    getTranslations("projects"),
    getTranslations("nav"),
    getTranslations("services"),
    getTranslations("home.projects"),
    getTranslations("home.sectors"),
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
      <section className="relative overflow-hidden border-b border-border pt-[100px] pb-20 sm:pt-[110px] sm:pb-24 md:pt-[140px] md:pb-32">
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

        <div className="container relative z-[2] mx-auto w-full px-4 sm:px-5 md:px-10 lg:px-20">
          <nav className="mb-5 flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-white/65 sm:mb-8 sm:text-[0.85rem]">
            <Link href="/" className="shrink-0 transition-colors hover:text-brand">
              {tNav("home")}
            </Link>
            <span aria-hidden className="shrink-0">/</span>
            <Link href="/projects" className="shrink-0 transition-colors hover:text-brand">
              {t("detail.breadcrumbProjects")}
            </Link>
            <span aria-hidden className="shrink-0">/</span>
            <span className="min-w-0 break-words font-medium text-white">{title}</span>
          </nav>

          <Reveal>
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6">
              <span className="inline-flex rounded-md bg-brand px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white sm:px-3 sm:py-1.5 sm:text-[0.72rem]">
                {year}
              </span>
              {sectorLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-md bg-white/12 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[0.72rem]"
                >
                  {label}
                </span>
              ))}
              {categoryLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-md border border-white/25 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white/90 sm:px-3 sm:py-1.5 sm:text-[0.72rem]"
                >
                  {label}
                </span>
              ))}
            </div>

            <h1 className="m-0 max-w-[900px] text-[1.85rem] leading-[1.15] text-white sm:text-[2.5rem] md:text-[3.4rem] lg:text-[3.8rem]">
              {title}
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="relative z-[3] -mt-10 sm:-mt-14 md:-mt-20">
        <div className="container mx-auto w-full px-4 sm:px-5 md:px-10 lg:px-20">
          <Reveal>
            <dl className="grid grid-cols-1 overflow-hidden rounded-[20px] border border-border/70 bg-bg-primary shadow-[0_20px_48px_rgba(13,59,77,0.16)] sm:grid-cols-2 sm:rounded-[24px] lg:grid-cols-4">
              {meta.map((item, index) => (
                <div
                  key={item.label}
                  className={[
                    "px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-8",
                    index < meta.length - 1 ? "border-b border-border/70" : "",
                    "sm:[&:nth-child(odd)]:border-e sm:[&:nth-child(1)]:border-b sm:[&:nth-child(2)]:border-b lg:border-b-0 lg:border-e lg:[&:last-child]:border-e-0",
                  ].join(" ")}
                >
                  <dt className="m-0 mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand sm:mb-2 sm:text-[0.7rem]">
                    {item.label}
                  </dt>
                  <dd className="m-0 break-words text-[0.95rem] font-semibold leading-[1.45] text-text-primary sm:text-[1.02rem]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <section className="overflow-x-clip py-14 sm:py-20 md:py-28">
        <div className="container mx-auto w-full px-4 sm:px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="group relative overflow-hidden rounded-[22px] border border-border shadow-[var(--card-shadow)] sm:rounded-[28px]">
                <div className="relative aspect-[16/11] sm:aspect-[4/3]">
                  <Image
                    src={overviewImage}
                    alt={t(project.overviewTitleKey)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/45 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute start-4 top-4 h-8 w-8 border-s-2 border-t-2 border-brand sm:start-5 sm:top-5 sm:h-10 sm:w-10" />
                  <div className="pointer-events-none absolute bottom-4 end-4 h-8 w-8 border-e-2 border-b-2 border-white/45 sm:bottom-5 sm:end-5 sm:h-10 sm:w-10" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="mb-2 block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand sm:mb-3 sm:text-[0.85rem]">
                {t("detail.overview")}
              </span>
              <h2 className="mb-4 text-[1.55rem] leading-[1.25] text-text-primary sm:mb-5 sm:text-[2rem] md:text-[2.6rem]">
                {t(project.overviewTitleKey)}
              </h2>
              <div className="mb-5 h-px w-14 bg-brand/50 sm:mb-6 sm:w-16" aria-hidden />
              <p className="m-0 max-w-[540px] text-[0.98rem] leading-[1.8] text-text-secondary whitespace-pre-line sm:text-[1.05rem] sm:leading-[1.85]">
                {t(project.overviewBodyKey)}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="overflow-x-clip border-y border-border bg-bg-secondary py-14 sm:py-20 md:py-28">
        <div className="container mx-auto w-full px-4 sm:px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="lg:order-2">
              <div className="group relative overflow-hidden rounded-[22px] border border-border shadow-[var(--card-shadow)] sm:rounded-[28px]">
                <div className="relative aspect-[16/11] sm:aspect-[4/3]">
                  <Image
                    src={scopeImage}
                    alt={t(project.scopeTitleKey)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/45 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute start-4 top-4 h-8 w-8 border-s-2 border-t-2 border-white/50 sm:start-5 sm:top-5 sm:h-10 sm:w-10" />
                  <div className="pointer-events-none absolute bottom-4 end-4 h-8 w-8 border-e-2 border-b-2 border-brand sm:bottom-5 sm:end-5 sm:h-10 sm:w-10" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:order-1">
              <span className="mb-2 block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand sm:mb-3 sm:text-[0.85rem]">
                {t("detail.scope")}
              </span>
              <h2 className="mb-4 text-[1.55rem] leading-[1.25] text-text-primary sm:mb-5 sm:text-[2rem] md:text-[2.6rem]">
                {t(project.scopeTitleKey)}
              </h2>
              <div className="mb-5 h-px w-14 bg-brand/50 sm:mb-6 sm:w-16" aria-hidden />
              <p className="m-0 max-w-[540px] text-[0.98rem] leading-[1.8] text-text-secondary whitespace-pre-line sm:text-[1.05rem] sm:leading-[1.85]">
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
