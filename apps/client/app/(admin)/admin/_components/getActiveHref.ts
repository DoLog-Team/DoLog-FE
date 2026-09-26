// 현재 주소와 가장 길게 겹치는 메뉴 하나만 활성 — 상세 페이지(/admin/artists/1)에서도 부모 메뉴가 유지됨
export const getActiveHref = (pathname: string, hrefs: readonly string[]) =>
	hrefs
		.filter((href) => pathname === href || pathname.startsWith(`${href}/`))
		.sort((a, b) => b.length - a.length)[0];
