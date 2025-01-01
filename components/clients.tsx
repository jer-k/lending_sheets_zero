"use client";

import dayjs from "dayjs";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { type ClientsQueryItem } from "@/queries/clients";

const columns: ColumnDef<ClientsQueryItem>[] = [
	{
		accessorFn: (row) => ({
			id: row.id,
			avatar_url: row.avatar_url,
			full_name: row.full_name,
		}),
		id: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Client Name" />
		),
		cell: ({ row }) => {
			const value = row.original;
			return (
				<Link
					className="text-blue-500"
					href={`/teams/${value.team.public_id}/clients/${value.id}`}
				>
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage src={value.avatar_url || undefined} />
							<AvatarFallback>{value.first_name[0]}</AvatarFallback>
						</Avatar>
						<span>{value.full_name}</span>
					</div>
				</Link>
			);
		},
	},
	{
		accessorFn: (row) => ({ email_address: row.email_address }),
		id: "email_address",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email Address" />
		),
		cell: ({ row }) => row.original.email_address,
	},
	{
		accessorFn: (row) => ({ phone_number: row.phone_number }),
		id: "phone_number",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Phone Number" />
		),
		cell: ({ row }) => row.original.phone_number,
	},
	{
		accessorFn: (row) => ({ created_at: row.created_at }),
		id: "created_at",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Client Created" />
		),
		cell: ({ row }) => dayjs(row.original.created_at).format("YYYY-MM-DD"),
	},
];

type Props = {
	clients: readonly ClientsQueryItem[];
};

export function Clients({ clients }: Props) {
	return <DataTable columns={columns} data={clients} rowHeight={65} />;
}
