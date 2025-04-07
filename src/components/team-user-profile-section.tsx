"use client";

import { useUser, type Team } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { Section } from "./elements/section";
import { EditableText } from "./elements/editable-text";

export function TeamUserProfileSection({ team }: { team: Team }) {
  const t = useTranslations("TeamUserProfileSection");
  const user = useUser({ or: "redirect" });
  const profile = user.useTeamProfile(team);

  return (
    <Section title={t("Team user name")} description={t("team user name tips")}>
      <EditableText
        value={profile.displayName || ""}
        onSave={async (newDisplayName) => {
          await profile.update({ displayName: newDisplayName });
        }}
      />
    </Section>
  );
}
