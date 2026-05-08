import { apiClient } from "api";

export interface BannerItem {
	id: number;
	imageUrl: string;
	orderIndex: number;
	linkUrl: string;
}

export interface ExhibitionItem {
	id: string;
	slug: string;
	title: string;
	univName: string;
	deptName: string;
	imageUrl: string | null;
	startDate: string | null;
	endDate: string | null;
	address: string | null;
	dday: number | null;
}

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
