import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { apiClient } from "@/lib/client-api-client";

export function Logout() {
	const router = useRouter();

	const logoutFn = useMutation({
		mutationFn: async () => {
			return apiClient.delete("/session");
		},
		onSuccess: () => {
			router.push("/login");
		},
	});

	return (
		<DropdownMenuItem asChild>
			<Button
				className="cursor-pointer justify-start w-full"
				variant="ghost"
				onClick={() => logoutFn.mutate()}
			>
				<LogOut />
				Log out
			</Button>
		</DropdownMenuItem>
	);
}
