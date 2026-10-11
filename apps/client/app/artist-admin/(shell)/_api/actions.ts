import { authApiClient, isApiError } from "@/lib/api/instance";
import type { JoinableExhibition } from "../_types";

// 작가 어드민 홈(마이페이지)에서 버튼으로 하는 동작 — 클라이언트 컴포넌트에서 BFF 를 거쳐 호출한다
// 실패하면 화면에 보여줄 문구를 담은 Error 를 던진다

const FALLBACK_MESSAGE = "잠시 뒤 다시 시도해주세요.";

// 백엔드가 준 안내 문구를 그대로 쓰고, 없으면 기본 문구
export function toErrorMessage(error: unknown) {
	return (isApiError(error) && error.serverMessage) || FALLBACK_MESSAGE;
}

/************************
 * 전시 참여하기
 * POST exhibitions/join/validate — 1단계: 코드 확인 (상태 변경 없음)
 * POST exhibitions/join — 2단계: 자기소개와 함께 참여 신청 (PENDING)
 ************************/

interface JoinCodeValidateResponse {
	exhibitionId: string;
	exhibitionTitle: string;
	greetingFormat: string | null;
}

export type JoinCodeResult =
	| { ok: true; exhibition: JoinableExhibition }
	// INVALID_CODE: 없는 코드 / FAILED: 만료(403)·이미 신청(409) 등 — message 는 백엔드 문구
	| { ok: false; reason: "INVALID_CODE" | "FAILED"; message: string };

export async function validateJoinCode(joinCode: string): Promise<JoinCodeResult> {
	try {
		const data = await authApiClient<JoinCodeValidateResponse>("/exhibitions/join/validate", {
			method: "POST",
			body: JSON.stringify({ joinCode }),
		});
		return {
			ok: true,
			exhibition: {
				exhibitionId: data.exhibitionId,
				name: data.exhibitionTitle,
				greetingFormat: data.greetingFormat,
				joinCode,
			},
		};
	} catch (error) {
		if (isApiError(error, 400)) return { ok: false, reason: "INVALID_CODE", message: "" };
		return { ok: false, reason: "FAILED", message: toErrorMessage(error) };
	}
}

export async function joinExhibition(joinCode: string, greeting: string) {
	await authApiClient("/exhibitions/join", {
		method: "POST",
		body: JSON.stringify({ joinCode, greeting }),
	});
}

/************************
 * 전시 나가기 — DELETE exhibitions/{exhibitionId}/artists/me
 ************************/

export async function leaveExhibition(exhibitionId: string) {
	await authApiClient(`/exhibitions/${exhibitionId}/artists/me`, { method: "DELETE" });
}

/************************
 * 작품 삭제 — DELETE artworks/{artworkId}
 ************************/

export async function deleteArtwork(artworkId: string) {
	await authApiClient(`/artworks/${artworkId}`, { method: "DELETE" });
}

/************************
 * 계정 탈퇴 — DELETE accounts/me
 ************************/

export async function withdrawAccount() {
	await authApiClient("/accounts/me", { method: "DELETE" });
}
