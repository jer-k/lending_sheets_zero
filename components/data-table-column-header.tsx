"use client";

import { useQueryState } from "nuqs";

import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	const [_sort, setSort] = useQueryState("sort");
	const [_sortDir, setSortDir] = useQueryState("sortDir");
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	switch (column.getIsSorted()) {
		case "asc": {
			return (
				<Button
					aria-label="Sorted ascending. Click to sort descending."
					className={cn("flex items-center gap-2 !px-0", className)}
					variant="blank"
					onClick={() => {
						setSort(column.id);
						setSortDir("desc");
						column.toggleSorting(true);
					}}
				>
					{title}
					<ArrowUp className="ml-2.5 size-4" aria-hidden="true" />
				</Button>
			);
		}
		case "desc": {
			return (
				<Button
					aria-label="Sorted descending. Click to remove sorting."
					className={cn("flex items-center gap-2 !px-0", className)}
					variant="blank"
					onClick={() => {
						setSort(null);
						setSortDir(null);
						column.clearSorting();
					}}
				>
					{title}
					<ArrowDown className="ml-2.5 size-4" aria-hidden="true" />
				</Button>
			);
		}
		default: {
			return (
				<Button
					aria-label="Not sorted. Click to sort ascending."
					className={cn("flex items-center gap-2 !px-0", className)}
					variant="blank"
					onClick={() => {
						setSort(column.id);
						setSortDir("asc");
						column.toggleSorting(false);
					}}
				>
					{title}
					<ChevronsUpDown className="ml-2.5 size-4" aria-hidden="true" />
				</Button>
			);
		}
	}
}
