"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import { type Team } from "@/lib/server-authentication";

type Props = {
	teams: Team[];
};

export function TeamSwitcher({ teams }: Props) {
	const { isMobile } = useSidebar();
	const [activeTeam, setActiveTeam] = React.useState(teams[0]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
								<Avatar className="h-8 w-8">
									<AvatarImage src={activeTeam.avatar_url} />
									<AvatarFallback>{activeTeam.name[0]}</AvatarFallback>
								</Avatar>
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{activeTeam.name}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Teams
						</DropdownMenuLabel>
						{teams.map((team, index) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => {
									setActiveTeam(team);
									localStorage.setItem("activeTeamId", team.id);
								}}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm border">
									<Avatar className="h-8 w-8">
										<AvatarImage src={activeTeam.avatar_url} />
										<AvatarFallback>{activeTeam.name[0]}</AvatarFallback>
									</Avatar>
								</div>
								{team.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
