import { type Schema } from "@/lib/zero/schema";
import { useQuery, useZero } from "@rocicorp/zero/react";

export type LoanQueryItem = ReturnType<typeof loanQuery>;

export function loanQuery(
	publicTeamId: string,
	publicLoanId: string,
	userId: number,
) {
	const z = useZero<Schema>();

	const query = z.query.loans
		.whereExists("team", (q_team) =>
			q_team
				.where("public_id", publicTeamId)
				.whereExists("teams_users", (q_teams_users) =>
					q_teams_users.where("user_id", userId),
				),
		)
		.where("public_id", publicLoanId)
		.related("team", (q_team) => q_team.one())
		.related("client", (q_client) => q_client.one())
		.related("lender", (q_lender) => q_lender.one())
		.related("loan_purpose", (q_loan_purpose) => q_loan_purpose.one())
		.related("loan_type", (q_loan_type) => q_loan_type.one())
		.related("property_type", (q_property_type) => q_property_type.one())
		.one();

	const [loan] = useQuery(query);
	return loan;
}
