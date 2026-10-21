import { authApiClient } from "@/lib/api/instance";

// 참여 중인 전시의 구역에 출품 — 이미 출품된 작품은 백엔드가 ARTWORK_ALREADY_SUBMITTED 로 거절한다
export async function submitArtwork(
	artworkId: string,
	input: { exhibitionId: string; zoneId: string; locationMapFile?: File | null },
): Promise<void> {
	const formData = new FormData();
	formData.append("exhibitionId", input.exhibitionId);
	formData.append("zoneId", input.zoneId);
	if (input.locationMapFile) formData.append("locationMapFile", input.locationMapFile);

	await authApiClient<void>(`/artworks/${artworkId}/exhibition`, {
		method: "PUT",
		body: formData,
	});
}

// 전시 연결 해제 — 전시 미소속(DRAFT 노출 기준) 상태로 되돌린다
export async function cancelArtworkSubmission(artworkId: string): Promise<void> {
	await authApiClient<void>(`/artworks/${artworkId}/exhibition`, { method: "DELETE" });
}
