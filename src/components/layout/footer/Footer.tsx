import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getFooterQuickLinks } from "@/lib/api/navbar";
import type { SiteData } from "@/types";

type FooterProps = {
  site: SiteData;
};

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative pb-3 text-[1.15rem] font-bold text-text-primary after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-10 after:bg-brand dark:text-white">
      {children}
    </h3>
  );
}

function ContactRow({
  icon: Icon,
  children,
  dir,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  dir?: "ltr" | "rtl";
}) {
  return (
    <li className="flex items-start gap-3 text-[0.9rem]">
      <Icon className="mt-0.5 shrink-0 text-brand" size={18} />
      <span dir={dir}>{children}</span>
    </li>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (name === "Linkedin") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (name === "Twitter") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default async function Footer({ site }: FooterProps) {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const quickLinks = await getFooterQuickLinks();

  return (
    <footer
      id="contact"
      className="relative z-[1] border-t border-border bg-slate-100 px-6 pb-[30px] pt-20 text-[0.95rem] text-text-secondary dark:border-white/5 dark:bg-[#0b1120] dark:text-slate-300"
    >
      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-col gap-[50px]">
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-5">
            <Image
              src={site.branding.logo}
              alt={`${site.branding.name} Logo`}
              width={110}
              height={45}
              className="h-[45px] w-auto self-start"
            />
            <p className="text-[0.9rem] leading-relaxed opacity-85">{t("about")}</p>
            <div className="mt-2 flex gap-3">
              {site.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white dark:border-white/10 dark:text-slate-100"
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ColumnTitle>{t("links")}</ColumnTitle>
            <ul className="flex list-none flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="inline-block opacity-80 transition-all duration-300 hover:translate-x-1 hover:text-brand hover:opacity-100 rtl:hover:-translate-x-1"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <ColumnTitle>{t("contact")}</ColumnTitle>
            <ul className="flex list-none flex-col gap-4">
              <ContactRow icon={MapPin}>{t("address")}</ContactRow>
              <ContactRow icon={Phone} dir="ltr">
                {site.contact.phone}
              </ContactRow>
              {site.contact.fax ? (
                <ContactRow icon={Phone} dir="ltr">
                  {t("fax")}: {site.contact.fax}
                </ContactRow>
              ) : null}
              <ContactRow icon={Mail}>{site.contact.email}</ContactRow>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <ColumnTitle>{t("newsletter")}</ColumnTitle>
            <form className="flex flex-col gap-3" action="#" method="post">
              <input
                type="email"
                name="email"
                placeholder={t("emailPlaceholder")}
                className="rounded-full border border-border bg-white px-5 py-3 text-[0.85rem] text-text-primary outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_10px_rgba(33,118,149,0.15)] dark:border-white/10 dark:bg-white/5 dark:text-white"
                required
              />
              <Button type="submit" className="w-full" rtl={isRtl}>
                {t("subscribeBtn")}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border pt-[25px] text-center text-[0.85rem] opacity-80 md:flex-row md:justify-between md:text-start dark:border-white/5">
          <div>
            &copy; {new Date().getFullYear()} {t("rights")}
          </div>
          <div>{t("developedBy")}</div>
        </div>
      </div>
    </footer>
  );
}
