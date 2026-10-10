// 작가 어드민 소셜 로그인 — 공급자 인가 페이지 이동과 콜백 검증용 요청 상태 관리
// 흐름: 로그인 버튼 → 공급자 로그인·동의 → /artist-admin/login/{provider}/callback → BE 코드 교환

export type SocialProvider = "kakao" | "google";

// 로그인 후 돌아갈 곳이 없으면 두록 홈으로 — 보통 두록 화면 헤더에서 로그인을 시작한다
// 보연 TODO : 로그인 후 redirect를 어디로 할지 기획 확정 필요 — 현재는 두록 홈으로 고정
export const DEFAULT_LOGIN_REDIRECT = "/";

const PENDING_REQUEST_KEY = "dolog_social_login_request";

// NEXT_PUBLIC_ 환경 변수는 빌드 시 문자열로 치환되므로 process.env.XXX 형태로 직접 참조해야 한다
const AUTHORIZE = {
	kakao: {
		url: "https://kauth.kakao.com/oauth/authorize",
		clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
		scope: undefined,
	},
	google: {
		url: "https://accounts.google.com/o/oauth2/v2/auth",
		clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		scope: "openid email profile",
	},
} as const;

interface PendingSocialLogin {
	state: string;
	provider: SocialProvider;
	redirectUri: string;
	redirect?: string;
}

export function isSocialProvider(value: string): value is SocialProvider {
	return value === "kakao" || value === "google";
}

// 로그인 후 이동할 경로 — 외부 사이트로 튕기지 않도록 내부 경로("/...")만 허용한다
export function toSafeRedirect(path: string | null | undefined) {
	if (!path || !path.startsWith("/") || path.startsWith("//")) return undefined;
	return path;
}

function getRedirectUri(provider: SocialProvider) {
	return `${window.location.origin}/artist-admin/login/${provider}/callback`;
}

export function startSocialLogin(provider: SocialProvider, redirect?: string) {
	const { url, clientId, scope } = AUTHORIZE[provider];
	const redirectUri = getRedirectUri(provider);
	// 콜백이 이 브라우저에서 시작한 요청인지 확인하기 위한 일회성 값
	const state = crypto.randomUUID();

	const pending: PendingSocialLogin = { state, provider, redirectUri, redirect };
	sessionStorage.setItem(PENDING_REQUEST_KEY, JSON.stringify(pending));

	const params = new URLSearchParams({
		client_id: clientId ?? "",
		redirect_uri: redirectUri,
		response_type: "code",
		state,
	});
	if (scope) params.set("scope", scope);

	window.location.assign(`${url}?${params}`);
}

// 저장된 요청을 꺼내면서 바로 지운다 — 같은 요청으로 두 번 로그인하지 않도록 일회성으로 사용
export function consumePendingSocialLogin(): PendingSocialLogin | null {
	const raw = sessionStorage.getItem(PENDING_REQUEST_KEY);
	sessionStorage.removeItem(PENDING_REQUEST_KEY);
	if (!raw) return null;

	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
