// 로그인 화면 주소에 로그인 후 돌아올 경로(?redirect=)를 붙인다
// 두록 화면에서 로그인하면 그 화면으로, 어드민에서 계정을 전환하면 새 계정의 어드민 홈으로 돌아간다
export function withLoginRedirect(loginHref: string, redirect: string) {
	return `${loginHref}?${new URLSearchParams({ redirect })}`;
}
