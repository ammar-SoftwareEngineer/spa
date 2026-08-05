import type { AbstractIntlMessages } from "next-intl";

const loaders = {
  ar: {
    common: () => import("../../messages/ar/common.json"),
    home: () => import("../../messages/ar/home.json"),
    about: () => import("../../messages/ar/about.json"),
    team: () => import("../../messages/ar/team.json"),
    contact: () => import("../../messages/ar/contact.json"),
    services: () => import("../../messages/ar/services.json"),
    projects: () => import("../../messages/ar/projects.json"),
    products: () => import("../../messages/ar/products.json"),
    portfolio: () => import("../../messages/ar/portfolio.json"),
    partners: () => import("../../messages/ar/partners.json"),
  },
  en: {
    common: () => import("../../messages/en/common.json"),
    home: () => import("../../messages/en/home.json"),
    about: () => import("../../messages/en/about.json"),
    team: () => import("../../messages/en/team.json"),
    contact: () => import("../../messages/en/contact.json"),
    services: () => import("../../messages/en/services.json"),
    projects: () => import("../../messages/en/projects.json"),
    products: () => import("../../messages/en/products.json"),
    portfolio: () => import("../../messages/en/portfolio.json"),
    partners: () => import("../../messages/en/partners.json"),
  },
} as const;

type AppLocale = keyof typeof loaders;
type ModuleName = keyof (typeof loaders)["ar"];

const loadOrder: ModuleName[] = [
  "common",
  "home",
  "about",
  "team",
  "contact",
  "services",
  "projects",
  "products",
  "portfolio",
  "partners",
];

export async function loadMessages(
  locale: string
): Promise<AbstractIntlMessages> {
  const lng: AppLocale = locale === "en" ? "en" : "ar";
  const bundle = loaders[lng];
  const merged: Record<string, unknown> = {};

  for (const name of loadOrder) {
    const { default: data } = await bundle[name]();
    if (name === "common") {
      Object.assign(merged, data);
    } else {
      merged[name] = data;
    }
  }

  return merged as AbstractIntlMessages;
}
