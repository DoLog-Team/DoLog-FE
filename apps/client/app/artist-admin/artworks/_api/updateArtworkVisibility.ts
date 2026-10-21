import { authApiClient } from "@/lib/api/instance";

export type ArtworkVisibility = "PUBLIC" | "PRIVATE" | "EXHIBITION_ONLY";

export interface ArtworkVisibilitySource {
	status: "DRAFT" | "PUBLISHED";
	exhibitionOnly: boolean;
}

export const toArtworkVisibility = ({
	status,
	exhibitionOnly,
}: ArtworkVisibilitySource): ArtworkVisibility => {
	if (status === "DRAFT") return "PRIVATE";
	return exhibitionOnly ? "EXHIBITION_ONLY" : "PUBLIC";
};

export async function updateArtworkVisibility(
	artworkId: string,
	visibility: ArtworkVisibility,
): Promise<void> {
	await authApiClient<void>(`/artworks/${artworkId}/exhibition`, {
		method: "PATCH",
		body: JSON.stringify({ visibility }),
	});
}
