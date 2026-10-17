import { apiClient } from "@/lib/api/instance";
import type { ArtistDetail } from "./artist-detail.types";

// v2 응답 — 연락처가 contact 로 묶이지 않고, 비하인드는 내려오지 않는다
// TODO : 백에 비하인드 내려주는 것으로 수정 요청해둠. 추후 확인 후 ArtistDetail 타입에 반영 필요 !!
interface ArtistProfileResponse {
	profileId: string;
	artistId: string;
	nameKo: string;
	nameEn: string;
	bio: string;
	profileImg: string | null;
	email: string | null;
	snsList: { snsId: string; platformName: string; url: string }[] | null;
	artworks: { artworkId: string; title: string; mainImg: string | null }[];
	prevArtist: { profileId: string; nameKo: string } | null;
	nextArtist: { profileId: string; nameKo: string } | null;
}

// 프로필은 작가 공통이지만 작품 목록·이전/다음 작가는 전시마다 달라서 전시 UUID 가 필수
export async function getArtistDetail(
	profileId: string,
	exhibitionId: string,
): Promise<ArtistDetail | null> {
	try {
		const data = await apiClient<ArtistProfileResponse>(
			`/artist-profiles/${profileId}?exhibitionId=${exhibitionId}`,
		);
		return {
			profileId: data.profileId,
			artistId: data.artistId,
			nameKo: data.nameKo,
			nameEn: data.nameEn,
			profileImage: data.profileImg ?? "",
			bio: data.bio,
			contact: { email: data.email ?? "", snsList: data.snsList ?? [] },
			behindTheScenes: [],
			artworks: data.artworks.map((artwork) => ({
				artworkId: artwork.artworkId,
				title: artwork.title,
				image: artwork.mainImg ?? "",
			})),
			prevArtist: data.prevArtist
				? { id: data.prevArtist.profileId, name: data.prevArtist.nameKo }
				: undefined,
			nextArtist: data.nextArtist
				? { id: data.nextArtist.profileId, name: data.nextArtist.nameKo }
				: undefined,
		};
	} catch {
		return null;
	}
}
