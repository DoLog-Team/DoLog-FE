import { apiClient } from "@/lib/api/instance";
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
