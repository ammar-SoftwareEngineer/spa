import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
  href?: string;
  type?: "button" | "submit";
  rtl?: boolean;
  disabled?: boolean;
};

export function Button({
  children,
  className = "",
  size = "default",
  href,
  type = "button",
  rtl = false,
  disabled = false,
}: ButtonProps) {
  const classes = `btn-skew ${size === "lg" ? "btn-skew-lg" : ""} ${className}`.trim();
  const Arrow = rtl ? ArrowLeft : ArrowRight;

  const content = (
    <span>
      {children}
      <Arrow size={16} />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {content}
    </button>
  );
}
