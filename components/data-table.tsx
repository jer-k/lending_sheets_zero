"use client";

import { type ReactElement, useRef } from "react";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { DataTableSearch } from "@/components/data-table-search";

import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableWithoutWrapper,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	actions?: ReactElement[];
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	rowHeight: number;
	title?: string;
}

export function DataTable<TData, TValue>({
	actions,
	columns,
	data,
	rowHeight,
	title,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const { rows } = table.getRowModel();

	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan: 20,
	});

	const virtualRows = virtualizer.getVirtualItems();

	return (
		<div className="space-y-2 mb-2">
			{title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
			<div className="flex flex-row gap-2 w-full justify-between">
				<DataTableSearch />
				{actions}
			</div>
			<div
				ref={parentRef}
				className="container rounded-md border"
				style={{ height: "90vh", overflow: "auto" }}
			>
				<div style={{ height: `${virtualizer.getTotalSize()}px` }}>
					<TableWithoutWrapper>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{virtualRows.length ? (
								virtualRows.map((virtualRow, index) => {
									const row = rows[virtualRow.index];
									return (
										<TableRow
											key={row.id}
											style={{
												height: `${virtualRow.size}px`,
												transform: `translateY(${
													virtualRow.start - index * virtualRow.size
												}px)`,
											}}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</TableWithoutWrapper>
				</div>
			</div>
		</div>
	);
}
