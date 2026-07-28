import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import TeamMemberCard from "@/components/MeetOurTeam/TeamMemberCard";
import { getBoardMembers } from "@/lib/api/team";

export default async function BoardSection() {
  const [board, t] = await Promise.all([
    getBoardMembers(),
    getTranslations("team"),
  ]);

  return (
    <Section variant="alt" className="overflow-x-clip py-24 md:py-32">
      <HeaderSection
        subtitle={t("board.eyebrow")}
        title={t("board.title")}
        description={t("board.description")}
        className="mb-12 md:mb-16"
      />

      <div className="grid grid-cols-12 gap-6 md:gap-7">
        {board.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            name={t(member.nameKey)}
            role={t(member.roleKey)}
            index={index}
            delay={index * 0.08}
            variant="board"
          />
        ))}
      </div>
    </Section>
  );
}
