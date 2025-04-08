"use server";

import { stackServerApp } from "@/stack";

const ADMIN_TEAM_ID = process.env.ADMIN_TEAM_ID;
const PROFESSOR_TEAM_ID = process.env.PROFESSOR_TEAM_ID;
// const STUDENT_TEAM_ID = process.env.STUDENT_TEAM_ID;

export async function createUser(team_id: string, email: string) {
  const inviter = await stackServerApp.getUser({ or: "redirect" });
  const team = await stackServerApp.getTeam(team_id);
  if (!team) throw new Error("Team not found");
  const could_invite_member = await inviter.getPermission(
    team,
    "$invite_members",
  );
  if (!could_invite_member)
    throw new Error("You do not have permission to invite members");
  const user = await stackServerApp.createUser({
    primaryEmail: email,
    primaryEmailAuthEnabled: true,
    displayName: email,
    otpAuthEnabled: true,
    primaryEmailVerified: true,
    clientReadOnlyMetadata: {
      inviter: inviter.id,
    },
  });

  if (team.id === PROFESSOR_TEAM_ID || team.id === ADMIN_TEAM_ID) {
    // Allow professor/admin invite professor/admin
    user.grantPermission(team, "$invite_members");
  }
  return true;
}
