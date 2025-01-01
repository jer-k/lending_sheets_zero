import { ReactNode } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ClientLayout } from "@/components/client-layout";

type Props = {
	breadcrumbs: ReactNode;
	children: ReactNode;
};
export default async function AppLayout({ children }: Props) {
	return (
		<NuqsAdapter>
			<ClientLayout children={children} />
		</NuqsAdapter>
	);
}
