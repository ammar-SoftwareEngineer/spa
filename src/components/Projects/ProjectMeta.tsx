/**
 * ProjectMeta — project meta grid (client, location, consultant, status).
 */
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type MetaItem = {
  label: string;
  value: string;
};

type ProjectMetaProps = {
  items: MetaItem[];
};

export default function ProjectMeta({ items }: ProjectMetaProps) {
  return (
    <div className="relative z-[3] -mt-10 sm:-mt-14 md:-mt-20">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-1 overflow-hidden rounded-[20px] border border-border/70 bg-bg-primary shadow-[0_20px_48px_rgba(13,59,77,0.16)] sm:grid-cols-2 sm:rounded-[24px] lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={item.label}
                className={[
                  "px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-8",
                  index < items.length - 1 ? "border-b border-border/70" : "",
                  "sm:[&:nth-child(odd)]:border-e sm:[&:nth-child(1)]:border-b sm:[&:nth-child(2)]:border-b lg:border-b-0 lg:border-e lg:[&:last-child]:border-e-0",
                ].join(" ")}
              >
                <dt className="m-0 mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand sm:mb-2 sm:text-[0.7rem]">
                  {item.label}
                </dt>
                <dd className="m-0 break-words text-[0.95rem] font-semibold leading-[1.45] text-text-primary sm:text-[1.02rem]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </div>
  );
}
