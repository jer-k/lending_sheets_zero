import { AxiosError, AxiosInstance } from "axios";
import { redirect } from "next/navigation";

import { createApiClient } from "@/lib/api-base";

export function createServerApiClient(cookies?: string): AxiosInstance {
	const apiClient = createApiClient({
		cookies: cookies,
	});

	apiClient.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError) => {
			if (!error.response) {
				// Network error or server is down
				throw new Error("Unable to reach the server. Please try again later.");
			}

			const status = error.response.status;
			const redirectUrl = error.response.data?.redirect_uri;

			switch (status) {
				case 401:
					redirect(redirectUrl || "/login");
				case 403:
					if (redirectUrl) {
						redirect(redirectUrl);
					} else {
						throw new Error(
							"You do not have permission to perform this action.",
						);
					}
				case 500:
					// Internal Server Error
					throw new Error(
						"An unexpected error occurred. Please try again later.",
					);

				default:
					// Handle other errors
					throw error;
			}
		},
	);

	return apiClient;
}
