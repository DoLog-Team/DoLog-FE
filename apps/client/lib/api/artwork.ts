import { createApiClient } from "api";

export interface ArtworkArtist {
	id: string;
	name: string;
}

export interface ArtworkListItem {
	artworkId: string;
	title: string;
	category: string;
	zone: string;
	mainImage: string;
	artists: ArtworkArtist[];
}

export interface ExhibitionMap {
	id: string;
	imageUrl: string;
	description: string | null;
}

/**
 * 전체 응답
 */
export interface ArtworkListResponse {
	exhibitionId: string;
	maps: ExhibitionMap[];
	artworks: ArtworkListItem[];
}

/**
 * 파라미터
 */
export interface GetArtworksParams {
	zone?: string;
	category?: string;
	search?: string;
}

/**
 * [SC02] 전시물 목록 조회
 */
export async function getArtworks(
	baseURL: string,
	exhibitionId: string,
	params?: GetArtworksParams,
): Promise<ArtworkListResponse | null> {
	const fetcher = createApiClient(baseURL);
	try {
		const query = new URLSearchParams();
		if (params?.zone) query.set("zone", params.zone);
		if (params?.category) query.set("category", params.category);
		if (params?.search) query.set("search", params.search);

		const queryString = query.toString();
		const path = `/exhibitions/${exhibitionId}/artworks${queryString ? `?${queryString}` : ""}`;

		return await fetcher<ArtworkListResponse>(path);
	} catch {
		return null;
	}
}
