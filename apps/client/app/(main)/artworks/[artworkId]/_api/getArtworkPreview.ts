import type { ArtworkDetail } from "@/lib/api/artwork";
import { serverApiClient } from "@/lib/api/server";

// 작가 본인 미리보기 — 공개 상태(공개/비공개/전시에만 공개)와 무관하게, 필수 항목을 다 채운 본인 작품만 본다
export async function getArtworkPreview(artworkId: string): Promise<ArtworkDetail | null> {
	try {
		return await serverApiClient<ArtworkDetail>(`/artworks/${artworkId}/preview`, {
			cache: "no-store",
		});
	} catch {
		return null;
	}
}
