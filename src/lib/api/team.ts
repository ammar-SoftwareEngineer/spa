import teamData from "@/lib/data/team.json";
import type { TeamMember } from "@/types";

type TeamData = {
  board: TeamMember[];
  team: TeamMember[];
};

const data = teamData as TeamData;

export async function getBoardMembers(): Promise<TeamMember[]> {
  return data.board;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return data.team;
}
