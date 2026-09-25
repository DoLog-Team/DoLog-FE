import { apiClient } from "@/lib/api/instance";
import { MOCK_ARTWORK_EXHIBITION_LINK } from "../_mocks/artworkExhibitionLink";

export type ArtworkExhibitionVisibility = "visible" | "overLimit" | "hidden";

export interface ArtworkExhibitionLink {
	exhibitionName: string;
	visibility: ArtworkExhibitionVisibility;
}

// 실제 출품 상태 API 연동 전까지는, 호출이 실패하면 목 데이터로 대체함
export async function getArtworkExhibitionLink(artworkId: string): Promise<ArtworkExhibitionLink> {
	try {
		return await apiClient<ArtworkExhibitionLink>(`/artworks/${artworkId}/exhibition-link`);
	} catch {
		return MOCK_ARTWORK_EXHIBITION_LINK;
	}
}
