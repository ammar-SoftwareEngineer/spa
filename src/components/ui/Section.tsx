/**
 * Section — page section with optional background and inner Container.
 */
import Container from "@/components/ui/Container";

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
      className={`relative z-[1] ${variantClass[variant]} ${className}`.trim()}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
