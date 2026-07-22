import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import WhoWeAre from "@/components/about/WhoWeAre";
import Services from "@/components/home/Services";
import Why from "@/components/home/Why";
import TeamBanner from "@/components/home/TeamBanner";
import Categories from "@/components/home/Categories";
import Partners from "@/components/home/Partners";
import Blogs from "@/components/home/Blogs";

export const dynamic = "force-dynamic";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <WhoWeAre />
      <Services />
      <Why />
      <TeamBanner />
      <Categories />
      <Partners />
      <Blogs />
    </>
  );
}
