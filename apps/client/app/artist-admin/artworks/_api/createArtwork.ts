import { apiClient } from "@/lib/api/instance";

export interface CreateArtworkResult {
	id: string;
}

// 작품 등록 (전시 미소속 DRAFT 상태로 생성)
export async function createArtwork(title: string): Promise<CreateArtworkResult> {
	const formData = new FormData();
	formData.append("title", title);

	return apiClient<CreateArtworkResult>("/artworks", {
		method: "POST",
		body: formData,
	});
}
