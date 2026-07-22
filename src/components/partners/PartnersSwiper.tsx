"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { PartnerItem } from "@/types";

function PartnerLogo({ partner }: { partner: PartnerItem }) {
  return (
    <div className="flex h-[92px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-[#0b1220] px-3 py-3 shadow-[0_10px_28px_rgba(15,23,42,0.12)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(33,118,149,0.2)] md:h-[100px]">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={160}
        height={64}
        className="h-14 w-auto max-w-[140px] object-contain md:h-16 md:max-w-[156px]"
        draggable={false}
      />
    </div>
  );
}

function PartnersRow({
  partners,
  reverse = false,
  speed = 6000,
}: {
  partners: PartnerItem[];
  reverse?: boolean;
  speed?: number;
}) {
  // Extra copies so Swiper loop never runs short (fixes end-of-loop jump).
  const slides = [...partners, ...partners, ...partners];

  return (
    <Swiper
      modules={[Autoplay]}
      className="partners-swiper w-full"
      slidesPerView={2.2}
      spaceBetween={16}
      loop
      loopAdditionalSlides={partners.length}
      watchSlidesProgress
      allowTouchMove
      grabCursor
      speed={speed}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      breakpoints={{
        480: { slidesPerView: 2.6, spaceBetween: 16 },
        640: { slidesPerView: 3.2, spaceBetween: 16 },
        768: { slidesPerView: 4.2, spaceBetween: 20 },
        1024: { slidesPerView: 5.2, spaceBetween: 20 },
        1280: { slidesPerView: 6.2, spaceBetween: 20 },
      }}
    >
      {slides.map((partner, index) => (
        <SwiperSlide key={`${partner.name}-${index}`}>
          <PartnerLogo partner={partner} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function PartnersSwiper({ partners }: { partners: PartnerItem[] }) {
  const mid = Math.ceil(partners.length / 2);
  const rowOne = partners.slice(0, mid);
  const rowTwo = partners.slice(mid);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-12 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent md:w-20 dark:from-[#131b2e]" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-12 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent md:w-20 dark:from-[#131b2e]" />

      <div className="flex flex-col gap-4 md:gap-5">
        <PartnersRow partners={rowOne} speed={5500} />
        <PartnersRow partners={rowTwo} reverse speed={6500} />
      </div>
    </div>
  );
}
