import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function Logout() {
	return (
		<DropdownMenuItem asChild>
			<Button className="cursor-pointer justify-start w-full" variant="ghost">
				<LogOut />
				Log out
			</Button>
		</DropdownMenuItem>
	);
}
