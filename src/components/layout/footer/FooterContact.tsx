/**
 * FooterContact — contact details column.
 */
import { Phone, Mail, MapPin, type LucideIcon } from "lucide-react";
import type { SiteData } from "@/types";

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

type FooterContactProps = {
  title: string;
  site: SiteData;
  address: string;
  faxLabel: string;
};

export default function FooterContact({
  title,
  site,
  address,
  faxLabel,
}: FooterContactProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="relative pb-3 text-[1.15rem] font-bold text-text-primary after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-10 after:bg-brand dark:text-white">
        {title}
      </h3>
      <ul className="flex list-none flex-col gap-4">
        <ContactRow icon={MapPin}>{address}</ContactRow>
        <ContactRow icon={Phone} dir="ltr">
          {site.contact.phone}
        </ContactRow>
        {site.contact.fax ? (
          <ContactRow icon={Phone} dir="ltr">
            {faxLabel}: {site.contact.fax}
          </ContactRow>
        ) : null}
        <ContactRow icon={Mail}>{site.contact.email}</ContactRow>
      </ul>
    </div>
  );
}
