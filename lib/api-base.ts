import axios, { AxiosInstance, CreateAxiosDefaults, AxiosError } from "axios";

import { apiBaseUrl } from "@/lib/api-urls";

type ApiClientConfig = {
	cookies?: string;
} & CreateAxiosDefaults;

const baseConfig = {
	baseURL: apiBaseUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
} as const;

// Create the API client with optional cookie header
export function createApiClient(config: ApiClientConfig = {}): AxiosInstance {
	const axiosConfig = {
		...baseConfig,
		...config,
		headers: {
			...baseConfig.headers,
			...(config.cookies && { Cookie: config.cookies }),
			...config.headers,
		},
	};

	return axios.create(axiosConfig);
}
