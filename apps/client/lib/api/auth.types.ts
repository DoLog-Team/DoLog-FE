export interface ExhibitionAdminLoginRequest {
	entryCode: string;
}

// TODO : 실패 사유 — BE 응답 코드 확정 후 매핑 필요
export type ExhibitionAdminLoginFailure =
	| "INVALID_CODE"
	| "TOO_MANY_ATTEMPTS"
	| "EXPIRED"
	| "ERROR";

// accessToken/refreshToken 은 BFF 가 쿠키로 옮기고 응답에서 제거한다
export interface ExhibitionAdminLoginSuccess {
	exhibitionId: string;
	needsTermsAgreement: boolean;
	role: string;
}

export type ExhibitionAdminLoginResult =
	| { ok: true; data: ExhibitionAdminLoginSuccess }
	| { ok: false; reason: ExhibitionAdminLoginFailure; retry_after_seconds?: number };

export type SocialLoginProvider = "KAKAO" | "GOOGLE";

export interface SocialLoginRequest {
	provider: SocialLoginProvider;
	authorizationCode: string;
	redirectUri: string;
}

// accessToken/refreshToken 은 BFF 가 쿠키로 옮기고 응답에서 제거한다
export interface SocialLoginSuccess {
	isFirstLogin: boolean;
	needsTermsAgreement: boolean;
	profile: {
		name: string | null;
		email: string | null;
	};
	role: string;
}

export type SocialLoginFailure =
	| "CANCELLED"
	| "INVALID_REQUEST"
	| "FORBIDDEN"
	| "EMAIL_CONFLICT"
	| "ERROR";

export type SocialLoginResult =
	| { ok: true; data: SocialLoginSuccess }
	| { ok: false; reason: SocialLoginFailure };
