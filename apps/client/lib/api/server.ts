import { cookies } from "next/headers";
import {
	ACCESS_TOKEN_COOKIE,
	API_BASE_URL,
	REFRESH_TOKEN_COOKIE,
	requestAccessToken,
} from "@/lib/auth/session";
import { createApiClient } from "./instance";

// 인증이 필요한 API (서버 컴포넌트 전용) — 쿠키를 직접 읽을 수 있어 BFF 를 거치지 않고 백엔드를 호출한다
// 서버 컴포넌트는 쿠키를 쓸 수 없으므로, access 가 만료됐으면 이번 렌더링에서만 refresh 로 새 토큰을 받아 쓴다
// (쿠키 갱신은 다음 클라이언트 요청 때 BFF 가 처리)
// next/headers 를 쓰므로 클라이언트 컴포넌트에서 import 하면 안 된다 — 클라이언트는 authApiClient 사용
export const serverApiClient = createApiClient(API_BASE_URL, async () => {
	const cookieStore = await cookies();
	const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
	const accessToken =
		cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ??
		(refreshToken ? await requestAccessToken(refreshToken) : null);

	const headers: Record<string, string> = {};
	if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
	return headers;
});
