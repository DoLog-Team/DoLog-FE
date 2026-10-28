import { authApiClient } from "@/lib/api/instance";

export interface ArtworkCategoryOption {
	value: string;
	label: string;
}

interface ArtworkCategoryResponse {
	id: string;
	name: string;
	orderIndex: number;
}

export async function getArtworkCategories(): Promise<ArtworkCategoryOption[]> {
	const categories = await authApiClient<ArtworkCategoryResponse[]>("/artworks/categories");
	return categories.map(({ name }) => ({ value: name, label: name }));
}
