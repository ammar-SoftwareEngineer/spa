/**
 * FooterBrand — logo, about text, and social links.
 */
import Image from "next/image";
import type { SiteData } from "@/types";

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (name === "Linkedin") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (name === "Twitter") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

type FooterBrandProps = {
  site: SiteData;
  about: string;
};

export default function FooterBrand({ site, about }: FooterBrandProps) {
  return (
    <div className="flex flex-col gap-5">
      <Image
        src={site.branding.logo}
        alt={`${site.branding.name} Logo`}
        width={110}
        height={45}
        className="h-[45px] w-auto self-start"
      />
      <p className="text-[0.9rem] leading-relaxed opacity-85">{about}</p>
      <div className="mt-2 flex gap-3">
        {site.social.map((social) => (
          <a
            key={social.name}
            href={social.href}
            aria-label={social.name}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white dark:border-white/10 dark:text-slate-100"
          >
            <SocialIcon name={social.name} />
          </a>
        ))}
      </div>
    </div>
  );
}
