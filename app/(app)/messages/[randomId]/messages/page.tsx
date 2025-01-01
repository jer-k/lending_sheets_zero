"use client";

import { use } from "react";

import { Messages } from "@/components/messages";

import { useDataTableQueryState } from "@/hooks/use-data-table-query-state";
import { UserContext } from "@/providers/user-provider";
import { messagesQuery } from "@/queries/messages";

type Props = {
	params: Promise<{ randomId: string }>;
};

export default function MessagesPage(props: Props) {
	console.log("re-rendering messages page");

	const user = use(UserContext);
	const params = use(props.params);
	const randomId = params.randomId;

	const filterOptions = useDataTableQueryState();

	const [messages, result] = messagesQuery(filterOptions);

	console.log("messages count", messages.length, result);

	return <Messages messages={messages} />;
}
