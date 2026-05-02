import { createApiClient } from "api";

export interface ExhibitionListItem {
	id: string;
	slug: string;
	title: string;
	univName: string;
	deptName: string;
	imageUrl: string | null;
	startDate: string | null;
	endDate: string | null;
	dDay: number | null;
}

export async function getExhibitions(baseURL: string): Promise<ExhibitionListItem[]> {
	const fetcher = createApiClient(baseURL);
	try {
		return await fetcher<ExhibitionListItem[]>("/exhibitions");
	} catch {
		return [];
	}
}

export async function resolveExhibitionSlug(
	baseURL: string,
	slug: string,
): Promise<{ uuid: string } | null> {
	const fetcher = createApiClient(baseURL);
	try {
		return await fetcher<{ uuid: string }>(`/exhibitions/resolve/${slug}`);
	} catch {
		return null;
	}
}
