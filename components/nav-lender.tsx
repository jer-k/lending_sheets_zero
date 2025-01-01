"use client";

import { type LucideIcon, Users } from "lucide-react";

import { NavItem } from "@/components/nav-item";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";

type NavItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
};

function teamNavItems(teamId: string): NavItem[] {
	return [
		{
			title: "Messages",
			url: `/messages`,
			icon: Users,
		},
		{
			title: "Other Page",
			url: "/other",
			icon: Users,
		},
	];
}

type Props = {
	teamId: string;
};

export function NavLender({ teamId }: Props) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{teamNavItems(teamId).map((item) => {
					return item.items && item.items.length > 0 ? (
						// This is janky, why does Typescript have to recreate the object to understand that
						// item.items is present
						<CollapsibleNavItem
							key={item.title}
							item={{ ...item, items: item.items }}
						/>
					) : (
						<NavItem key={item.title} item={item} />
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
