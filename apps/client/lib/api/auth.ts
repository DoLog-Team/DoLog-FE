import { authApiClient, isApiError } from "@/lib/api/instance";
import type {
	ExhibitionAdminLoginRequest,
	ExhibitionAdminLoginResult,
	ExhibitionAdminLoginSuccess,
	SocialLoginFailure,
	SocialLoginRequest,
	SocialLoginResult,
	SocialLoginSuccess,
} from "./auth.types";

export type * from "./auth.types";

export async function loginExhibitionAdmin(entryCode: string): Promise<ExhibitionAdminLoginResult> {
	const body: ExhibitionAdminLoginRequest = { entryCode };

	try {
		const data = await authApiClient<ExhibitionAdminLoginSuccess>("/auth/exhibition/login", {
			method: "POST",
			body: JSON.stringify(body),
		});
		return { ok: true, data };
	} catch (error) {
		return { ok: false, reason: toFailureReason(error) };
	}
}

// instance.ts 가 에러를 message 문자열로만 던져서 상태 코드로 구분한다
function toFailureReason(error: unknown) {
	const message = error instanceof Error ? error.message : "";

	if (message.includes("HTTP 401") || message.includes("HTTP 400")) return "INVALID_CODE" as const;
	if (message.includes("HTTP 429")) return "TOO_MANY_ATTEMPTS" as const;
	if (message.includes("HTTP 410") || message.includes("HTTP 403")) return "EXPIRED" as const;
	return "ERROR" as const;
}

/************************
 * 작가 어드민 소셜 로그인/가입
 * POST auth/social/login
 * 토큰은 BFF(/api/proxy)가 httpOnly 쿠키에 저장하고 응답에서 제거한다
 ************************/

export async function loginArtistSocial(body: SocialLoginRequest): Promise<SocialLoginResult> {
	try {
		const data = await authApiClient<SocialLoginSuccess>("/auth/social/login", {
			method: "POST",
			body: JSON.stringify(body),
		});
		return { ok: true, data };
	} catch (error) {
		return { ok: false, reason: toSocialLoginFailure(error) };
	}
}

function toSocialLoginFailure(error: unknown): SocialLoginFailure {
	// 400: 코드 만료·재사용, redirectUri 불일치 — 인가부터 다시 시작해야 한다
	if (isApiError(error, 400)) return "INVALID_REQUEST";
	// 403: 정지·탈퇴·대상 외 역할
	if (isApiError(error, 403)) return "FORBIDDEN";
	// 409: 다른 계정이 같은 이메일을 사용 중 (자동 병합하지 않음)
	if (isApiError(error, 409)) return "EMAIL_CONFLICT";
	return "ERROR";
}

/************************
 * 로그아웃
 * POST auth/logout
 * BE 응답과 관계없이 BFF 가 토큰 쿠키를 지운다
 ************************/

export async function logout() {
	try {
		await authApiClient("/auth/logout", { method: "POST" });
	} catch {
		// 서버 측 토큰 정리에 실패해도 쿠키는 이미 지워져 로그아웃 상태가 된다
	}
}
