// 비로그인 방문자 구분용 ID — 작품 좋아요·조회수 기록에 쓴다
// BE 도 visitor_id 쿠키를 내려주지만 BE 도메인 쿠키라(다른 사이트) 브라우저에 따라 막힐 수 있어,
// 응답의 visitorId 를 우리 도메인 쿠키에 따로 저장하고 X-Visitor-Id 헤더로 보낸다
// 서버 렌더링에서도 읽을 수 있게 localStorage 가 아니라 쿠키에 둔다

export const VISITOR_COOKIE = "dolog_visitor_id";
export const VISITOR_HEADER = "X-Visitor-Id";

// BE 쿠키와 같은 1년
const MAX_AGE = 60 * 60 * 24 * 365;

export function readVisitorId(): string | null {
	const value = document.cookie
		.split("; ")
		.find((cookie) => cookie.startsWith(`${VISITOR_COOKIE}=`))
		?.split("=")[1];
	return value ? decodeURIComponent(value) : null;
}

export function saveVisitorId(visitorId: string) {
	// biome-ignore lint/suspicious/noDocumentCookie: 서버 렌더링에서도 읽어야 해서 쿠키에 저장
	document.cookie = `${VISITOR_COOKIE}=${encodeURIComponent(visitorId)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
}

export function visitorHeaders(visitorId: string | null | undefined): HeadersInit {
	return visitorId ? { [VISITOR_HEADER]: visitorId } : {};
}
