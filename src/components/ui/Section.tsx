type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  variant?: "base" | "alt";
  containerClassName?: string;
};

const variantClass = {
  base: "section-base",
  alt: "section-alt",
} as const;

export default function Section({
  id,
  variant = "base",
  className = "",
  containerClassName = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative z-[1] px-4 md:px-6 ${variantClass[variant]} ${className}`.trim()}
      {...props}
    >
      <div className={`container mx-auto w-full md:px-10 lg:px-20 ${containerClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
}
