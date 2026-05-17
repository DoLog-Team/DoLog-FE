import { apiClient } from "api";

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

export async function getArtworks(): Promise<ArtworkItem[]> {
	try {
		return await apiClient<ArtworkItem[]>("/artworks");
	} catch {
		return [];
	}
}

export async function getMainArtworks(): Promise<ArtworkItem[]> {
	try {
		const data = await apiClient<ArtworkItem[] | null>("/artworks?main=true");
		return Array.isArray(data) ? data : [];
	} catch {
		return [];
	}
}

/************************
 * [SC02] 전시물 목록 조회
 * GET exhibitions/{id}/artworks
 ************************/

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

// 2. 카테고리 그룹
export interface CategoryGroup {
	categoryName: string;
	artworks: ArtworkListItem[];
}

// 3. 존(Zone) 그룹
export interface ZoneGroup {
	zoneName: string;
	zoneOrderId: number;
	categories: CategoryGroup[];
}

// 전체 응답
export interface ArtworkListResponse {
	exhibitionId: string;
	maps: ExhibitionMap[];
	zones: ZoneGroup[];
}

// 파라미터
export interface GetArtworksParams {
	zone?: string;
	category?: string;
	search?: string;
}

export async function getArtworksList(
	exhibitionId: string,
	params?: GetArtworksParams,
): Promise<ArtworkListResponse | null> {
	try {
		const query = new URLSearchParams();
		if (params?.zone) query.set("zone", params.zone);
		if (params?.category) query.set("category", params.category);
		if (params?.search) query.set("search", params.search);

		const queryString = query.toString();
		const path = `/exhibitions/${exhibitionId}/artworks${queryString ? `?${queryString}` : ""}`;

		return await apiClient<ArtworkListResponse>(path);
	} catch {
		return null;
	}
}

/************************
 * [SC02-01] 전시물 상세 조회
 * GET exhibitions/{id}/artworks/{artworkId}
 ************************/

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
	type?: "prev" | "next";
}

// 작품 상세 전체 응답
export interface ArtworkDetail {
	title: string;
	category: string;
	material?: string;
	size?: string | null;
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

export async function getArtworkDetail(
	exhibitionId: string,
	artworkId: string,
): Promise<ArtworkDetail | null> {
	try {
		return await apiClient<ArtworkDetail>(`/exhibitions/${exhibitionId}/artworks/${artworkId}`);
	} catch {
		return null;
	}
}
