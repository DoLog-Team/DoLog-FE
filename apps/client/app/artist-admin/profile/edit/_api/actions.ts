import { authApiClient } from "@/lib/api/instance";

/************************
 * 내 작가 공통 프로필 수정 — PATCH /artist-profiles/me (multipart: request JSON + profileImg)
 * 보내지 않은 필드는 서버가 기존 값을 유지한다
 ************************/

export interface MyArtistProfileRequest {
	// 국문 성명은 빈 값을 받지 않아(minLength 1) 비었을 때는 빼고 보낸다
	nameKo?: string;
	nameEn?: string;
	bio?: string;
	// 이메일 형식만 받아 비었을 때는 빼고 보낸다
	email?: string;
	purchaseContactUrl?: string;
}

export async function updateMyArtistProfile(
	request: MyArtistProfileRequest,
	profileImg: File | null,
) {
	const formData = new FormData();
	// @RequestPart 로 받는 JSON 파트라 Content-Type 을 붙여 보낸다
	formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
	if (profileImg) formData.append("profileImg", profileImg);

	await authApiClient("/artist-profiles/me", {
		method: "PATCH",
		body: formData,
	});
}

/************************
 * 작가 기본 정보(이름) 수정 — PATCH /artists/me
 * 마이페이지·두록 작가 상세는 GET artists/{artistId} 의 이름을 보여줘서 공통 프로필과 함께 맞춘다
 * TODO: 이름이 작가·공통 프로필 두 곳에 있음 — BE 가 한쪽으로 합치면 이 호출 제거
 ************************/

export interface MyArtistNameRequest {
	nameKo?: string;
	nameEn?: string;
}

export async function updateMyArtistName(body: MyArtistNameRequest) {
	await authApiClient("/artists/me", {
		method: "PATCH",
		body: JSON.stringify(body),
	});
}

/************************
 * 작가 SNS — POST artist-profiles/{profileId}/sns · PATCH/DELETE artist-profiles/sns/{snsId}
 ************************/

export interface ArtistSnsRequest {
	platformName: string;
	url: string;
}

export async function createArtistSns(profileId: string, body: ArtistSnsRequest) {
	const { snsId } = await authApiClient<{ snsId: string }>(`/artist-profiles/${profileId}/sns`, {
		method: "POST",
		body: JSON.stringify(body),
	});
	return snsId;
}

export async function updateArtistSns(snsId: string, body: ArtistSnsRequest) {
	await authApiClient(`/artist-profiles/sns/${snsId}`, {
		method: "PATCH",
		body: JSON.stringify(body),
	});
}

export async function deleteArtistSns(snsId: string) {
	await authApiClient(`/artist-profiles/sns/${snsId}`, { method: "DELETE" });
}
