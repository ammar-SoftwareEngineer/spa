import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import TeamIntroSection from "@/components/MeetOurTeam/TeamIntroSection";
import BoardSection from "@/components/MeetOurTeam/BoardSection";
import OurTeamSection from "@/components/MeetOurTeam/OurTeamSection";

export default async function MeetOurTeamPage() {
  const [t, tNav] = await Promise.all([
    getTranslations("team"),
    getTranslations("nav"),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("meetOurTeam")}
      />
      <TeamIntroSection />
      <BoardSection />
      <OurTeamSection />
    </>
  );
}
