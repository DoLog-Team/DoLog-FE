import { apiClient } from "@/lib/api/instance";
import { MOCK_ARTWORK_EXHIBITION_GROUPS } from "../_mocks/artworkExhibitionGroups";

export interface ArtworkExhibitionGroup {
	label: string;
	value: string;
}

// 추후 백 api 연결 필요
export async function getArtworkExhibitionGroups(
	artworkId: string,
): Promise<ArtworkExhibitionGroup[]> {
	try {
		return await apiClient<ArtworkExhibitionGroup[]>(`/artworks/${artworkId}/exhibition-groups`);
	} catch {
		return MOCK_ARTWORK_EXHIBITION_GROUPS;
	}
}
