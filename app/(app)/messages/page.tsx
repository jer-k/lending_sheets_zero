"use client";

import { use } from "react";

import { Messages } from "@/components/messages";

import { useDataTableQueryState } from "@/hooks/use-data-table-query-state";
import { messagesQuery } from "@/queries/messages";

export default function MessagesPage() {
	console.log("re-rendering messages page");

	const filterOptions = useDataTableQueryState();

	const [messages, result] = messagesQuery(filterOptions);

	console.log("messages count", messages.length, result);

	return <Messages messages={messages} />;
}
