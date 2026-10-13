// 로그인한 계정 — artist: 작가(일반 어드민) / admin: 전시 관리자(슈퍼 어드민)
export type AccountRole = "artist" | "admin";

// 프로필 메뉴를 연 위치 — client: 두록 화면 / admin: 어드민 화면
export type AccountPlace = "client" | "admin";

export interface ProfileMenuLink {
	label: string;
	href: string;
}

export interface ProfileMenu {
	// 내 어드민 홈으로 이동 — 두록 화면에서만 표시 (어드민 화면에서는 이미 어드민 안이라 표시 안 함)
	homeLink: ProfileMenuLink;
	// 다른 계정으로 전환 — 로그아웃 확인 모달을 거쳐 해당 로그인 화면으로 이동
	switchLogin: ProfileMenuLink;
}

const ARTIST_LOGIN_HREF = "/artist-admin/login";
const ADMIN_LOGIN_HREF = "/admin/login";

// 계정별 프로필 메뉴 (Figma NAV-04·05·06·08·09·10)
export const PROFILE_MENU: Record<AccountRole, ProfileMenu> = {
	artist: {
		homeLink: { label: "마이페이지", href: "/artist-admin" },
		switchLogin: { label: "전시 관리자로 로그인", href: ADMIN_LOGIN_HREF },
	},
	admin: {
		homeLink: { label: "관리자 홈", href: "/admin" },
		switchLogin: { label: "작가로 로그인", href: ARTIST_LOGIN_HREF },
	},
};
