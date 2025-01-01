import { type Schema } from "@/lib/zero/schema";
import { escapeLike } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";

export type ClientsQueryItem = ReturnType<typeof clientsQuery>[number];

type ClientsColumnNames = keyof Schema["tables"]["clients"]["columns"];

type FilterProps = {
	sort: ClientsColumnNames;
	sortDir: "asc" | "desc";
	filter: string | undefined;
};

export function clientsQuery(
	publicTeamId: string,
	userId: number,
	filters: FilterProps | null | undefined = {
		sort: "created_at",
		sortDir: "desc",
		filter: undefined,
	},
) {
	const defaultFilters = {
		sort: "created_at",
		sortDir: "desc",
		filter: undefined,
	} as FilterProps;

	const { sort, sortDir, filter } = {
		...defaultFilters,
		...(filters ?? {}),
	};

	const z = useZero<Schema>();

	let query = z.query.clients
		.whereExists("team", (q_team) =>
			q_team
				.where("public_id", publicTeamId)
				.whereExists("teams_users", (q_teams_users) =>
					q_teams_users.where("user_id", userId),
				),
		)
		.related("team", (q_team) => q_team.one())
		.orderBy(sort, sortDir);

	if (filter) {
		query = query.where(({ or, cmp }) =>
			or(
				cmp("full_name", "ILIKE", `%${escapeLike(filter)}%`),
				cmp("email_address", "ILIKE", `%${escapeLike(filter)}%`),
				cmp("phone_number", "ILIKE", `%${escapeLike(filter)}%`),
			),
		);
	}

	return useQuery(query);
}
