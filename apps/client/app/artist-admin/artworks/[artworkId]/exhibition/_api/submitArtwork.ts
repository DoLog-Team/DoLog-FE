import { authApiClient } from "@/lib/api/instance";

export async function submitArtwork(
	artworkId: string,
	input: { exhibitionId: string; zoneId?: string; locationMapFile?: File | null },
): Promise<void> {
	const formData = new FormData();
	formData.append("exhibitionId", input.exhibitionId);
	if (input.zoneId) formData.append("zoneId", input.zoneId);
	if (input.locationMapFile) formData.append("locationMapFile", input.locationMapFile);

	await authApiClient<void>(`/artworks/${artworkId}/exhibition`, {
		method: "PUT",
		body: formData,
	});
}

export async function cancelArtworkSubmission(artworkId: string): Promise<void> {
	await authApiClient<void>(`/artworks/${artworkId}/exhibition`, { method: "DELETE" });
}
