import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import {
	ACCESS_TOKEN_COOKIE,
	API_BASE_URL,
	clearSessionCookies,
	REFRESH_TOKEN_COOKIE,
	requestAccessToken,
	setSessionCookies,
} from "@/lib/auth/session";

// BFF 프록시 — 클라이언트 컴포넌트의 인증 API 요청을 받아 쿠키의 토큰을 Bearer 로 붙여 백엔드에 전달한다
// /api/proxy/accounts/me → {API_BASE_URL}/accounts/me

// 응답 바디로 토큰을 발급하는 엔드포인트 — 토큰은 쿠키에 저장하고 클라이언트에는 내려주지 않는다
const TOKEN_ISSUING_PATHS = ["auth/login", "auth/exhibition/login", "auth/social/login"];
const LOGOUT_PATH = "auth/logout";

const FORWARDED_REQUEST_HEADERS = ["content-type", "accept"];

interface RouteContext {
	params: Promise<{ path: string[] }>;
}

async function handler(request: NextRequest, { params }: RouteContext) {
	const path = (await params).path.join("/");
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
	let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

	const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer();

	const send = (token?: string) => {
		const headers = new Headers();
		for (const name of FORWARDED_REQUEST_HEADERS) {
			const value = request.headers.get(name);
			if (value) headers.set(name, value);
		}
		if (token) headers.set("Authorization", `Bearer ${token}`);

		return fetch(`${API_BASE_URL}/${path}${request.nextUrl.search}`, {
			method: request.method,
			headers,
			body,
			cache: "no-store",
		});
	};

	const refresh = async () => {
		if (!refreshToken) return undefined;
		const newAccessToken = await requestAccessToken(refreshToken);
		if (newAccessToken) {
			setSessionCookies(cookieStore, { accessToken: newAccessToken });
			return newAccessToken;
		}
		clearSessionCookies(cookieStore);
		return undefined;
	};

	// access 쿠키가 만료돼 사라졌으면 요청 전에 미리 재발급한다
	if (!accessToken) accessToken = await refresh();

	let res = await send(accessToken);

	// 서버 측에서 토큰이 무효화된 경우 한 번만 재발급 후 재시도한다
	if (res.status === 401 && accessToken) {
		accessToken = await refresh();
		if (accessToken) res = await send(accessToken);
	}

	if (path === LOGOUT_PATH) {
		clearSessionCookies(cookieStore);
	}

	if (TOKEN_ISSUING_PATHS.includes(path) && res.ok) {
		const json = await res.json();
		const { accessToken: issuedAccess, refreshToken: issuedRefresh, ...data } = json.data ?? {};
		if (issuedAccess) {
			setSessionCookies(cookieStore, { accessToken: issuedAccess, refreshToken: issuedRefresh });
		}
		return Response.json({ ...json, data }, { status: res.status });
	}

	const contentType = res.headers.get("content-type");
	return new Response(res.body, {
		status: res.status,
		headers: contentType ? { "content-type": contentType } : undefined,
	});
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
