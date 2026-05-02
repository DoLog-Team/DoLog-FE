import { createApiClient } from "../instance";

interface ResolveResponse {
	uuid: string;
}

export async function resolveExhibitionSlug(
	baseURL: string,
	slug: string,
): Promise<ResolveResponse | null> {
	const fetcher = createApiClient(baseURL);

	try {
		return await fetcher<ResolveResponse>(`/exhibitions/resolve/${slug}`);
	} catch {
		return null;
	}
}
