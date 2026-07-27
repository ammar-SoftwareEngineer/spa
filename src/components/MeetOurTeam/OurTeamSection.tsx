import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import TeamMemberCard from "@/components/MeetOurTeam/TeamMemberCard";
import { getTeamMembers } from "@/lib/api/team";

export default async function OurTeamSection() {
  const [team, t] = await Promise.all([
    getTeamMembers(),
    getTranslations("team"),
  ]);

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={t("ourTeam.eyebrow")}
        title={t("ourTeam.title")}
        description={t("ourTeam.description")}
        className="mb-12 md:mb-16"
      />

      <div className="grid grid-cols-12 gap-6 md:gap-7">
        {team.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            name={t(member.nameKey)}
            role={t(member.roleKey)}
            index={index}
            delay={index * 0.06}
          />
        ))}
      </div>
    </Section>
  );
}
