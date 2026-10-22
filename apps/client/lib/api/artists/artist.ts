import { apiClient } from "@/lib/api/instance";

export interface ArtistProfile {
	profileId: string;
	artistId: string;
	nameKo: string;
	nameEn: string;
	profileImg: string;
}

/************************
 * 전시 작가 목록 — GET exhibitions/{id}/artists
 * v2 응답은 배열이 아니라 { artists, totalCount }
 ************************/

interface ExhibitionArtistsResponse {
	artists: ArtistProfile[];
	totalCount: number;
}

export async function getArtistProfiles(exhibitionId: string): Promise<ArtistProfile[]> {
	try {
		const data = await apiClient<ExhibitionArtistsResponse>(
			`/exhibitions/${exhibitionId}/artists?sort=NAME`,
		);
		return data.artists ?? [];
	} catch {
		return [];
	}
}
