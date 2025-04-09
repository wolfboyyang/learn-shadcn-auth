"use client";

import { CirclePlus, Contact, Home, Monitor, Settings } from "lucide-react";

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
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { hasCreateTeamPermission } from "@/lib/actions";
import { useStore } from "@nanostores/react";
import { $teams, updateTeams } from "@/store/auth";

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

  const stackApp = useStackApp();
  const project = stackApp.useProject();

  const teams = useStore($teams);

  const [createTeamEnabled, setCreateTeamEnabled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateTeams();
        const result = await hasCreateTeamPermission();
        setCreateTeamEnabled(result);
      } catch (error) {
        console.error("Error checking create team permission:", error);
      }
    };

    fetchData();
  }, [user]);
  // Menu items.
  const items: MenuItem[] = [
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

  if (createTeamEnabled)
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
