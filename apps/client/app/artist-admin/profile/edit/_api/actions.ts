import { authApiClient } from "@/lib/api/instance";

/************************
 * 작가 기본 정보(이름) 수정 — PATCH /artists/me
 * 생략하거나 null 인 필드는 기존 값을 유지한다
 ************************/

// 보내지 않은 필드는 서버가 기존 값을 유지한다 — 국문 성명은 공백을 받지 않아 비었을 때는 빼고 보낸다
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
