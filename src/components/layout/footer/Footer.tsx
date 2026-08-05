/**
 * Footer — أسفل كل الصفحات (براند + روابط + تواصل + نشرة)
 */
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import FooterBrand from "@/components/layout/footer/FooterBrand";
import FooterLinks from "@/components/layout/footer/FooterLinks";
import FooterContact from "@/components/layout/footer/FooterContact";
import FooterNewsletter from "@/components/layout/footer/FooterNewsletter";
import { getFooterQuickLinks } from "@/lib/api/navbar";
import type { SiteData } from "@/types";

type FooterProps = {
  site: SiteData;
};

export default async function Footer({ site }: FooterProps) {
  const tNav = await getTranslations("nav");
  const t = await getTranslations("footer");
  const quickLinks = await getFooterQuickLinks();

  return (
    <footer
      id="contact"
      className="relative z-[1] border-t border-border bg-slate-100 pb-[30px] pt-20 text-[0.95rem] text-text-secondary dark:border-white/5 dark:bg-[#0b1120] dark:text-slate-300"
    >
      <Container className="relative z-[1] flex flex-col gap-[50px]">
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:gap-10">
          <FooterBrand site={site} about={t("about")} />
          <FooterLinks title={t("links")} links={quickLinks} label={tNav} />
          <FooterContact
            title={t("contact")}
            site={site}
            address={t("address")}
            faxLabel={t("fax")}
          />
          <FooterNewsletter />
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border pt-[25px] text-center text-[0.85rem] opacity-80 md:flex-row md:justify-between md:text-start dark:border-white/5">
          <div>
            &copy; {new Date().getFullYear()} {t("rights")}
          </div>
          <div>{t("developedBy")}</div>
        </div>
      </Container>
    </footer>
  );
}
