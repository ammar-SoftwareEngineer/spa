import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";

export type MediaContentBlockProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse?: boolean;
  badgeIcon?: string;
};

export default function MediaContentBlock({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  text,
  reverse = false,
  badgeIcon,
}: MediaContentBlockProps) {
  const BadgeIcon = badgeIcon ? getIcon(badgeIcon) : null;

  return (
    <div className="grid grid-cols-12 items-center gap-8 lg:gap-16">
      <Reveal
        className={`relative col-span-12 md:col-span-6 ${reverse ? "md:order-2" : ""}`}
      >
        <div className="group relative mx-auto h-125 overflow-hidden rounded-[28px] border border-border">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03] w-full h-full"
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
