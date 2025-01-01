import { useQueryState } from "nuqs";

export function useDataTableQueryState() {
	const [sort] = useQueryState("sort");
	const [sortDir] = useQueryState("sortDir");
	const [q] = useQueryState("q");

	const queryState = Object.fromEntries(
		Object.entries({
			sort,
			sortDir,
			filter: q,
		}).filter(([_, v]) => v != null),
	);

	return Object.entries(queryState).length > 0 ? queryState : null;
}
