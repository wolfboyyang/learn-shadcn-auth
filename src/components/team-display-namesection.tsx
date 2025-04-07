"use client";

import { type Team, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { Section } from "./elements/section";
import { EditableText } from "./elements/editable-text";

export function TeamDisplayNameSection({ team }: { team: Team }) {
  const t = useTranslations("TeamDisplayNameSection");
  const user = useUser({ or: "redirect" });
  const updateTeamPermission = user.usePermission(team, "$update_team");

  if (!updateTeamPermission) {
    return null;
  }

  return (
    <Section
      title={t("Team display name")}
      description={t("team display name tips")}
    >
      <EditableText
        value={team.displayName}
        onSave={async (newDisplayName) =>
          await team.update({ displayName: newDisplayName })
        }
      />
    </Section>
  );
}
