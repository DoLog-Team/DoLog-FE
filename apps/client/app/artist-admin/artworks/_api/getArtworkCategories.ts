import { authApiClient } from "@/lib/api/instance";

export interface ArtworkCategoryOption {
	value: string;
	label: string;
}

// 두록 어드민이 관리하는 작품 카테고리 목록
export async function getArtworkCategories(): Promise<ArtworkCategoryOption[]> {
	return authApiClient<ArtworkCategoryOption[]>("/artworks/categories");
}
