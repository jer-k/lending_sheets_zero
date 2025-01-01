import Link from "next/link";

import { type LucideIcon } from "lucide-react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

type Item = {
	title: string;
	url: string;
	icon: LucideIcon;
};

type Props = {
	item: Item;
};

export function NavItem({ item }: Props) {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild>
				<Link href={item.url}>
					<item.icon />
					<span>{item.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
