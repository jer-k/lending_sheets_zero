import { type Schema } from "@/lib/zero/schema";
import { escapeLike } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";

export type TeamLoansQueryItem = ReturnType<typeof teamLoansQuery>[number];

type LoansColumnNames = keyof Schema["tables"]["loans"]["columns"];

type FilterProps = {
	sort: LoansColumnNames;
	sortDir: "asc" | "desc";
	filter: string | undefined;
};

export function teamLoansQuery(
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

	let query = z.query.loans
		.whereExists("team", (q_team) =>
			q_team
				.where("public_id", publicTeamId)
				.whereExists("teams_users", (q_teams_users) =>
					q_teams_users.where("user_id", userId),
				),
		)
		.related("team", (q_team) => q_team.one())
		.related("client", (q_client) => q_client.one())
		.related("lender", (q_lender) => q_lender.one())
		.related("loan_purpose", (q_loan_purpose) => q_loan_purpose.one())
		.related("loan_type", (q_loan_type) => q_loan_type.one())
		.related("property_type", (q_property_type) => q_property_type.one())
		.orderBy(sort, sortDir);

	if (filter) {
		query = query.where(({ or, cmp }) =>
			or(cmp("name", "ILIKE", `%${escapeLike(filter)}%`)),
		);
	}

	return useQuery(query);
}
