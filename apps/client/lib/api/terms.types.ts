// POST /accounts/me/terms
export interface TermsAgreementRequest {
	termsVersion: string;
	age14OrOverConfirmed: boolean;
	serviceTermsAgreed: boolean;
	privacyAgreed: boolean;
	promotionAgreed: boolean;
	marketingAgreed: boolean;
	adReceiveAgreed: boolean;
}

// NO_ENDPOINT: API 없음(404·네트워크 오류), REJECTED: 서버가 요청을 거절
export type TermsAgreementFailure = "NO_ENDPOINT" | "REJECTED";

export type TermsAgreementResult = { ok: true } | { ok: false; reason: TermsAgreementFailure };
