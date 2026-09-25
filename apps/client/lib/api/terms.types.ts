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
