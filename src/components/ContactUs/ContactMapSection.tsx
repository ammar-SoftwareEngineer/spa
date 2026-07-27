import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";


export default async function ContactMapSection() {
  const t = await getTranslations("contact.map");

  return (
    <Section variant="alt" className="px-0">
 

      <Reveal>
        <div className="group relative overflow-hidden rounded-[28px] border border-border/60 shadow-[0_20px_56px_rgba(13,59,77,0.14)] md:rounded-[36px]">
          <div className="pointer-events-none absolute inset-4 z-[2] rounded-[22px] border border-white/0 transition-all duration-500 group-hover:border-white/20 md:inset-5 md:rounded-[26px]" />
          <div className="pointer-events-none absolute start-8 top-8 z-[2] h-10 w-10 border-s-2 border-t-2 border-brand/0 transition-all duration-500 group-hover:border-brand/80" />
          <div className="pointer-events-none absolute bottom-8 end-8 z-[2] h-10 w-10 border-e-2 border-b-2 border-white/0 transition-all duration-500 group-hover:border-brand/60" />

          <div className="relative h-[360px] w-full sm:h-[420px] md:h-[500px] lg:h-[560px]">
            <iframe
              title={t("title")}
              src="https://maps.google.com/maps?q=136%20Othman%20Ibn%20Afan%20St.%20Heliopolis%20Cairo%20Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%] transition-[filter] duration-700 group-hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
