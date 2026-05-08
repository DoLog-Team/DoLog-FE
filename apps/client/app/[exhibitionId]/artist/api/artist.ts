// api/artist.ts

import { apiClient } from "api";

export interface ArtistProfile {
	profileId: string;
	nameKo: string;
	nameEn: string;
	profileImg: string;
	isPublic: boolean;
}

interface GetArtistResponse {
	isSuccess: boolean;
	data: ArtistProfile[];
}

export async function getArtistProfiles(exhibitionId: string): Promise<ArtistProfile[]> {
	try {
		const response = await apiClient<any>(`/exhibitions/${exhibitionId}/artists?sort=NAME`);

		if (Array.isArray(response)) {
			return response;
		}

		if (response?.data && Array.isArray(response.data)) {
			return response.data;
		}

		return [];
	} catch (error) {
		console.error("작가 프로필 로드 실패:", error);
		return [];
	}
}
