// api/artist.ts

import { apiClient } from "api";

export interface ArtistProfile {
	profileId: string;
	nameKo: string;
	nameEn: string;
	profileImg: string;
	isPublic: boolean;
}

export async function getArtistProfiles(exhibitionId: string): Promise<ArtistProfile[]> {
	try {
		const response = await apiClient<ArtistProfile[]>(
			`/exhibitions/${exhibitionId}/artists?sort=NAME`,
		);

		if (Array.isArray(response)) {
			return response;
		}

		return [];
	} catch (_error) {
		return [];
	}
}
