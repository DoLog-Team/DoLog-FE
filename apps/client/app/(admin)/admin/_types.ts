// 필드 기준: 노션 `전시 활성화를 위한 기본 데이터 리스트`
export interface AdminExhibition {
	// 전시회_기본정보
	title: string | null;
	type: string | null;
	university: string | null;
	department: string | null;
	startDate: string | null;
	endDate: string | null;
	// 노션 `전시 기간 추가 정보` (자유 입력)
	operatingHours: string | null;
	note: string | null;
	// 주제 설명
	description: string | null;
	// OG 태그 (선택값)
	siteName: string | null;
	siteDescription: string | null;
	imageUrl: string | null;
	siteUrl: string | null;
	entryCode: string | null;
	// "YYYY-MM-DD", 게시 전이면 null
	publishedAt: string | null;
	expiresAt: string | null;
}

export interface AdminExhibitionCounts {
	artists: number;
	pendingArtists: number;
	// 전시 중인 작품 = 공개이고 숨기지 않은 작품 (플랜 한도 초과 미노출은 포함)
	exhibitedArtworks: number;
	exceededArtworks: number;
	hiddenArtworks: number;
}

export interface AdminArtist {
	id: string;
	name: string;
	email: string | null;
	greeting: string | null;
	artworkCount: number;
}

export const ARTWORK_VISIBILITY_LABELS = ["공개", "비공개", "임시저장"] as const;
export type ArtworkVisibilityLabel = (typeof ARTWORK_VISIBILITY_LABELS)[number];

export interface AdminArtwork {
	id: string;
	title: string;
	artistName: string;
	groupId: string | null;
	group: string | null;
	visibility: ArtworkVisibilityLabel;
	// 플랜 한도 초과로 전시에 노출되지 않으면 false
	isExposed: boolean;
	progress: number;
	imageUrl: string | null;
}

export interface AdminArtworkGroup {
	id: string;
	name: string;
}
