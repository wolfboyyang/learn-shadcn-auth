"use client";

import { type Team, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Section } from "./elements/section";
import { Button } from "./ui/button";
import { Typography } from "@stackframe/stack-ui";

export function LeaveTeamSection({ team }: { team: Team }) {
  const t = useTranslations("LeaveTeamSection");
  const user = useUser({ or: "redirect" });
  const [leaving, setLeaving] = useState(false);

  return (
    <Section title={t("Leave Team")} description={t("leave team tips")}>
      {!leaving ? (
        <div>
          <Button variant="secondary" onClick={() => setLeaving(true)}>
            {t("Leave team")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Typography variant="destructive">
            {t("confirm leave team")}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={async () => {
                await user.leaveTeam(team);
                window.location.reload();
              }}
            >
              {t("Leave")}
            </Button>
            <Button variant="secondary" onClick={() => setLeaving(false)}>
              {t("Cancel")}
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
