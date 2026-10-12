import { authApiClient, isApiError } from "@/lib/api/instance";

// 전시 어드민 화면에서 버튼으로 하는 동작 — 클라이언트 컴포넌트에서 BFF 를 거쳐 호출한다

export type ActionFailure = "UNAUTHORIZED" | "FAILED";

// 401 은 세션 만료라 로그인 화면으로 보낸다
export function toActionFailure(error: unknown): ActionFailure {
	return isApiError(error, 401) ? "UNAUTHORIZED" : "FAILED";
}

/************************
 * 전시 게시
 * POST exhibitions/{exhibitionId}/publish
 * 게시 시각과 만료 시각("yyyy-MM-dd HH:mm:ss")을 받아 날짜만 쓴다
 ************************/

interface PublishResponse {
	publishedAt: string;
	expiresAt: string | null;
}

export type PublishResult =
	| { ok: true; publishedAt: string; expiresAt: string | null }
	| { ok: false; reason: ActionFailure };

export async function publishExhibition(exhibitionId: string): Promise<PublishResult> {
	try {
		const data = await authApiClient<PublishResponse>(`/exhibitions/${exhibitionId}/publish`, {
			method: "POST",
		});
		return {
			ok: true,
			publishedAt: data.publishedAt.slice(0, 10),
			expiresAt: data.expiresAt?.slice(0, 10) ?? null,
		};
	} catch (error) {
		return { ok: false, reason: toActionFailure(error) };
	}
}
