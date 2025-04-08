"use client";

import { useUser } from "@stackframe/stack";
import PageLayout from "./layout/page-layout";
import { TeamUserProfileSection } from "./team-user-profile-section";
import { MemberInvitationSection } from "./member-invitation-section";
import { TeamProfileImageSection } from "./team-profile-image-section";
import { TeamDisplayNameSection } from "./team-display-namesection";
import { LeaveTeamSection } from "./leave-team-section";
import { MemberListSection } from "./member-list-section";
import { DeleteTeamSection } from "./delete-team-section";

export function TeamPage({ id }: { id: string }) {
  const user = useUser({ or: "redirect" });
  const team = user.useTeam(id);
  return (
    team && (
      <PageLayout title={team.displayName}>
        <TeamUserProfileSection team={team} />
        <MemberListSection team={team} />
        <MemberInvitationSection team={team} />
        <TeamProfileImageSection team={team} />
        <TeamDisplayNameSection team={team} />
        <LeaveTeamSection team={team} />
        <DeleteTeamSection team={team} />
      </PageLayout>
    )
  );
}
