"use client";

import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";

import { schema } from "@/lib/zero/schema";
import { PropsWithChildren } from "react";

export default function ZeroClientProvider({ children }: PropsWithChildren) {
	const z = new Zero({
		userID: "1",
		server: process.env.NEXT_PUBLIC_ZERO_CACHE_PUBLIC_SERVER,
		schema,
		kvStore: "mem", // or "idb" for IndexedDB persistence
	});

	return <ZeroProvider zero={z}>{children}</ZeroProvider>;
}
