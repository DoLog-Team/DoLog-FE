type FetchOptions = RequestInit;

interface ApiResponse<T> {
	isSuccess: boolean;
	data: T;
	message: string;
}

export function createApiClient(baseURL: string) {
	return async function fetcher<T>(path: string, options?: FetchOptions): Promise<T> {
		const res = await fetch(`${baseURL}${path}`, {
			headers: {
				"Content-Type": "application/json",
				...options?.headers,
			},
			...options,
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
