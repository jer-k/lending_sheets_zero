import { type Loan, Loans } from "@/components/loans";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Client = {
	id: string;
	first_name: string;
	last_name: string;
	email_address: string;
	avatar_url: string;
};

type Props = {
	client: Client;
	loans: Loan[];
};

export function Client({ client, loans }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Avatar className="h-8 w-8">
					<AvatarImage src={client.avatar_url} />
					<AvatarFallback>{client.first_name[0]}</AvatarFallback>
				</Avatar>
				<span>{`${client.first_name} ${client.last_name}`}</span>
			</div>
			<>
				<h2 className="text-lg">Loans</h2>
				<Loans loans={loans} />
			</>
		</div>
	);
}
