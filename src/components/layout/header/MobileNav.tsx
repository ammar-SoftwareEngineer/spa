/**
 * MobileNav — full-screen mobile navigation.
 */
"use client";

import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/types";

type MobileNavProps = {
  navItems: NavItem[];
  isOpen: boolean;
  openDropdownKey: string | null;
  onToggleDropdown: (key: string) => void;
  onClose: () => void;
  label: (key: string) => string;
};

export default function MobileNav({
  navItems,
  isOpen,
  openDropdownKey,
  onToggleDropdown,
  onClose,
  label,
}: MobileNavProps) {
  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg-primary p-10 transition-[opacity,transform] duration-500 lg:hidden ${
        isOpen
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none translate-x-full opacity-0 rtl:-translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <ul className="flex w-full max-w-sm list-none flex-col items-center gap-6">
        {navItems.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const dropdownOpen = openDropdownKey === item.key;

          if (!hasChildren) {
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-[1.8rem] font-bold text-text-primary transition-colors hover:text-brand ltr:font-[family-name:var(--font-bebas-neue)] ltr:tracking-wider rtl:font-[family-name:var(--font-cairo)]"
                  onClick={onClose}
                >
                  {label(item.key)}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.key} className="flex w-full flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleDropdown(item.key)}
                className="flex items-center gap-2 text-[1.8rem] font-bold text-text-primary transition-colors hover:text-brand ltr:font-[family-name:var(--font-bebas-neue)] ltr:tracking-wider rtl:font-[family-name:var(--font-cairo)]"
                aria-expanded={dropdownOpen}
              >
                {label(item.key)}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen ? (
                <ul className="flex list-none flex-col items-center gap-1">
                  {item.children!.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.href}
                        className="relative block py-2 text-[1.05rem] text-text-secondary transition-all after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-full after:origin-end after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:origin-start hover:after:scale-x-100"
                        onClick={onClose}
                      >
                        {label(child.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
