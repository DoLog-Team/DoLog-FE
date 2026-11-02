import { authApiClient } from "@/lib/api/instance";

/************************
 * 내 작가 공통 프로필 수정 — PATCH /artist-profiles/me (multipart: request JSON + profileImg)
 * 보내지 않은 필드는 서버가 기존 값을 유지한다
 ************************/

export interface MyArtistProfileRequest {
	// 빈 문자열이면 이름을 지운다 — 작가 이름을 내려주는 응답(GET artists/{artistId} 등)도 공통 프로필 이름을 쓴다
	nameKo?: string;
	nameEn?: string;
	bio?: string;
	// 빈 문자열이면 프로필 이메일을 지운다 (가입 시 인증한 계정 이메일은 유지)
	email?: string;
	purchaseContactUrl?: string;
	// true 면 저장된 프로필 이미지를 지운다
	deleteProfileImg?: boolean;
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
