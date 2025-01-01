import dayjs from "dayjs";

type LoanData = {
	date: string;
	principal: number;
	interest: number;
	total: number;
};

type PayoffData = {
	date: string;
	standardBalance: number;
	newBalance: number;
};

export function principleInterestChartData(
	loanAmount: number,
	annualInterestRate: number,
	loanTermYears: number,
	startDate: dayjs.Dayjs,
): LoanData[] {
	const monthlyInterestRate = annualInterestRate / 12 / 100;
	const numberOfPayments = loanTermYears * 12;
	const monthlyPayment =
		(loanAmount *
			monthlyInterestRate *
			Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
		(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

	let remainingBalance = loanAmount;
	const data: LoanData[] = [];

	for (let i = 0; i < numberOfPayments; i++) {
		const interestPayment = remainingBalance * monthlyInterestRate;
		const principalPayment = monthlyPayment - interestPayment;
		remainingBalance -= principalPayment;

		data.push({
			date: startDate.add(i, "month").format("YYYY-MM-DD"),
			principal: Number(principalPayment.toFixed(2)),
			interest: Number(interestPayment.toFixed(2)),
			total: Number(monthlyPayment.toFixed(2)),
		});
	}

	return data;
}

export function calculateLoanPayoffChartData(
	loanAmount: number,
	annualInterestRate: number,
	loanTerm: number,
	startDate: dayjs.Dayjs,
	additionalPayment: number,
): PayoffData[] {
	const monthlyInterestRate = annualInterestRate / 12 / 100;
	const numberOfPayments = loanTerm * 12;
	const monthlyPayment =
		(loanAmount *
			monthlyInterestRate *
			Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
		(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

	let standardBalance = loanAmount;
	let newBalance = loanAmount;
	const data: PayoffData[] = [];

	for (let i = 0; i < numberOfPayments; i++) {
		const standardInterest = standardBalance * monthlyInterestRate;
		const standardPrincipal = monthlyPayment - standardInterest;
		standardBalance -= standardPrincipal;

		const newInterest = newBalance * monthlyInterestRate;
		const newPrincipal = monthlyPayment + additionalPayment - newInterest;
		newBalance -= newPrincipal;

		if (newBalance < 0) newBalance = 0;

		data.push({
			date: startDate.add(i, "month").format("YYYY-MM-DD"),
			standardBalance: Number(standardBalance.toFixed(2)),
			newBalance: Number(newBalance.toFixed(2)),
		});
	}

	return data;
}
