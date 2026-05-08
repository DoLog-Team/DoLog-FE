import { apiClient } from "api";

export interface ExhibitionListItem {
	id: string;
	slug: string;
	title: string;
	univName: string;
	deptName: string;
	imageUrl: string | null;
	startDate: string | null;
	endDate: string | null;
	dDay: number | null;
}

export async function getExhibitions(): Promise<ExhibitionListItem[]> {
	try {
		return await apiClient<ExhibitionListItem[]>("/exhibitions");
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

export interface ExhibitionLocation {
	address: string;
	detail_location: string | null;
	latitude: string;
	longitude: string;
}

export interface ExhibitionHost {
	hostId: string;
	hostName: string;
	hostImageUrl: string;
	description: string;
	email: string;
}
export interface HostSns {
	snsId: string;
	platformName: string;
	url: string;
}

export interface ExhibitionDetail {
	exhibitionId: string;
	univName: string;
	deptName: string;
	title: string;
	exhibitionImg: string;
	startDate: string;
	endDate: string;
	dateInfo: string;
	description: string;
	location: ExhibitionLocation;
	isPublic: boolean;
}

export async function getExhibitionDetail(exhibitionId: string): Promise<ExhibitionDetail | null> {
	try {
		console.log(
			"호출 URL:",
			`${process.env.NEXT_PUBLIC_API_URL}/exhibitions/${exhibitionId}/details`,
		);
		return await apiClient<ExhibitionDetail>(`/exhibitions/${exhibitionId}/details`);
	} catch (error) {
		console.error("getExhibitionDetail 에러:", error);
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
