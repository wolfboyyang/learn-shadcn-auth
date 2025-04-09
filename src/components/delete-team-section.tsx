"use client";

import { Team, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "./elements/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Typography } from "@stackframe/stack-ui";
import { deleteTeam } from "@/lib/actions";
import { $current_team, updateTeams } from "@/store/auth";
import { useStore } from "@nanostores/react";

export function DeleteTeamSection({ team }: { team: Team }) {
  const t = useTranslations("DeleteTeamSection");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const hasPermission = useStore($current_team);

  if (!hasPermission) {
    return null;
  }

  return (
    <Section title={t("Delete Team")} description={t("delete team tips")}>
      <div className="stack-scope flex flex-col items-stretch">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("Danger zone")}</AccordionTrigger>
            <AccordionContent>
              {!deleting ? (
                <div>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleting(true)}
                  >
                    {t("Delete team")}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Typography variant="destructive">
                    {t("confirm tips")}
                  </Typography>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        await deleteTeam(team.id);
                        await updateTeams();
                        router.push("/dashboard");
                        router.refresh();
                      }}
                    >
                      {t("Delete Team")}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setDeleting(false)}
                    >
                      {t("Cancel")}
                    </Button>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  );
}
