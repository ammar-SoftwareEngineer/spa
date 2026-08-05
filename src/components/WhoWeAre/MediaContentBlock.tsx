/**
 * MediaContentBlock — بلوك صورة + نص جنب بعض (About / Mission / Vision)
 */
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export type MediaContentBlockProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse?: boolean;
};

export default function MediaContentBlock({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  text,
  reverse = false,
}: MediaContentBlockProps) {
  return (
    <div className="grid grid-cols-12 items-center gap-8 lg:gap-16">
      <Reveal
        className={`relative col-span-12 md:col-span-6 ${reverse ? "md:order-2" : ""}`}
      >
        <div className="group relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-border md:aspect-[5/4]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority={!reverse}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3b4d]/55 via-transparent to-transparent" />
        </div>
      </Reveal>

      <Reveal
        className={`col-span-12 flex flex-col gap-4 md:col-span-6 ${reverse ? "md:order-1" : ""}`}
        delay={0.1}
      >
        <span className="text-[0.85rem] font-bold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </span>
        <h2 className="text-[2rem] font-bold leading-[1.2] text-text-primary md:text-[2.6rem]">
          {title}
        </h2>
        <p className="max-w-[540px] text-[1.02rem] leading-[1.8] text-text-secondary">{text}</p>
      </Reveal>
    </div>
  );
}
