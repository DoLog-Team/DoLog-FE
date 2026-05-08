import { apiClient } from "api";

export interface BannerItem {
	id: number;
	imageUrl: string;
	orderIndex: number;
	linkUrl: string;
}

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

export async function getBanners(): Promise<BannerItem[]> {
	try {
		return await apiClient<BannerItem[]>("/exhibitions/mainbanner");
	} catch {
		return [];
	}
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
