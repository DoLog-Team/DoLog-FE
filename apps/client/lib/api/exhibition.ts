import { apiClient, isApiError } from "@/lib/api/instance";
import type {
	BannerItem,
	ExhibitionDetail,
	ExhibitionHost,
	ExhibitionItem,
	HostSns,
} from "./exhibition.types";

export type * from "./exhibition.types";

export async function getMainExhibitions(): Promise<ExhibitionItem[]> {
	try {
		const data = await apiClient<{ mainExhibitions: ExhibitionItem[] }>("/exhibitions/main");
		return data.mainExhibitions;
	} catch {
		return [];
	}
}

export async function getBanners(): Promise<BannerItem[]> {
	try {
		return await apiClient<BannerItem[]>("/exhibitions/mainbanner");
	} catch {
		return [];
	}
}

export async function getExhibitions(): Promise<ExhibitionItem[]> {
	try {
		const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";
		const path = isPreview ? "/exhibitions" : "/exhibitions?is_public=true";
		return await apiClient<ExhibitionItem[]>(path);
	} catch {
		return [];
	}
}

export async function resolveExhibitionSlug(slug: string): Promise<{ uuid: string } | null> {
	try {
		return await apiClient<{ uuid: string }>(`/exhibitions/resolve/${slug}`);
	} catch {
		return null;
	}
}

/************************
 * [SC01] 전시회 정보 통합 조회, 주최기관 정보 조회, 주최기관 SNS 조회
 * GET exhibitions/{exhibitionId}/details
 * GET exhibitions/{exhibitionId}/host
 * GET exhibitions/{exhibitionId}/host/sns
 ************************/

export async function getExhibitionDetail(exhibitionId: string): Promise<ExhibitionDetail | null> {
	return (await getExhibitionDetailResult(exhibitionId)).exhibition;
}

// 비공개 전시는 상세 조회가 403(EXHIBITION_403_1)으로 막힌다
const PRIVATE_EXHIBITION_CODE = "EXHIBITION_403_1";

// 조회 실패 시 비공개 전시 때문인지 함께 알려준다 — 화면 안내 문구를 나누는 데 쓴다
export async function getExhibitionDetailResult(
	exhibitionId: string,
): Promise<{ exhibition: ExhibitionDetail | null; isPrivate: boolean }> {
	try {
		const exhibition = await apiClient<ExhibitionDetail>(`/exhibitions/${exhibitionId}/details`);
		return { exhibition, isPrivate: false };
	} catch (error) {
		return {
			exhibition: null,
			isPrivate: isApiError(error, 403) && error.code === PRIVATE_EXHIBITION_CODE,
		};
	}
}

export async function getExhibitionHost(exhibitionId: string): Promise<ExhibitionHost | null> {
	try {
		return await apiClient<ExhibitionHost>(`/exhibitions/${exhibitionId}/host`);
	} catch {
		return null;
	}
}

export async function getHostSns(exhibitionId: string): Promise<HostSns[]> {
	try {
		return await apiClient<HostSns[]>(`/exhibitions/${exhibitionId}/host/sns`);
	} catch {
		return [];
	}
}
