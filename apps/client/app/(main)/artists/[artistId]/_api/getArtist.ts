import { apiClient } from "@/lib/api/instance";

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
	// 소셜 가입 직후 이름을 아직 입력하지 않은 작가는 null
	// TODO : 현재 백+기획 논의중. 추후 확정되는 방향으로 수정 필요함!!
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

// 없는 작가면 null
export async function getDologArtist(artistId: string): Promise<DologArtist | null> {
	try {
		return await apiClient<DologArtist>(`/artists/${artistId}`, { cache: "no-store" });
	} catch {
		return null;
	}
}
