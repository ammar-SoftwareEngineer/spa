/**
 * FooterLinks — روابط سريعة في الفوتر
 */
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/types";

type FooterLinksProps = {
  title: string;
  links: NavItem[];
  label: (key: string) => string;
};

export default function FooterLinks({ title, links, label }: FooterLinksProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="relative pb-3 text-[1.15rem] font-bold text-text-primary after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-10 after:bg-brand dark:text-white">
        {title}
      </h3>
      <ul className="flex list-none flex-col gap-3">
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="inline-block opacity-80 transition-all duration-300 hover:translate-x-1 hover:text-brand hover:opacity-100 rtl:hover:-translate-x-1"
            >
              {label(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
