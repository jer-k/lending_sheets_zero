export const apiBaseUrl =
	process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3000";
export const googleOauthUrl = `${apiBaseUrl}/oauth/authorize`;
