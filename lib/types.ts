export type LoanType =
	| "Conventional Conforming"
	| "FHA Conforming"
	| "FHA High Balance"
	| "Conventional High Balance"
	| "High Balance with TCF"
	| "Jumbo"
	| "Jumbo with TCF"
	| "VA Conforming"
	| "VA High Balance";

export type PropertyType =
	| "Single Family Residence"
	| "Duplex"
	| "Triplex"
	| "Quadplex"
	| "Townhouse"
	| "Condo - Warrantable"
	| "Condo - Non-warrantable";

export type LoanPurpose =
	| "Purchase Primary"
	| "Purchase Secondary"
	| "Purchase Investment"
	| "Refinance Primary"
	| "Refinance Secondary"
	| "Refinance Investment";

export type Borrower = {
	id: number;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
};
