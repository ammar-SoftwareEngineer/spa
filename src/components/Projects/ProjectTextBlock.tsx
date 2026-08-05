/**
 * ProjectTextBlock — image + text block (overview / scope).
 * Same idea as MediaContentBlock, styled for project details.
 */
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type ProjectTextBlockProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse?: boolean;
  altBackground?: boolean;
};

export default function ProjectTextBlock({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  text,
  reverse = false,
  altBackground = false,
}: ProjectTextBlockProps) {
  return (
    <section
      className={`overflow-x-clip py-14 sm:py-20 md:py-28 ${
        altBackground ? "border-y border-border bg-bg-secondary" : ""
      }`}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className={reverse ? "lg:order-2" : ""}>
            <div className="group relative overflow-hidden rounded-[22px] border border-border shadow-[var(--card-shadow)] sm:rounded-[28px]">
              <div className="relative aspect-[16/11] sm:aspect-[4/3]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
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

          <Reveal delay={0.1} className={reverse ? "lg:order-1" : ""}>
            <span className="mb-2 block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand sm:mb-3 sm:text-[0.85rem]">
              {eyebrow}
            </span>
            <h2 className="mb-4 text-[1.55rem] leading-[1.25] text-text-primary sm:mb-5 sm:text-[2rem] md:text-[2.6rem]">
              {title}
            </h2>
            <div className="mb-5 h-px w-14 bg-brand/50 sm:mb-6 sm:w-16" aria-hidden />
            <p className="m-0 max-w-[540px] whitespace-pre-line text-[0.98rem] leading-[1.8] text-text-secondary sm:text-[1.05rem] sm:leading-[1.85]">
              {text}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
