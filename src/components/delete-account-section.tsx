"use client";

import { useStackApp, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Section } from "./elements/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Typography } from "@stackframe/stack-ui";
import { useRouter } from "next/navigation";

export function DeleteAccountSection() {
  const app = useStackApp();
  const project = app.useProject();
  const t = useTranslations("DeleteAccountSection");
  const [deleting, setDeleting] = useState(false);
  const user = useUser({ or: "redirect" });
  const router = useRouter();

  if (!project.config.clientUserDeletionEnabled) {
    return null;
  }

  return (
    <Section title={t("Delete Account")} description={t("delete account tips")}>
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
                    {t("Delete account")}
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
                        await user.delete();
                        router.push("/dashboard");
                      }}
                    >
                      {t("Delete Account")}
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
