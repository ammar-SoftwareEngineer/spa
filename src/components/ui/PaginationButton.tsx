import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type PaginationButtonProps = {
  href: string;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
};

const baseClassName =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border bg-bg-primary px-3 text-sm font-medium tabular-nums text-text-primary shadow-[var(--card-shadow)] transition-[border-color,color,background-color,transform] duration-300 hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const activeClassName =
  "border-brand bg-brand text-white shadow-[0_10px_28px_rgba(33,118,149,0.28)] hover:border-brand hover:text-white";

export default function PaginationButton({
  href,
  label,
  isActive = false,
  isDisabled = false,
  className = "",
  children,
}: PaginationButtonProps) {
  const classes = `${baseClassName} ${isActive ? activeClassName : ""} ${
    isDisabled ? "pointer-events-none opacity-40" : ""
  } ${className}`.trim();

  if (isDisabled) {
    return (
      <span className={classes} aria-hidden>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={classes}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
