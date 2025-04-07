"use client";

import { useUser, type Team } from "@stackframe/stack";
import { Typography } from "@stackframe/stack-ui";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { UserAvatar } from "./elements/user-avatar";

export function MemberListSection(props: { team: Team }) {
  const user = useUser({ or: "redirect" });
  const readMemberPermission = user.usePermission(props.team, "$read_members");
  const inviteMemberPermission = user.usePermission(
    props.team,
    "$invite_members",
  );

  if (!readMemberPermission && !inviteMemberPermission) {
    return null;
  }

  return <MemberListSectionInner team={props.team} />;
}

function MemberListSectionInner(props: { team: Team }) {
  const t = useTranslations("MemberListSectionInner");
  const users = props.team.useUsers();

  return (
    <div>
      <Typography className="font-medium mb-2">{t("Members")}</Typography>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t("User")}</TableHead>
              <TableHead className="w-[200px]">{t("Name")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(({ id, teamProfile }) => (
              <TableRow key={id}>
                <TableCell>
                  <UserAvatar user={teamProfile} />
                </TableCell>
                <TableCell>
                  <Typography>{teamProfile.displayName}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
