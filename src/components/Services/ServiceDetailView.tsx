import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/Services/ProjectCard";
import { getIcon } from "@/lib/icons";
import type { ProjectItem, ServiceItem } from "@/types";

type ServiceDetailViewProps = {
  service: ServiceItem;
  projects: ProjectItem[];
};

export default async function ServiceDetailView({
  service,
  projects,
}: ServiceDetailViewProps) {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("services"),
    getTranslations("nav"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";
  const Icon = getIcon(service.icon);

  return (
    <>
      <PageHero
        eyebrow={tNav("services")}
        title={t(service.titleKey)}
        description={t(service.descKey)}
        currentLabel={t(service.titleKey)}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="grid grid-cols-12 items-stretch gap-8 lg:gap-14">
          <Reveal className="col-span-12 lg:col-span-6">
            <div className="group relative overflow-hidden rounded-[28px] border border-border shadow-[var(--card-shadow)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/55 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-6">
           
            <span className="mb-3 block text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
              {tNav("services")}
            </span>
            <h2 className="mb-5 text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.5rem]">
              {t(service.titleKey)}
            </h2>
            <p className="mb-8 max-w-[560px] text-[1.02rem] leading-[1.8] text-text-secondary">
              {t(service.detailKey)}
            </p>

            <h3 className="mb-4 text-[1.15rem] font-bold text-text-primary">
              {t("detail.featuresTitle")}
            </h3>
            <ul className="mb-8 flex list-none flex-col gap-3">
              {service.featureKeys.map((featureKey) => (
                <li
                  key={featureKey}
                  className="flex items-start gap-3 text-[0.98rem] leading-[1.6] text-text-secondary"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={20} />
                  <span>{t(featureKey)}</span>
                </li>
              ))}
            </ul>

            <Button href="/services" size="lg" rtl={isRtl}>
              {t("detail.backToServices")}
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section variant="alt" className="overflow-x-clip py-20 md:py-28">
        <HeaderSection
          subtitle={t("detail.projectsEyebrow")}
          title={t("detail.projectsTitle")}
          description={t("detail.projectsDescription")}
          className="mb-12 md:mb-16"
        />

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 md:gap-7">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                title={t(project.titleKey)}
                description={t(project.descKey)}
                location={t(project.locationKey)}
                delay={index * 0.08}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary">{t("detail.noProjects")}</p>
        )}
      </Section>
    </>
  );
}
