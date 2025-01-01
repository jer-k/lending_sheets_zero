import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const columns: ColumnDef<User>[] = [
	{
		accessorFn: (row) => ({
			id: row.id,
			avatarUrl: row.avatar_url,
			firstName: row.first_name,
			lastName: row.last_name,
		}),
		id: "name",
		header: "Name",
		cell: ({ row }) => {
			const value = row.original;
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={value.avatar_url} />
						<AvatarFallback>{value.first_name[0]}</AvatarFallback>
					</Avatar>
					<span>{`${value.first_name} ${value.last_name}`}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "email_address",
		header: "Email Address",
		cell: (row) => row.getValue(),
	},
];

type User = {
	id: string;
	first_name: string;
	last_name: string;
	email_address: string;
	avatar_url: string;
};

type Props = {
	users: User[];
};

export function TeamMembers({ users }: Props) {
	return (
		<div className="rounded-md border">
			<DataTable columns={columns} data={users} />
		</div>
	);
}
