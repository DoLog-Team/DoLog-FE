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

/**
 * [SC01] 전시회 정보 통합 조회
 * exhibitions/{exhibitionId}/details
 * @author: 이보연
 */

export interface ExhibitionLocation {
	address: string;
	detail_location: string | null;
	latitude: string;
	longitude: string;
}

export interface ExhibitionDetail {
  	exhibitionId: string;
	univName: string;
	deptName: string;
	title: string;
	exhibitionImg: string;
	startDate: string;
	endDate: string;
	dateInfo: string;
	description: string;
	location: ExhibitionLocation;
	isPublic: boolean;
}

export async function getExhibitionDetail (
	baseURL: string,
	exhibitionId: string,
) : Promise<ExhibitionDetail | null> {
	const fetcher = createApiClient(baseURL);
	try {
		return await fetcher<ExhibitionDetail>(
			`exhibitions/${exhibitionId}/details`
		);
	} catch {
		return null;
	}
}