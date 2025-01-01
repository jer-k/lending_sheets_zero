export type MonthlyAmortizationRow = {
	payment: number;
	date: string;
	paymentAmount: number;
	interestPaid: number;
	principalPaid: number;
	additionalPrincipalPayment: number;
	newPrincipalBalance: number;
};

export type YearlyAmortizationRow = {
	year: number;
	interest: number;
	principal: number;
	total: number;
};

export function calculateMonthlyAmortizationSchedule(
	totalLoanAmount: number,
	loanTerm: number,
	interestRate: number,
): MonthlyAmortizationRow[] {
	const monthlyRate = interestRate / 100 / 12;
	const monthlyPayment =
		(totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
		(Math.pow(1 + monthlyRate, loanTerm) - 1);

	let balance = totalLoanAmount;
	const schedule: MonthlyAmortizationRow[] = [];

	for (let i = 1; i <= loanTerm; i++) {
		const interest = balance * monthlyRate;
		const principal = monthlyPayment - interest;
		balance -= principal;

		const date = new Date();
		date.setMonth(date.getMonth() + i);

		schedule.push({
			payment: i,
			date: date.toLocaleDateString("en-US"),
			paymentAmount: monthlyPayment,
			interestPaid: interest,
			principalPaid: principal,
			additionalPrincipalPayment: 0,
			newPrincipalBalance: balance,
		});
	}

	return schedule;
}

export function calculateYearlyAmortizationSchedule(
	totalLoanAmount: number,
	loanTerm: number,
	interestRate: number,
): YearlyAmortizationRow[] {
	const monthlySchedule = calculateMonthlyAmortizationSchedule(
		totalLoanAmount,
		loanTerm * 12,
		interestRate,
	);
	const yearlySchedule: YearlyAmortizationRow[] = [];

	let yearlyInterest = 0;
	let yearlyPrincipal = 0;

	monthlySchedule.forEach((month, index) => {
		yearlyInterest += month.interestPaid;
		yearlyPrincipal += month.principalPaid;

		if ((index + 1) % 12 === 0 || index === monthlySchedule.length - 1) {
			yearlySchedule.push({
				year: Math.ceil((index + 1) / 12),
				interest: yearlyInterest,
				principal: yearlyPrincipal,
				total: yearlyInterest + yearlyPrincipal,
			});
			yearlyInterest = 0;
			yearlyPrincipal = 0;
		}
	});

	return yearlySchedule;
}
