import { authApiClient } from "@/lib/api/instance";

// 작품 상세 설명(마크다운 텍스트) 임시저장
export async function updateArtworkDescription(
	artworkId: string,
	description: string,
): Promise<void> {
	const formData = new FormData();
	if (description.trim()) formData.append("description", description);

	await authApiClient<void>(`/artworks/${artworkId}`, {
		method: "PATCH",
		body: formData,
	});
}

export interface UploadContentImageResult {
	imageUrl: string;
}

// 본문(마크다운)에 인라인으로 끼워넣을 이미지 업로드. 갤러리(ArtworkImg)에는 남지 않는다.
export async function uploadContentImage(
	artworkId: string,
	file: Blob,
): Promise<UploadContentImageResult> {
	const formData = new FormData();
	formData.append("imageFile", file);

	return authApiClient<UploadContentImageResult>(`/artworks/${artworkId}/content-images`, {
		method: "POST",
		body: formData,
	});
}
