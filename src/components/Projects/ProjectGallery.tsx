"use client";

import { useState } from "react";
import Image from "next/image";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

/**
 * Simple project gallery with Swiper:
 * - Big slider on top (arrows to change image)
 * - Small thumbnails under it
 */
export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="overflow-x-clip py-14 sm:py-20 md:py-28">
      <Container>
        <Reveal className="mb-8 sm:mb-12">
          <h2 className="m-0 text-[1.55rem] text-text-primary sm:text-[1.9rem] md:text-[2.5rem]">
            {title}
          </h2>
          <div className="mt-4 h-px w-14 bg-brand/50 sm:w-16" aria-hidden />
        </Reveal>

        {/* Main images */}
        <Reveal>
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            spaceBetween={16}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="project-gallery-main overflow-hidden rounded-[18px] sm:rounded-[24px]"
          >
            {images.map((src, i) => (
              <SwiperSlide key={`${src}-${i}`}>
                <div className="relative aspect-[16/10] w-full bg-bg-secondary sm:aspect-[21/10]">
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        {/* Thumbnails */}
        {images.length > 1 ? (
          <Reveal delay={0.08} className="mt-4 sm:mt-5">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              watchSlidesProgress
              spaceBetween={10}
              slidesPerView={3.2}
              breakpoints={{
                640: { slidesPerView: 4.2, spaceBetween: 12 },
                768: { slidesPerView: 5.2, spaceBetween: 14 },
                1024: { slidesPerView: 6, spaceBetween: 16 },
              }}
              className="project-gallery-thumbs"
            >
              {images.map((src, i) => (
                <SwiperSlide key={`thumb-${src}-${i}`} className="cursor-pointer">
                  <div className="project-gallery-thumb relative aspect-[4/3] overflow-hidden rounded-[12px] border-2 border-transparent bg-bg-secondary sm:rounded-[14px]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
