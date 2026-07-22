import navbarData from "@/lib/data/navbar.json";
import type { NavItem } from "@/types";

type NavbarData = {
  navItems: NavItem[];
  footerQuickLinks: NavItem[];
};

const data = navbarData as NavbarData;

export async function getNavItems(): Promise<NavItem[]> {
  return data.navItems;
}

export async function getFooterQuickLinks(): Promise<NavItem[]> {
  return data.footerQuickLinks;
}
