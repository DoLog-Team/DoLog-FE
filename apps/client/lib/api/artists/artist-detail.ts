import { apiClient } from "api";
import type { ArtistDetail } from "./artist-detail.types";

export async function getArtistDetail(profileId: string): Promise<ArtistDetail | null> {
	try {
		const res = await apiClient<ArtistDetail>(`/artist-profiles/${profileId}`);

		return res ?? null;
	} catch (_e) {
		return null;
	}
}
