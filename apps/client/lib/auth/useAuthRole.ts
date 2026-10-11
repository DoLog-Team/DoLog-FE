"use client";

import { useSyncExternalStore } from "react";
import type { AccountRole } from "@/components/common/HeaderAccountActions/profileMenu";

// 헤더 등 화면에서 로그인 상태를 알기 위한 훅
// 토큰은 httpOnly 라 읽을 수 없으므로, BFF 가 로그인 때 함께 저장하는 표시용 쿠키(dolog_role)로 판단한다
// API 를 호출하지 않아 비로그인 방문자에게는 추가 요청이 없다

// guest: 비로그인 / 그 외: 로그인한 계정
export type AuthRole = "guest" | AccountRole;

const ROLE_COOKIE = "dolog_role";
const AUTH_CHANGE_EVENT = "dolog:auth-change";

// BE role → 화면에서 쓰는 계정 종류
const ROLE_MAP: Record<string, AccountRole> = {
	ARTIST_ADMIN: "artist",
	EXHIBITION_ADMIN: "admin",
};

function readRole(): AuthRole {
	const value = document.cookie
		.split("; ")
		.find((cookie) => cookie.startsWith(`${ROLE_COOKIE}=`))
		?.split("=")[1];
	return (value && ROLE_MAP[value]) || "guest";
}

// 쿠키는 바뀌어도 이벤트가 없어서, 로그인·로그아웃 직후 직접 알린다
export function notifyAuthChange() {
	window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
	window.addEventListener(AUTH_CHANGE_EVENT, onChange);
	return () => window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
}

// 서버 렌더링 중에는 쿠키를 읽지 않아 null(확인 전) — 화면에서 잘못된 버튼이 잠깐 보이지 않게 비워 둔다
export function useAuthRole(): AuthRole | null {
	return useSyncExternalStore(subscribe, readRole, () => null);
}
