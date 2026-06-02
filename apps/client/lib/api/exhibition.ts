import { apiClient } from "api";
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
		return await apiClient<ExhibitionItem[]>("/exhibitions");
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
	try {
		return await apiClient<ExhibitionDetail>(`/exhibitions/${exhibitionId}/details`);
	} catch {
		return null;
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
