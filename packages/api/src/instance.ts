type FetchOptions = RequestInit;

interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
}

export function createApiClient(baseURL: string) {
  return async function fetcher<T>(
    path: string,
    options?: FetchOptions,
  ): Promise<T> {
    const res = await fetch(`${baseURL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json: ApiResponse<T> = await res.json();
    return json.data;
  };
}
