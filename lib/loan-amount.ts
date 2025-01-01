export function calculateBaseLoanAmount(
	purchasePrice: number,
	downPaymentPercentage: number,
) {
	return purchasePrice - downPayment(purchasePrice, downPaymentPercentage);
}

export function calculateTotalLoanAmount(
	purchasePrice: number,
	downPaymentPercentage: number,
) {
	return purchasePrice - downPayment(purchasePrice, downPaymentPercentage);
}

export function downPayment(
	purchasePrice: number,
	downPaymentPercentage: number,
) {
	return purchasePrice * (downPaymentPercentage / 100);
}
