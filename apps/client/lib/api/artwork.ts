import { apiClient } from "api";

export interface ArtworkItem {
	id: string;
	title: string;
	category?: string;
	imageUrl: string;
	exhibitionTitle: string;
	exhibitionId: string;
	slug: string;
	artistName: string;
}

export interface MainArtworkCategory {
	categoryName: string;
	artworks: ArtworkItem[];
}

export async function getArtworks(): Promise<ArtworkItem[]> {
	try {
		return await apiClient<ArtworkItem[]>("/artworks");
	} catch {
		return [];
	}
}

export async function getMainArtworks(): Promise<MainArtworkCategory[]> {
	try {
		const data = await apiClient<{ categories: MainArtworkCategory[] }>("/artworks?main=true");
		return data.categories;
	} catch {
		return [];
	}
}
