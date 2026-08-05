/**
 * HeaderActions — أزرار الثيم واللغة وقائمة الموبايل
 */
"use client";

import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import type { Theme } from "@/lib/theme";

type HeaderActionsProps = {
  theme: Theme;
  actionBtnTone: string;
  useWhiteLinks: boolean;
  isMobileMenuOpen: boolean;
  localeLabel: string;
  onToggleTheme: () => void;
  onSwitchLocale: () => void;
  onToggleMobileMenu: () => void;
};

export default function HeaderActions({
  theme,
  actionBtnTone,
  useWhiteLinks,
  isMobileMenuOpen,
  localeLabel,
  onToggleTheme,
  onSwitchLocale,
  onToggleMobileMenu,
}: HeaderActionsProps) {
  return (
    <div className="relative z-[1002] flex items-center gap-2 lg:gap-4">
      <button
        type="button"
        onClick={onToggleTheme}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-transparent transition-all hover:scale-105 ${actionBtnTone}`}
        aria-label="Toggle Theme"
        title={theme === "light" ? "Dark Mode" : "Light Mode"}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <button
        type="button"
        onClick={onSwitchLocale}
        className={`flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border bg-transparent px-3 text-[0.85rem] font-semibold transition-all hover:scale-105 ${actionBtnTone}`}
        aria-label="Toggle Language"
      >
        <Globe size={16} />
        <span>{localeLabel}</span>
      </button>

      <button
        type="button"
        onClick={onToggleMobileMenu}
        className={`flex h-10 w-10 items-center justify-center bg-transparent lg:hidden ${
          useWhiteLinks ? "text-white" : "text-text-primary"
        }`}
        aria-label="Toggle Mobile Menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
