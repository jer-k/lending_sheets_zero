"use client";

import * as React from "react";

import { NavLender } from "@/components/nav-lender";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import { User } from "@/lib/server-authentication";

type Props = {
	user: User;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: Props) {
	const user = props.user;
	const teams = user.teams;
	const teamId = teams[0].id;
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavLender teamId={teamId} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
