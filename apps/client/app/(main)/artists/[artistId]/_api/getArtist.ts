import { apiClient } from "@/lib/api/instance";
import { visitorHeaders } from "@/lib/visitor";

/************************
 * GET artists/{artistId} — 두록 작가 상세 (공개)
 ************************/

export interface DologArtistExhibition {
	exhibitionId: string;
	title: string;
	slug: string | null;
	exhibitionImg: string | null;
	univName: string | null;
	deptName: string | null;
	location: string | null;
	startDate: string | null; // YYYY-MM-DD
	endDate: string | null;
}

export interface DologArtistArtwork {
	artworkId: string;
	title: string;
	mainImg: string | null;
}

export interface DologArtist {
	artistId: string;
	// 작가 공통 프로필 — 좋아요(artist-profiles/{profileId}/likes)에 사용 (백에 문의하여 profileId가 필수로 생성되어 오도록 확인함. null인 경우는 없음)
	profileId: string | null;
	// 국문 성명은 필수값이 아니라 없을 수 있음
	nameKo: string | null;
	nameEn: string | null;
	bio: string | null;
	profileImg: string | null;
	email: string | null;
	snsList: { platformName: string; url: string }[] | null;
	exhibitions: DologArtistExhibition[];
	artworks: DologArtistArtwork[];
	likeCount: number;
	liked: boolean;
	viewCount: number;
}

// 없는 작가면 null · visitorId 를 넘기면 그 방문자 기준 liked 가 온다
export async function getDologArtist(
	artistId: string,
	visitorId?: string | null,
): Promise<DologArtist | null> {
	try {
		return await apiClient<DologArtist>(`/artists/${artistId}`, {
			cache: "no-store",
			headers: visitorHeaders(visitorId),
		});
	} catch {
		return null;
	}
}
