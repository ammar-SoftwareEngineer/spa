import { getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Printer } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/ContactUs/ContactForm";
import { getSiteData } from "@/lib/api/site";

export default async function ContactMainSection() {
  const [site, t, tFooter] = await Promise.all([
    getSiteData(),
    getTranslations("contact"),
    getTranslations("footer"),
  ]);

  const rows = [
    {
      key: "address",
      icon: MapPin,
      title: t("info.addressTitle"),
      value: tFooter("address"),
      href: undefined as string | undefined,
      dir: undefined as "ltr" | undefined,
    },
    {
      key: "phone",
      icon: Phone,
      title: t("info.phoneTitle"),
      value: site.contact.phone,
      href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`,
      dir: "ltr" as const,
    },
    {
      key: "fax",
      icon: Printer,
      title: t("info.faxTitle"),
      value: site.contact.fax ?? "",
      href: undefined as string | undefined,
      dir: "ltr" as const,
    },
    {
      key: "email",
      icon: Mail,
      title: t("info.emailTitle"),
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
      dir: undefined as "ltr" | undefined,
    },
  ].filter((row) => Boolean(row.value));

  return (
    <Section className="overflow-x-clip py-20 md:py-28">
      <div className="grid grid-cols-12 items-stretch gap-6 lg:gap-8">
        <Reveal className="col-span-12 lg:col-span-5">
          <aside className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/60 bg-gradient-to-br from-[#0d3b4d] via-[#0a2f3d] to-[#061018] p-7 text-white shadow-[0_20px_56px_rgba(13,59,77,0.28)] md:p-9 lg:p-10">
            <div className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -start-10 h-48 w-48 rounded-full bg-[#217695]/25 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-size:18px_18px] [background-image:radial-gradient(rgba(255,255,255,0.08)_1.2px,transparent_1.2px)]" />

            <div className="relative z-[1] mb-10 flex flex-col gap-3">
              <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-brand">
                {t("info.eyebrow")}
              </span>
              <h2 className="m-0 text-[1.9rem] font-bold leading-[1.2] md:text-[2.3rem] text-white">
                {t("info.title")}
              </h2>
              <p className="m-0 max-w-[420px] text-[0.98rem] leading-[1.75] text-white/75">
                {t("info.description")}
              </p>
            </div>

            <ul className="relative z-[1] mt-auto flex list-none flex-col gap-4">
              {rows.map((row) => {
                const Icon = row.icon;
                const inner = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white/55">
                        {row.title}
                      </p>
                      <p
                        className="m-0 text-[0.98rem] font-medium leading-[1.55] text-white"
                        dir={row.dir}
                      >
                        {row.value}
                      </p>
                    </div>
                  </>
                );

                const className =
                  "group flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:border-brand/40 hover:bg-white/10";

                return (
                  <li key={row.key}>
                    {row.href ? (
                      <a href={row.href} className={className}>
                        {inner}
                      </a>
                    ) : (
                      <div className={className}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </Reveal>

        <div className="col-span-12 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
