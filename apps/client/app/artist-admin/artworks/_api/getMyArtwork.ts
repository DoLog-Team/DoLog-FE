import { authApiClient } from "@/lib/api/instance";

export interface MyArtworkDetail {
	artworkId: string;
	title: string;
	category: string | null;
	description: string | null;
	shortIntro: string | null;
	materials: string[];
	width: number | null;
	height: number | null;
	depth: number | null;
	productionStartYear: number | null;
	productionStartMonth: number | null;
	productionStartDay: number | null;
	productionEndYear: number | null;
	productionEndMonth: number | null;
	productionEndDay: number | null;
	purchaseUrl: string | null;
	purchaseChatUrl: string | null;
	showPurchaseButton: boolean | null;
	youtubeUrl: string | null;
	mainImg: string | null;
	status: "DRAFT" | "PUBLISHED";
	hidden: boolean;
	exhibitionId: string | null;
	exhibitionName: string | null;
	zoneId: string | null;
	zoneName: string | null;
	images: { imageId: string; imageUrl: string; description: string | null; orderIndex: number }[];
	artists: { artistId: string; nameKo: string; role: string | null }[];
}

// 내 작품 상세 조회 (편집용) — 공개 여부/숨김과 무관
export async function getMyArtwork(artworkId: string): Promise<MyArtworkDetail> {
	return authApiClient<MyArtworkDetail>(`/artworks/${artworkId}/me`);
}
