import { type ClientTeam, getTeams } from "@/lib/actions";
import { useUser } from "@stackframe/stack";
import { atom, computed, task } from "nanostores";

export const $teams = atom<ClientTeam[]>([]);
export const $current_team = atom<string | null>(null);
export const $hasDeleteTeamPermision = computed($current_team, (current_team) =>
  task(async () => {
    if (current_team === null) return false;
    const user = useUser({ or: "redirect" });
    const team = user.useTeam(current_team);
    if (team === null) return false;
    const hasPermission = await user.hasPermission(team, "$delete_team");
    return hasPermission;
  }),
);

export async function updateTeams() {
  const response = await getTeams();
  $teams.set(response);
}
