import { type Schema } from "@/lib/zero/schema";
import { escapeLike } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";

export type TeamPropertiesQueryItem = ReturnType<
	typeof teamPropertiesQuery
>[number];

type PropertiesColumnNames = keyof Schema["tables"]["properties"]["columns"];

type FilterProps = {
	sort: PropertiesColumnNames;
	sortDir: "asc" | "desc";
	filter: string | undefined;
};

export function teamPropertiesQuery(
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

	const { sort, sortDir, filter } = { ...defaultFilters, ...(filters ?? {}) };

	const z = useZero<Schema>();

	let query = z.query.properties
		.whereExists("team", (q_team) =>
			q_team
				.where("public_id", publicTeamId)
				.whereExists("teams_users", (q_teams_users) =>
					q_teams_users.where("user_id", userId),
				),
		)
		.related("team", (q_team) => q_team.one())
		.related("city", (q_city) => q_city.one())
		.related("county", (q_county) => q_county.one())
		.related("state", (q_state) => q_state.one())
		.orderBy(sort, sortDir);

	if (filter) {
		query = query.where(({ or, cmp }) =>
			or(
				cmp("address", "ILIKE", `%${escapeLike(filter)}%`),
				cmp("postal_code", "ILIKE", `%${escapeLike(filter)}%`),
			),
		);
	}

	return useQuery(query);
}
