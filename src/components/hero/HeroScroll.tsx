"use client";

import { useTranslations } from "next-intl";

/** CSS-only motion — no framer cost on the hero critical path. */
export default function HeroScroll() {
  const t = useTranslations("home.hero");

  return (
    <a
      href="#about"
      className="absolute bottom-10 left-1/2 z-10 flex w-full  cursor-pointer  justify-center items-center gap-2 opacity-0 transition-opacity hover:opacity-100 motion-safe:animate-fade-in-up"
    >
      <div className="flex flex-col items-center gap-2 w-full justify-center">
        <div className="flex h-10 w-6 justify-center rounded-xl border-2 border-text-primary pt-2 dark:border-white">
          <div className="h-2 w-1 rounded-sm bg-brand motion-safe:animate-scroll-mouse" />
        </div>
        <span className="text-xs uppercase tracking-[0.15em] text-text-secondary dark:text-slate-200">
          {t("scrollDown")}
        </span>
      </div>

    </a>
  );
}
