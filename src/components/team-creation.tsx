"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  yupObject,
  yupString,
} from "@stackframe/stack-shared/dist/schema-fields";
import { useStackApp, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageLayout from "./layout/page-layout";
import { Section } from "./elements/section";
import { runAsynchronouslyWithAlert } from "@stackframe/stack-shared/dist/utils/promises";
import { Input } from "./ui/input";
import { FormWarningText } from "./elements/form-warning";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function TeamCreation() {
  const t = useTranslations("TeamCreation");

  const teamCreationSchema = yupObject({
    displayName: yupString().defined().nonEmpty(t("empty team name")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(teamCreationSchema),
  });
  const app = useStackApp();
  const project = app.useProject();
  const user = useUser({ or: "redirect" });
  const navigate = app.useNavigate();
  const [loading, setLoading] = useState(false);

  if (!project.config.clientTeamCreationEnabled) {
    return <MessageCard title={t("team creation disabled")} />;
  }

  const onSubmit = async (data: yup.InferType<typeof teamCreationSchema>) => {
    setLoading(true);

    let team;
    try {
      team = await user.createTeam({ displayName: data.displayName });
    } finally {
      setLoading(false);
    }

    navigate(`#team-${team.id}`);
  };

  return (
    <PageLayout title={t("title")}>
      <Section
        title={t("title")}
        description={t("Enter a display name for your new team")}
      >
        <form
          onSubmit={(e) =>
            runAsynchronouslyWithAlert(handleSubmit(onSubmit)(e))
          }
          noValidate
          className="flex gap-2 flex-col sm:flex-row"
        >
          <div className="flex flex-col flex-1">
            <Input id="displayName" type="text" {...register("displayName")} />
            <FormWarningText text={errors.displayName?.message?.toString()} />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ?? <Loader2 />}
            {t("Create")}
          </Button>
        </form>
      </Section>
    </PageLayout>
  );
}
