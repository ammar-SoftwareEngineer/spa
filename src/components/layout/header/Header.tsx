/**
 * Header — fixed top bar (logo + nav + theme/locale).
 * Logic lives here; UI is split into DesktopNav / MobileNav / HeaderActions.
 */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getTheme, toggleTheme as switchTheme, type Theme } from "@/lib/theme";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import DesktopNav from "@/components/layout/header/DesktopNav";
import MobileNav from "@/components/layout/header/MobileNav";
import HeaderActions from "@/components/layout/header/HeaderActions";
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
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  // Glass header style after scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDesktopDropdown(null);
    setOpenMobileDropdown(null);
  }, [pathname]);

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === "ar" ? "en" : "ar" });
  };

  const isChildActive = (item: NavItem) =>
    item.children?.some(
      (child) =>
        pathname === child.href ||
        (child.href !== "/" && pathname.startsWith(`${child.href}/`))
    ) ?? false;

  const isItemActive = (item: NavItem) => {
    if (item.children?.length) {
      return (
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ||
        isChildActive(item)
      );
    }
    return pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
  };

  const isLight = theme === "light";
  const isHome = pathname === "/";
  const useWhiteLinks = isLight && !isScrolled && !isHome;

  const navLinkBase =
    "relative py-2 text-[0.95rem] font-medium transition-all after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-full after:bg-brand after:transition-transform after:duration-300";
  const navLinkIdle = useWhiteLinks
    ? "text-white opacity-90 after:origin-end after:scale-x-0 hover:text-brand hover:opacity-100 hover:after:origin-start hover:after:scale-x-100"
    : "text-text-primary opacity-80 after:origin-end after:scale-x-0 hover:text-brand hover:opacity-100 hover:after:origin-start hover:after:scale-x-100";
  const navLinkActive = "text-brand opacity-100 after:scale-x-100";
  const actionBtnTone = useWhiteLinks
    ? "border-white text-white hover:bg-white hover:text-[#0f172a]"
    : "border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] motion-safe:animate-header-in transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
          isScrolled
            ? "border-b border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_4px_30px_var(--glass-shadow)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Container
          className={`flex items-center justify-between px-5 ${
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

          <DesktopNav
            navItems={navItems}
            pathname={pathname}
            openKey={openDesktopDropdown}
            onOpen={setOpenDesktopDropdown}
            label={t}
            isItemActive={isItemActive}
            navLinkBase={navLinkBase}
            navLinkIdle={navLinkIdle}
            navLinkActive={navLinkActive}
          />

          <HeaderActions
            theme={theme}
            actionBtnTone={actionBtnTone}
            useWhiteLinks={useWhiteLinks}
            isMobileMenuOpen={isMobileMenuOpen}
            localeLabel={locale === "ar" ? "EN" : "العربية"}
            onToggleTheme={() => setTheme(switchTheme())}
            onSwitchLocale={switchLocale}
            onToggleMobileMenu={() => setIsMobileMenuOpen((open) => !open)}
          />
        </Container>
      </header>

      <MobileNav
        navItems={navItems}
        isOpen={isMobileMenuOpen}
        openDropdownKey={openMobileDropdown}
        onToggleDropdown={(key) =>
          setOpenMobileDropdown((current) => (current === key ? null : key))
        }
        onClose={() => setIsMobileMenuOpen(false)}
        label={t}
      />
    </>
  );
}
