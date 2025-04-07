"use client";

import { type Team, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { Section } from "./elements/section";
import { ProfileImageEditor } from "./profile-image-editor";

export function TeamProfileImageSection({ team }: { team: Team }) {
  const t = useTranslations("TeamProfileImageSection");
  const user = useUser({ or: "redirect" });
  const updateTeamPermission = user.usePermission(team, "$update_team");

  if (!updateTeamPermission) {
    return null;
  }

  return (
    <Section
      title={t("Team profile image")}
      description={t("team profile image tips")}
    >
      <ProfileImageEditor
        user={team}
        onProfileImageUrlChange={async (profileImageUrl) => {
          await team.update({ profileImageUrl });
        }}
      />
    </Section>
  );
}
