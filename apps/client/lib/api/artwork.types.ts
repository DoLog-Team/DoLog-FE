// ─── 메인 / 전시물 목록 ──────────────────────────────────────────────────────

export interface ArtworkItem {
	id: string;
	title: string;
	category?: string;
	imageUrl: string;
	exhibitionTitle: string;
	exhibitionId: string;
	slug: string;
	deptName: string;
	artistName: string;
}

export interface ExhibitionMap {
	id: string;
	imageUrl: string;
	description: string | null;
}

export interface ArtworkArtist {
	id: string;
	name: string;
}

export interface ArtworkListItem {
	id: string;
	title: string;
	imageUrl: string;
	exhibitionId: string;
	slug: string;
	exhibitionTitle: string;
	artistName: string;
}

export interface CategoryGroup {
	categoryName: string;
	artworks: ArtworkListItem[];
}

export interface ZoneGroup {
	zoneName: string;
	zoneOrderId: number;
	description?: string;
	categories: CategoryGroup[];
}

export interface ArtworkListResponse {
	exhibitionId: string;
	maps: ExhibitionMap[];
	zones: ZoneGroup[];
}

export interface GetArtworksParams {
	zone?: string;
	category?: string;
	search?: string;
}

// ─── 전시물 상세 ──────────────────────────────────────────────────────────────

// 작가 SNS
export interface ArtistSns {
	platformName: string;
	url: string;
}

// 참여 작가 상세
export interface ArtworkParticipant {
	artistId: string;
	profileId: string;
	nameKo: string;
	nameEn: string;
	profileImg: string | null;
	role?: string;
	bio?: string;
	email?: string | null;
	sns?: ArtistSns[];
}

// 상세 이미지
export interface ArtworkDetailImage {
	imageUrl: string;
	description: string;
}

// BTS
export interface ArtworkBts {
	id: string;
	title: string;
	mainImg: string;
	author: string;
}

// 관련 작품 (sameCategoryArtworks, alphabeticalArtworks 공통)
export interface RelatedArtwork {
	id: string;
	title: string;
	category: string;
	artistName: string;
	mainImage: string;
	// alphabeticalArtworks 는 "prev" | "next"
	// sameCategoryArtworks 는 추천 작품(같은 작가 기준, 최대 2개) — dev 에서 같은 작가는 "artist" 로 옴
	type?: "prev" | "next" | "artist";
}

// 작품 상세 전체 응답 (전시 작품 상세 · 두록 작품 상세 공통)
export interface ArtworkDetail {
	title: string;
	category: string;
	material?: string;
	size?: string | null;
	// 아래는 v2 응답 필드 — 두록 작품 상세에서 사용
	shortIntro?: string | null;
	materials?: string[];
	// 단위 cm
	width?: number | null;
	height?: number | null;
	depth?: number | null;
	productionStartYear?: number | null;
	productionEndYear?: number | null;
	purchaseChatUrl?: string | null;
	showPurchaseButton?: boolean | null;
	// TODO: 출품 전시 — 두록 작품 상세 응답에 추가 BE 문의 중 (작품 목록 응답과 같은 이름으로 요청). 단독 작품이면 null
	exhibitionId?: string | null;
	exhibitionTitle?: string | null;
	slug?: string | null;
	viewCount?: number;
	likeCount?: number;
	liked?: boolean;
	description: string;
	purchaseUrl?: string | null;
	mainImage: string;
	locationMap: string;
	detailImages: ArtworkDetailImage[];
	youtubeUrl?: string | null;
	participants: ArtworkParticipant[];
	relatedBts?: ArtworkBts[];
	sameCategoryArtworks: RelatedArtwork[];
	alphabeticalArtworks: RelatedArtwork[];
}
