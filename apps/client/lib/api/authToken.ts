// 백엔드 인증 토큰(Bearer) 임시 저장소. 로그인 UI(#168) 완성 전까지 로컬 테스트용으로 사용.
const ACCESS_TOKEN_KEY = "dolog:accessToken";
const REFRESH_TOKEN_KEY = "dolog:refreshToken";

export const getAccessToken = (): string | null => {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setTokens = (accessToken: string, refreshToken?: string) => {
	if (typeof window === "undefined") return;
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
	if (typeof window === "undefined") return;
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
};
