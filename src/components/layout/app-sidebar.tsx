"use client";

import {
  CirclePlus,
  Contact,
  DivideIcon,
  Home,
  Icon,
  IdCard,
  Monitor,
  Settings,
  Sun,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton, useStackApp, useUser } from "@stackframe/stack";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TeamIcon } from "../team-icon";
import { Typography } from "@stackframe/stack-ui";
import { TeamPage } from "../team-page";
import { TeamCreation } from "../Team-creation";
import { Separator } from "../ui/separator";

type MenuItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  id: string;
  type?: "item" | "separator";
};

export default function AppSidebar() {
  const t = useTranslations("AccountSettings");
  const user = useUser({ or: "redirect" });
  const teams = user.useTeams();
  const stackApp = useStackApp();
  const project = stackApp.useProject();
  // Menu items.
  let items: MenuItem[] = [
    {
      title: "Home",
      url: "/",
      icon: <Home />,
      id: "home",
    },
    {
      title: t("My Profile"),
      url: "/dashboard/profile",
      icon: <Contact />,
      id: "profile",
    },
    {
      title: t("Active Sessions"),
      url: "/dashboard/active-sessions",
      icon: <Monitor />,
      id: "active-sessions",
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
      id: "settings",
    },
  ];

  if (teams.length > 0 || project.config.clientTeamCreationEnabled)
    items.push({
      title: t("Teams"),
      url: "/dashboard/team",
      type: "separator",
      id: "teams-separator",
    });
  items.push(
    ...teams.map((team) => ({
      title: team.displayName,
      icon: <TeamIcon team={team} />,
      id: `team-${team.id}`,
      url: `/dashboard/teams/${team.id}`,
    })),
  );
  if (project.config.clientTeamCreationEnabled)
    items.push({
      title: t("Create a team"),
      icon: <CirclePlus />,
      id: "team-creation",
      url: "/dashboard/teams/create",
    });

  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Application <UserButton />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  {item.type && item.type === "separator" ? (
                    <Separator />
                  ) : (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
