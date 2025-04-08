"use client";

import { useUser, type Team } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Section } from "./elements/section";
import { runAsynchronouslyWithAlert } from "@stackframe/stack-shared/dist/utils/promises";
import {
  strictEmailSchema,
  yupObject,
} from "@stackframe/stack-shared/dist/schema-fields";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Typography } from "@stackframe/stack-ui";
import { Loader2, Trash } from "lucide-react";
import { FormWarningText } from "./elements/form-warning";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { createUser } from "@/lib/actions";

export function MemberInvitationSection({ team }: { team: Team }) {
  const user = useUser({ or: "redirect" });
  const inviteMemberPermission = user.usePermission(team, "$invite_members");

  if (!inviteMemberPermission) {
    return null;
  }

  return <MemberInvitationSectionInner team={team} />;
}

function MemberInvitationSectionInner({ team }: { team: Team }) {
  const user = useUser({ or: "redirect" });
  const t = useTranslations("MemberInvitationSectionInner");
  const readMemberPermission = user.usePermission(team, "$read_members");

  const invitationSchema = yupObject({
    email: strictEmailSchema(t("strictEmailSchema tips"))
      .defined()
      .nonEmpty(t("empty email tips")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(invitationSchema),
  });
  const [loading, setLoading] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState<string | null>(null);

  const onSubmit = async (data: yup.InferType<typeof invitationSchema>) => {
    setLoading(true);

    try {
      await createUser(team.id, data.email);
      await team.inviteUser({ email: data.email });
      setInvitedEmail(data.email);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInvitedEmail(null);
  }, [watch("email")]);

  return (
    <>
      <Section title={t("Invite member")} description={t("invite member tips")}>
        <form
          onSubmit={(e) =>
            runAsynchronouslyWithAlert(handleSubmit(onSubmit)(e))
          }
          noValidate
          className="w-full"
        >
          <div className="flex flex-col gap-4 sm:flex-row w-full">
            <Input placeholder={t("Email")} {...register("email")} />
            <Button type="submit" disabled={loading}>
              {loading ?? <Loader2 />} {t("Invite User")}
            </Button>
          </div>
          <FormWarningText text={errors.email?.message?.toString()} />
          {invitedEmail && (
            <Typography type="label" variant="secondary">
              {t("Invited")} {invitedEmail}
            </Typography>
          )}
        </form>
      </Section>
      {readMemberPermission && (
        <MemberInvitationsSectionInvitationsList team={team} />
      )}
    </>
  );
}

function MemberInvitationsSectionInvitationsList(props: { team: Team }) {
  const user = useUser({ or: "redirect" });
  const t = useTranslations("MemberInvitationsSectionInvitationsList");
  const invitationsToShow = props.team.useInvitations();
  const removeMemberPermission = user.usePermission(
    props.team,
    "$remove_members",
  );

  return (
    <>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              {t("Outstanding invitations")}
            </TableHead>
            <TableHead className="w-[60px]">{t("Expires")}</TableHead>
            <TableHead className="w-[36px] max-w-[36px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitationsToShow.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>
                <Typography>{invitation.recipientEmail}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="secondary">
                  {invitation.expiresAt.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right" className="max-w-[36px]">
                {removeMemberPermission && (
                  <Button
                    onClick={async () => await invitation.revoke()}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
