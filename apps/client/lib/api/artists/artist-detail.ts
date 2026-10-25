import { apiClient } from "@/lib/api/instance";
import { visitorHeaders } from "@/lib/visitor";
import type { ArtistDetail } from "./artist-detail.types";

// v2 응답 — 연락처가 contact 로 묶이지 않고, 비하인드는 내려오지 않는다
// TODO : 백에 비하인드 내려주는 것으로 수정 요청해둠. 추후 확인 후 ArtistDetail 타입에 반영 필요 !!
interface ArtistProfileResponse {
	profileId: string;
	artistId: string;
	// 국문 성명은 필수값이 아니라 없을 수 있음 (Figma 10.20 추가 사항)
	nameKo: string | null;
	nameEn: string | null;
	bio: string | null;
	profileImg: string | null;
	email: string | null;
	snsList: { snsId: string; platformName: string; url: string }[] | null;
	artworks: { artworkId: string; title: string; mainImg: string | null }[];
	prevArtist: { profileId: string; nameKo: string } | null;
	nextArtist: { profileId: string; nameKo: string } | null;
	likeCount: number;
	liked: boolean;
}

// 프로필은 작가 공통이지만 작품 목록·이전/다음 작가는 전시마다 달라서 전시 UUID 가 필수
// visitorId 를 넘기면 그 방문자 기준 liked 가 온다
export async function getArtistDetail(
	profileId: string,
	exhibitionId: string,
	visitorId?: string | null,
): Promise<ArtistDetail | null> {
	try {
		const data = await apiClient<ArtistProfileResponse>(
			`/artist-profiles/${profileId}?exhibitionId=${exhibitionId}`,
			{ headers: visitorHeaders(visitorId) },
		);
		return {
			profileId: data.profileId,
			artistId: data.artistId,
			nameKo: data.nameKo ?? "",
			nameEn: data.nameEn ?? "",
			profileImage: data.profileImg ?? "",
			bio: data.bio ?? "",
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
			likeCount: data.likeCount ?? 0,
			liked: !!data.liked,
		};
	} catch {
		return null;
	}
}

/************************
 * 작가 좋아요 / 좋아요 취소 (비로그인 가능)
 * POST · DELETE artist-profiles/{profileId}/likes
 * visitorId 가 없으면 BE 가 새로 발급해 응답에 담아 준다
 ************************/

export interface ArtistLikeResponse {
	profileId: string;
	visitorId: string;
	likeCount: number;
	liked: boolean;
}

export async function setArtistProfileLike(
	profileId: string,
	liked: boolean,
	visitorId: string | null,
): Promise<ArtistLikeResponse> {
	return apiClient<ArtistLikeResponse>(`/artist-profiles/${profileId}/likes`, {
		method: liked ? "POST" : "DELETE",
		headers: visitorHeaders(visitorId),
		body: JSON.stringify({}),
	});
}
