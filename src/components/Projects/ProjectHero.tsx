/**
 * ProjectHero — هيرو صفحة تفاصيل المشروع (صورة + عنوان + tags)
 */
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type ProjectHeroProps = {
  image: string;
  title: string;
  year: string;
  homeLabel: string;
  projectsLabel: string;
  sectorLabels: string[];
  categoryLabels: string[];
};

export default function ProjectHero({
  image,
  title,
  year,
  homeLabel,
  projectsLabel,
  sectorLabels,
  categoryLabels,
}: ProjectHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-[100px] pb-20 sm:pt-[110px] sm:pb-24 md:pt-[140px] md:pb-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#061018]/94 via-[#0d3b4d]/78 to-[#0d3b4d]/40 rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#061018]/80 via-transparent to-[#061018]/30" />

      <Container className="relative z-[2]">
        <nav className="mb-5 flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-white/65 sm:mb-8 sm:text-[0.85rem]">
          <Link href="/" className="shrink-0 transition-colors hover:text-brand">
            {homeLabel}
          </Link>
          <span aria-hidden className="shrink-0">
            /
          </span>
          <Link href="/projects" className="shrink-0 transition-colors hover:text-brand">
            {projectsLabel}
          </Link>
          <span aria-hidden className="shrink-0">
            /
          </span>
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
      </Container>
    </section>
  );
}
