import { apiClient } from "api";

export interface MainArtworkItem {
	id: string;
	title: string;
	imageUrl: string;
	exhibitionTitle: string;
	exhibitionId: string;
	slug: string;
	artistName: string;
}

export interface MainArtworkCategory {
	categoryName: string;
	artworks: MainArtworkItem[];
}

export async function getMainArtworks(): Promise<MainArtworkCategory[]> {
	try {
		const data = await apiClient<{ categories: MainArtworkCategory[] }>("/artworks?main=true");
		return data.categories;
	} catch {
		return [];
	}
}
