/**
 * NavLink — internal page link, or file download when item.download is true.
 */
import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/types";

type NavLinkProps = {
  item: Pick<NavItem, "href" | "download">;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function NavLink({ item, className, onClick, children }: NavLinkProps) {
  if (item.download) {
    return (
      <a href={item.href} download className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
