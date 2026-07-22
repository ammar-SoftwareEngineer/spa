"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getTheme, toggleTheme as switchTheme, type Theme } from "@/lib/theme";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import type { NavItem } from "@/types";

type HeaderProps = {
  navItems: NavItem[];
  logoSrc: string;
};

export default function Header({ navItems, logoSrc }: HeaderProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === "ar" ? "en" : "ar" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] motion-safe:animate-header-in transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
          isScrolled
            ? "border-b border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_4px_30px_var(--glass-shadow)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full container items-center justify-between px-5 md:px-10 lg:px-20 ${
            isScrolled ? "h-[70px] md:h-20" : "h-[70px] md:h-[90px]"
          }`}
        >
          <Link href="/" className="relative z-[1002] flex shrink-0 items-center">
            <Image
              src={logoSrc}
              alt="S&PA Logo"
              width={120}
              height={50}
              className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105 md:h-[50px]"
              priority
            />
          </Link>

          <ul className="hidden list-none items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="relative py-2 text-[0.95rem] font-medium text-text-primary opacity-80 transition-all hover:text-brand hover:opacity-100 after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-full after:origin-end after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:origin-start hover:after:scale-x-100"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative z-[1002] flex items-center gap-2 lg:gap-4">
            <button
              type="button"
              onClick={() => setTheme(switchTheme())}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-transparent text-text-primary transition-all hover:scale-105 hover:bg-text-primary hover:text-bg-primary"
              aria-label="Toggle Theme"
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              type="button"
              onClick={switchLocale}
              className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-border bg-transparent px-3 text-[0.85rem] font-semibold text-text-primary transition-all hover:scale-105 hover:bg-text-primary hover:text-bg-primary"
              aria-label="Toggle Language"
            >
              <Globe size={16} />
              <span>{locale === "ar" ? "EN" : "العربية"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center bg-transparent text-text-primary lg:hidden"
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg-primary p-10 transition-[opacity,transform] duration-500 lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0 rtl:-translate-x-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="flex list-none flex-col items-center gap-8">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="text-[1.8rem] font-bold text-text-primary transition-colors hover:text-brand ltr:font-[family-name:var(--font-bebas-neue)] ltr:tracking-wider rtl:font-[family-name:var(--font-cairo)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}
