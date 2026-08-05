import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type ProjectVideoProps = {
  url: string;
  title: string;
  iframeTitle: string;
};

function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url, "https://example.com");

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (parsed.pathname.startsWith("/embed/")) return url;
      if (parsed.pathname.startsWith("/shorts/")) {
        const shortId = parsed.pathname.split("/")[2];
        return shortId ? `https://www.youtube.com/embed/${shortId}` : url;
      }
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
  } catch {
    return url;
  }

  return url;
}

export default function ProjectVideo({ url, title, iframeTitle }: ProjectVideoProps) {
  const embedUrl = toEmbedUrl(url);

  return (
    <section className="overflow-x-clip py-14 sm:py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="m-0 text-[1.55rem] leading-[1.25] text-text-primary sm:text-[2rem] md:text-[2.6rem]">
              {title}
            </h2>
            <div className="mt-4 h-px w-14 bg-brand/50 sm:mt-5 sm:w-16" aria-hidden />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="group relative overflow-hidden rounded-[22px] border border-border shadow-[0_20px_56px_rgba(13,59,77,0.14)] sm:rounded-[28px]">
            <div className="pointer-events-none absolute inset-3 z-[2] rounded-[18px] border border-white/0 transition-all duration-500 group-hover:border-white/15 sm:inset-4 sm:rounded-[22px]" />
            <div className="pointer-events-none absolute start-5 top-5 z-[2] h-8 w-8 border-s-2 border-t-2 border-brand/0 transition-all duration-500 group-hover:border-brand/80 sm:start-6 sm:top-6 sm:h-10 sm:w-10" />
            <div className="pointer-events-none absolute bottom-5 end-5 z-[2] h-8 w-8 border-e-2 border-b-2 border-white/0 transition-all duration-500 group-hover:border-white/50 sm:bottom-6 sm:end-6 sm:h-10 sm:w-10" />

            <div className="relative aspect-video w-full bg-[#061018]">
              <iframe
                title={iframeTitle}
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
