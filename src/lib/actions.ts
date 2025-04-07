"use server";

import { stackServerApp } from "@/stack";

export async function createUser(team_id: string, email: string) {
  "use server";

  const inviter = await stackServerApp.getUser({ or: "redirect" });
  const team = await stackServerApp.getTeam(team_id);
  if (!team) throw new Error("Team not found");
  const could_invite_member = await inviter.getPermission(
    team,
    "$invite_members",
  );
  if (!could_invite_member)
    throw new Error("You do not have permission to invite members");
  await stackServerApp.createUser({
    primaryEmail: email,
    primaryEmailAuthEnabled: true,
    displayName: email,
    otpAuthEnabled: true,
    primaryEmailVerified: true,
    clientReadOnlyMetadata: {
      inviter: inviter.id,
    },
  });
  return true;
}
