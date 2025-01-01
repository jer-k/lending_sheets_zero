import { cookies } from "next/headers";

import { createServerApiClient } from "@/lib/server-api-client";

export type Team = {
	id: string;
	name: string;
	avatar_url?: string;
};

export type User = {
	id: number;
	public_id: string;
	first_name: string;
	last_name: string;
	email_address: string;
	avatar_url?: string;
	teams: Team[];
};

export async function getUser(): Promise<User> {
	const cookieStore = await cookies();
	// We could possibly just grab and set session_id because that is all that is needed
	// but maybe another time
	const allCookies = cookieStore
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join("; ");
	const apiClient = createServerApiClient(allCookies);
	const response = await apiClient.get("/current_user");
	return response.data as User;
}
