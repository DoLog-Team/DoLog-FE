export interface ExhibitionAdminLoginRequest {
	entry_code: string;
}

// 실패 사유 — BE 응답 코드 확정 후 매핑 필요
export type ExhibitionAdminLoginFailure =
	| "INVALID_CODE"
	| "TOO_MANY_ATTEMPTS"
	| "EXPIRED"
	| "ERROR";

export interface ExhibitionAdminLoginSuccess {
	is_first_login: boolean;
}

export type ExhibitionAdminLoginResult =
	| { ok: true; data: ExhibitionAdminLoginSuccess }
	| { ok: false; reason: ExhibitionAdminLoginFailure; retry_after_seconds?: number };
