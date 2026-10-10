// 인증 토큰 쿠키 관련 공통 로직 — BFF Route Handler(app/api/proxy)에서만 사용한다
// BE 는 토큰을 JSON 바디로 내려주고(access 1시간 / refresh 7일), FE 는 이를 httpOnly 쿠키로 보관한다

export const ACCESS_TOKEN_COOKIE = "dolog_access_token";
export const REFRESH_TOKEN_COOKIE = "dolog_refresh_token";
// 로그인 여부·계정 종류를 화면(헤더)에서 알기 위한 표시용 쿠키 — 토큰이 아니라서 JS 가 읽을 수 있게 둔다
export const ROLE_COOKIE = "dolog_role";

const ACCESS_TOKEN_FALLBACK_MAX_AGE = 60 * 60;
const REFRESH_TOKEN_FALLBACK_MAX_AGE = 60 * 60 * 24 * 7;
// 만료 직전 토큰으로 요청했다가 401 이 나는 것을 줄이기 위해 쿠키를 조금 일찍 만료시킨다
const EXPIRY_MARGIN_SECONDS = 60;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface SessionTokens {
	accessToken: string;
	refreshToken?: string;
	// 로그인 응답의 role (ARTIST_ADMIN, EXHIBITION_ADMIN 등)
	role?: string;
}

interface CookieWriter {
	set(name: string, value: string, options: CookieOptions): unknown;
	delete(name: string): unknown;
}

interface CookieOptions {
	httpOnly: boolean;
	secure: boolean;
	sameSite: "lax";
	path: string;
	maxAge: number;
}

function cookieOptions(maxAge: number, httpOnly = true): CookieOptions {
	return {
		httpOnly,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge,
	};
}

// JWT payload 의 exp 로 남은 수명을 계산한다 — 파싱에 실패하면 명세상의 기본 수명을 쓴다
function getTokenMaxAge(token: string, fallback: number) {
	try {
		const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
		const { exp } = JSON.parse(atob(payload));
		if (typeof exp !== "number") return fallback;
		return Math.max(exp - Math.floor(Date.now() / 1000) - EXPIRY_MARGIN_SECONDS, 0);
	} catch {
		return fallback;
	}
}

export function setSessionCookies(cookies: CookieWriter, tokens: SessionTokens) {
	cookies.set(
		ACCESS_TOKEN_COOKIE,
		tokens.accessToken,
		cookieOptions(getTokenMaxAge(tokens.accessToken, ACCESS_TOKEN_FALLBACK_MAX_AGE)),
	);
	if (tokens.refreshToken) {
		const refreshMaxAge = getTokenMaxAge(tokens.refreshToken, REFRESH_TOKEN_FALLBACK_MAX_AGE);
		cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, cookieOptions(refreshMaxAge));
		// 로그인 상태 표시는 refresh 토큰과 같은 수명을 가진다
		if (tokens.role) cookies.set(ROLE_COOKIE, tokens.role, cookieOptions(refreshMaxAge, false));
	}
}

export function clearSessionCookies(cookies: CookieWriter) {
	cookies.delete(ACCESS_TOKEN_COOKIE);
	cookies.delete(REFRESH_TOKEN_COOKIE);
	cookies.delete(ROLE_COOKIE);
}

// POST /auth/refresh — 실패하면 null (refresh 토큰 만료 등으로 재로그인이 필요한 상태)
export async function requestAccessToken(refreshToken: string): Promise<string | null> {
	try {
		const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refreshToken }),
			cache: "no-store",
		});
		if (!res.ok) return null;
		const json = await res.json();
		return json?.data?.accessToken ?? null;
	} catch {
		return null;
	}
}
