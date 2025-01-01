"use client";

import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { apiClient } from "@/lib/client-api-client";

export function UserVerification() {
	const resendMutation = useMutation({
		mutationFn: () => apiClient.post("/email_address_verifications/resend"),
		onSuccess: (response) => {},
		onError: (error) => {},
	});

	return (
		<div className="flex flex-col gap-2">
			<div>
				<h3>Your account requires verification!</h3>
				<p>Check your email for the account verification email</p>
			</div>
			<div>
				<p>
					If you can't find the email, use the button below to send a new one
				</p>
				<Button onClick={() => resendMutation.mutate()}>Resend</Button>
			</div>
		</div>
	);
}
