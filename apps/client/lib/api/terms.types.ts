// 필드명 — BE 확정 후 매핑 필요
export interface TermsAgreementRequest {
	age_over_14: boolean;
	service_terms: boolean;
	privacy_collection: boolean;
	exhibition_promotion: boolean;
	marketing: boolean;
	advertising: boolean;
	terms_version: string;
}

// NO_ENDPOINT: API 없음(404·네트워크 오류), REJECTED: 서버가 요청을 거절
export type TermsAgreementFailure = "NO_ENDPOINT" | "REJECTED";

export type TermsAgreementResult = { ok: true } | { ok: false; reason: TermsAgreementFailure };
