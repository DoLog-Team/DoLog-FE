import { authApiClient } from "@/lib/api/instance";
import type {
	OptionalTermsRequest,
	TermsAgreementRequest,
	TermsAgreementResult,
} from "./terms.types";

export type * from "./terms.types";

export async function saveTermsAgreement(
	body: TermsAgreementRequest,
): Promise<TermsAgreementResult> {
	try {
		await authApiClient("/accounts/me/terms", {
			method: "POST",
			body: JSON.stringify(body),
		});
		return { ok: true };
	} catch (error) {
		return { ok: false, reason: toFailureReason(error) };
	}
}

// instance.ts 가 에러를 message 문자열로만 던져서 상태 코드로 구분한다
function toFailureReason(error: unknown) {
	const message = error instanceof Error ? error.message : "";

	// 404 나 네트워크 오류(HTTP 응답 없음)는 API 가 아직 없는 경우로 본다
	if (!message.startsWith("HTTP") || message.startsWith("HTTP 404")) return "NO_ENDPOINT" as const;
	return "REJECTED" as const;
}

/************************
 * 선택 약관 동의 변경·철회 (가입 후 마이페이지 계정 관리)
 * PATCH /accounts/me/terms (선택 약관만) — 필수 약관은 최초 동의 이후 변경 불가
 ************************/

export async function updateOptionalTerms(
	body: OptionalTermsRequest,
): Promise<TermsAgreementResult> {
	try {
		await authApiClient("/accounts/me/terms", {
			method: "PATCH",
			body: JSON.stringify(body),
		});
		return { ok: true };
	} catch (error) {
		return { ok: false, reason: toFailureReason(error) };
	}
}
