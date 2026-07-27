import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import TeamIntroSection from "@/components/MeetOurTeam/TeamIntroSection";
import BoardSection from "@/components/MeetOurTeam/BoardSection";
import OurTeamSection from "@/components/MeetOurTeam/OurTeamSection";
import { getSiteData } from "@/lib/api/site";

export default async function MeetOurTeamPage() {
  const [t, tNav, site] = await Promise.all([
    getTranslations("team"),
    getTranslations("nav"),
    getSiteData(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("meetOurTeam")}
        backgroundImage={site.media.teamBannerImage}
        backgroundAlt={t("hero.title")}
      />
      <TeamIntroSection />
      <BoardSection />
      <OurTeamSection />
    </>
  );
}
