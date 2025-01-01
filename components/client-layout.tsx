"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import ZeroClientProvider from "@/providers/zero-client-provider";

import { UserProvider } from "@/providers/user-provider";

type Props = {
	children: ReactNode;
};

export function ClientLayout({ children }: Props) {
	const queryClient = new QueryClient();

	const user = {
		id: 1,
		public_id: "1",
		first_name: "Test",
		last_name: "Zero",
		email_address: "testing@zero.com",
		teams: [
			{
				id: "1",
				name: "Testing Team",
			},
		],
	};

	return (
		<QueryClientProvider client={queryClient}>
			<ZeroClientProvider>
				<UserProvider initialUser={user}>
					<SidebarProvider>
						<AppSidebar user={user} />
						<SidebarInset>
							<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
								<div className="flex items-center gap-2 px-4">
									<SidebarTrigger className="-ml-1" />
									<Separator orientation="vertical" className="mr-2 h-4" />
								</div>
							</header>
							<div className="px-4">{children}</div>
						</SidebarInset>
					</SidebarProvider>
				</UserProvider>
				<Toaster />
			</ZeroClientProvider>
		</QueryClientProvider>
	);
}
