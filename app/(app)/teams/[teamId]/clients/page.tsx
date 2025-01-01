"use client";

import { use } from "react";

import { Clients } from "@/components/clients";

import { useDataTableQueryState } from "@/hooks/use-data-table-query-state";
import { UserContext } from "@/providers/user-provider";
import { clientsQuery } from "@/queries/clients";

type Props = {
	params: Promise<{ teamId: string }>;
};

export default function ClientsPage(props: Props) {
	console.log("re-rendering clients page");

	const user = use(UserContext);
	const params = use(props.params);
	const publicTeamId = params.teamId;

	const filterOptions = useDataTableQueryState();

	//console.log("u, p, tId, fo", user, params, publicTeamId, filterOptions);

	const [clients, result] = clientsQuery(publicTeamId, user.id, filterOptions);

	console.log("clients count", clients.length, result);

	return <Clients clients={clients} />;
}
