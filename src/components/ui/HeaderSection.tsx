import Reveal from "@/components/ui/Reveal";

type HeaderSectionProps = {
  subtitle: string;
  title: React.ReactNode;
  description?: string;
  /** start = left-aligned with optional action button */
  align?: "center" | "start";
  className?: string;
  action?: React.ReactNode;
};

export default function HeaderSection({
  subtitle,
  title,
  description,
  align = "center",
  className = "",
  action,
}: HeaderSectionProps) {
  const withAction = Boolean(action);
  const centered = align === "center" && !withAction;

  return (
    <Reveal
      className={[
        "mb-12 flex gap-8 md:mb-16",
        withAction ? "flex-col items-start justify-between md:flex-row md:items-end" : "flex-col",
        centered ? "mx-auto max-w-[720px] items-center text-center" : "items-start",
        className,
      ].join(" ")}
    >
      <div className={`flex flex-col gap-3 ${centered ? "items-center" : "items-start"}`}>
        <span className="text-[0.85rem] font-bold uppercase tracking-[0.1em] text-brand">
          {subtitle}
        </span>
        <h2 className="m-0 text-[2.2rem] font-bold leading-[1.15] text-text-primary md:text-[3rem]">
          {title}
        </h2>
        {description ? (
          <p
            className={`text-base leading-[1.6] text-text-secondary ${
              centered ? "max-w-[600px]" : ""
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </Reveal>
  );
}
