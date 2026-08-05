import { getTranslations } from "next-intl/server";
import { Download, FileText } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export const PORTFOLIO_PDF_HREF = "/spa-company-profile-2026.pdf";

export default async function PortfolioPageView() {
  const [t, tNav] = await Promise.all([
    getTranslations("portfolio"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("portfolio")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <Reveal>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-border/70 bg-bg-secondary/70 p-7 shadow-[var(--card-shadow)] md:p-9">
              <div className="pointer-events-none absolute -end-16 -top-16 h-44 w-44 rounded-full bg-brand/15 blur-3xl" />

              <div className="relative z-[1]">
                <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <FileText size={28} />
                </span>
                <p className="mb-3 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
                  {t("content.eyebrow")}
                </p>
                <h2 className="mb-4 text-[1.75rem] font-bold leading-[1.25] text-text-primary md:text-[2.1rem]">
                  {t("content.title")}
                </h2>
                <p className="m-0 text-[1rem] leading-[1.75] text-text-secondary">
                  {t("content.description")}
                </p>
              </div>

              <div className="relative z-[1] mt-8 flex flex-wrap gap-3">
                <a
                  href={PORTFOLIO_PDF_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-skew"
                >
                  <span>
                    {t("content.view")}
                    <FileText size={16} />
                  </span>
                </a>
                <a
                  href={PORTFOLIO_PDF_HREF}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-[0.95rem] font-semibold text-text-primary transition-colors hover:border-brand hover:text-brand"
                >
                  <Download size={16} />
                  {t("content.download")}
                </a>
              </div>

              <p className="relative z-[1] mt-5 text-[0.88rem] text-text-muted">
                {t("content.hint")}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] border border-border/70 bg-bg-primary shadow-[var(--card-shadow)]">
              <iframe
                title={t("content.title")}
                src={`${PORTFOLIO_PDF_HREF}#toolbar=1&navpanes=0`}
                className="h-[min(70vh,720px)] w-full border-0 bg-bg-secondary"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
