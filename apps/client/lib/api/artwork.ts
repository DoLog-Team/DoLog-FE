import { apiClient } from "@/lib/api/instance";
import { visitorHeaders } from "@/lib/visitor";
import type {
	ArtworkDetail,
	ArtworkItem,
	ArtworkListResponse,
	GetArtworksParams,
} from "./artwork.types";

export type * from "./artwork.types";

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

// visitorId 를 넘기면 그 방문자 기준 liked 가 온다
export async function getArtworkDetail(
	exhibitionId: string,
	artworkId: string,
	visitorId?: string | null,
): Promise<ArtworkDetail | null> {
	try {
		return await apiClient<ArtworkDetail>(`/exhibitions/${exhibitionId}/artworks/${artworkId}`, {
			headers: visitorHeaders(visitorId),
		});
	} catch {
		return null;
	}
}

/************************
 * 두록 작품 상세 조회 (공개)
 * GET artworks/{artworkId}
 * 전시에 종속되지 않아 전시 없는 단독 작품도 열린다. 응답은 전시 작품 상세와 같다
 ************************/

// visitorId 를 넘기면 그 방문자 기준 liked 가 온다
export async function getDologArtworkDetail(
	artworkId: string,
	visitorId?: string | null,
): Promise<ArtworkDetail | null> {
	try {
		return await apiClient<ArtworkDetail>(`/artworks/${artworkId}`, {
			cache: "no-store",
			headers: visitorHeaders(visitorId),
		});
	} catch {
		return null;
	}
}

/************************
 * 작품 좋아요 / 좋아요 취소 (비로그인 가능)
 * POST · DELETE artworks/{artworkId}/likes
 * visitorId 가 없으면 BE 가 새로 발급해 응답에 담아 준다
 ************************/

export interface ArtworkLikeResponse {
	artworkId: string;
	visitorId: string;
	likeCount: number;
	liked: boolean;
}

export async function setArtworkLike(
	artworkId: string,
	liked: boolean,
	visitorId: string | null,
): Promise<ArtworkLikeResponse> {
	return apiClient<ArtworkLikeResponse>(`/artworks/${artworkId}/likes`, {
		method: liked ? "POST" : "DELETE",
		headers: visitorHeaders(visitorId),
		body: JSON.stringify({}),
	});
}

/************************
 * 작품 조회수 기록 (비로그인 가능)
 * POST artworks/{artworkId}/views
 * 같은 방문자는 작품마다 한 번만 센다
 ************************/

export interface ArtworkViewResponse {
	artworkId: string;
	viewCount: number;
	counted: boolean;
	visitorId: string;
}

export async function recordArtworkView(
	artworkId: string,
	visitorId: string | null,
): Promise<ArtworkViewResponse> {
	return apiClient<ArtworkViewResponse>(`/artworks/${artworkId}/views`, {
		method: "POST",
		headers: visitorHeaders(visitorId),
	});
}
