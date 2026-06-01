import { apiClient } from "api";
import type { ArtistDetail } from "./artist-detail.types";

export async function getArtistDetail(profileId: string): Promise<ArtistDetail | null> {
	try {
		return await apiClient<ArtistDetail>(`/artist-profiles/${profileId}`);
	} catch {
		return null;
	}
}
