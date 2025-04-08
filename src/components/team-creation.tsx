"use client";

import { createTeam } from "@/lib/actions";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  yupObject,
  yupString,
} from "@stackframe/stack-shared/dist/schema-fields";
import { runAsynchronouslyWithAlert } from "@stackframe/stack-shared/dist/utils/promises";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormWarningText } from "./elements/form-warning";
import { Section } from "./elements/section";
import PageLayout from "./layout/page-layout";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: yup.InferType<typeof teamCreationSchema>) => {
    setLoading(true);

    try {
      const team_id = await createTeam(data.displayName);
      const url = `/dashboard/teams/${team_id}`;
      router.prefetch(url);
      router.push(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title={t("title")}>
      <Section title={t("title")} description={t("create team tips")}>
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
