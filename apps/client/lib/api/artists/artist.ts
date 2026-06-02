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
		return await apiClient<ArtistProfile[]>(`/exhibitions/${exhibitionId}/artists?sort=NAME`);
	} catch {
		return [];
	}
}
