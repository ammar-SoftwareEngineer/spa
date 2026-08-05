/**
 * DesktopNav — desktop navigation with dropdowns.
 */
"use client";

import { ChevronDown } from "lucide-react";
import NavLink from "@/components/ui/NavLink";
import type { NavItem } from "@/types";

type DesktopNavProps = {
  navItems: NavItem[];
  pathname: string;
  openKey: string | null;
  onOpen: (key: string | null) => void;
  label: (key: string) => string;
  isItemActive: (item: NavItem) => boolean;
  navLinkBase: string;
  navLinkIdle: string;
  navLinkActive: string;
};

export default function DesktopNav({
  navItems,
  pathname,
  openKey,
  onOpen,
  label,
  isItemActive,
  navLinkBase,
  navLinkIdle,
  navLinkActive,
}: DesktopNavProps) {
  return (
    <ul className="hidden list-none items-center gap-6 lg:flex">
      {navItems.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = openKey === item.key;

        if (!hasChildren) {
          return (
            <li key={item.key}>
              <NavLink item={item} className={`${navLinkBase} ${navLinkIdle}`}>
                {label(item.key)}
              </NavLink>
            </li>
          );
        }

        return (
          <li
            key={item.key}
            className="relative"
            onMouseEnter={() => onOpen(item.key)}
            onMouseLeave={() => onOpen(null)}
          >
            <button
              type="button"
              className={`${navLinkBase} flex cursor-pointer items-center gap-1 ${
                isOpen || isItemActive(item) ? navLinkActive : navLinkIdle
              }`}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              {label(item.key)}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute start-0 top-full z-50 pt-2 transition-opacity duration-200 ${
                isOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <ul className="grid min-w-[200px] list-none gap-2 rounded-[18px] border border-border bg-bg-primary py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                {item.children!.map((child) => {
                  const active =
                    pathname === child.href ||
                    (child.href !== item.href &&
                      child.href !== "/" &&
                      pathname.startsWith(`${child.href}/`));

                  return (
                    <li key={child.key}>
                      <NavLink
                        item={child}
                        className={`relative mx-3 block whitespace-nowrap py-2.5 text-[0.9rem] font-medium transition-all after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-full after:bg-brand after:transition-transform after:duration-300 ${
                          active
                            ? "text-brand after:scale-x-100"
                            : "text-text-primary after:origin-end after:scale-x-0 hover:text-brand hover:after:origin-start hover:after:scale-x-100"
                        }`}
                      >
                        {label(child.key)}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
