import { apiClient } from "@/lib/api/instance";
import { MOCK_ARTWORK_EXHIBITION_GROUPS } from "../_mocks/artworkExhibitionGroups";

export interface ArtworkExhibitionGroup {
	label: string;
	value: string;
}

// 실제 그룹 목록 API 연동 전까지는 개발 모드에서 호출이 실패하면 목 데이터로 대체함
// 추후 백 api 연결 필요
export async function getArtworkExhibitionGroups(
	artworkId: string,
): Promise<ArtworkExhibitionGroup[]> {
	try {
		return await apiClient<ArtworkExhibitionGroup[]>(`/artworks/${artworkId}/exhibition-groups`);
	} catch (error) {
		console.error("[getArtworkExhibitionGroups] 그룹 목록 조회 실패", error);
		if (process.env.NODE_ENV !== "development") throw error;
		return MOCK_ARTWORK_EXHIBITION_GROUPS;
	}
}
