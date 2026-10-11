type FetchOptions = RequestInit;
type HeadersResolver = () => HeadersInit | Promise<HeadersInit>;

export interface ApiResponse<T> {
	isSuccess: boolean;
	code: string;
	httpStatus: number;
	message: string;
	data: T;
	timeStamp: string;
}

// message 는 기존 형식("HTTP 401: ...")을 유지해 문자열로 분기하던 호출부가 그대로 동작하게 한다
export class ApiError extends Error {
	readonly status: number;
	readonly code?: string;

	constructor(status: number, serverMessage?: string, code?: string) {
		super(serverMessage ? `HTTP ${status}: ${serverMessage}` : `HTTP ${status}`);
		this.name = "ApiError";
		this.status = status;
		this.code = code;
	}
}

export function isApiError(error: unknown, status?: number): error is ApiError {
	return error instanceof ApiError && (status === undefined || error.status === status);
}

export function createApiClient(baseURL: string, resolveHeaders?: HeadersResolver) {
	return async function fetcher<T>(path: string, options?: FetchOptions): Promise<T> {
		const headers = new Headers(await resolveHeaders?.());
		// FormData 는 브라우저가 boundary 를 포함한 Content-Type 을 직접 붙여야 한다
		if (!(options?.body instanceof FormData)) headers.set("Content-Type", "application/json");
		new Headers(options?.headers).forEach((value, key) => {
			headers.set(key, value);
		});

		const res = await fetch(`${baseURL}${path}`, { ...options, headers });

		if (!res.ok) {
			const json = await res.json().catch(() => null);
			throw new ApiError(res.status, json?.message, json?.code);
		}

		const text = await res.text();
		if (!text) return undefined as T;

		const json: ApiResponse<T> = JSON.parse(text);
		return json.data;
	};
}

// 인증이 필요 없는 공개 API — 서버/클라이언트 어디서든 백엔드를 직접 호출한다
export const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL ?? "");

// 인증이 필요한 API
// 토큰은 httpOnly 쿠키에 있어 브라우저 JS 가 읽을 수 없으므로 BFF(/api/proxy)를 거쳐 호출한다
// 토큰 첨부·만료 시 재발급은 app/api/proxy/[...path]/route.ts 가 처리한다
export const authApiClient = createApiClient("/api/proxy");
