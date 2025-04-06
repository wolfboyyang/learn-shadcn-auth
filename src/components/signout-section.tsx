"use client";

import { useTranslations } from "next-intl";
import { Section } from "./elements/section";
import { Button } from "./ui/button";
import { useUser } from "@stackframe/stack";

export function SignOutSection() {
  const t = useTranslations("SignOutSection");
  const user = useUser({ or: "throw" });

  return (
    <Section title={t("Sign out")} description={t("signout tips")}>
      <div>
        <Button variant="secondary" onClick={() => user.signOut()}>
          {t("Sign out")}
        </Button>
      </div>
    </Section>
  );
}
