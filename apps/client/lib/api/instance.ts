import { getAccessToken } from "./authToken";

type FetchOptions = RequestInit;

interface ApiResponse<T> {
	isSuccess: boolean;
	data: T;
	message: string;
}

export function createApiClient(baseURL: string) {
	return async function fetcher<T>(path: string, options?: FetchOptions): Promise<T> {
		const token = getAccessToken();
		// FormData 는 브라우저가 boundary 를 포함해 Content-Type 을 직접 설정해야 해서 비워둔다.
		const isFormData = options?.body instanceof FormData;

		const res = await fetch(`${baseURL}${path}`, {
			...options,
			headers: {
				...(isFormData ? {} : { "Content-Type": "application/json" }),
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				...options?.headers,
			},
		});

		if (!res.ok) {
			let message = `HTTP ${res.status}`;
			try {
				const json = await res.json();
				message = `HTTP ${res.status}: ${json.message}`;
			} catch {}
			throw new Error(message);
		}

		const json: ApiResponse<T> = await res.json();
		return json.data;
	};
}

export const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL ?? "");
