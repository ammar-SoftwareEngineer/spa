"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Reveal from "@/components/ui/Reveal";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((src) => ({ src }));

  return (
    <section className="overflow-x-clip py-20 md:py-28">
      <div className="container mx-auto w-full px-5 md:px-10 lg:px-20">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span
                aria-hidden
                className="mb-2 block text-[4.5rem] font-bold leading-none text-brand/15 md:text-[5.5rem] ltr:font-[family-name:var(--font-bebas-neue)] rtl:font-[family-name:var(--font-cairo)]"
              >
                03
              </span>
              <h2 className="m-0 text-[1.9rem] text-text-primary md:text-[2.5rem]">{title}</h2>
            </div>
            <div className="mb-4 hidden h-px flex-1 bg-gradient-to-r from-brand/40 to-transparent sm:block rtl:bg-gradient-to-l" />
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {images.map((src, i) => {
            const isHero = i === 0;
            return (
              <Reveal
                key={`${src}-${i}`}
                delay={Math.min(i, 5) * 0.05}
                className={
                  isHero
                    ? "col-span-12 md:col-span-8 md:row-span-2"
                    : "col-span-12 sm:col-span-6 md:col-span-4"
                }
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`group relative block w-full overflow-hidden rounded-[22px] bg-bg-secondary text-start outline-none transition-[transform,box-shadow] duration-600 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(33,118,149,0.22)] focus-visible:ring-2 focus-visible:ring-brand ${
                    isHero
                      ? "aspect-[16/11] md:aspect-auto md:h-full md:min-h-[420px]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    sizes={
                      isHero
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061018]/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="pointer-events-none absolute inset-y-0 start-0 w-1/2 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] group-hover:translate-x-[260%]" />
                  <span className="absolute bottom-4 start-4 inline-flex rounded-md bg-white/15 px-2.5 py-1 text-[0.7rem] font-bold text-white backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails, Counter]}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(6, 16, 24, 0.94)" },
        }}
      />
    </section>
  );
}
