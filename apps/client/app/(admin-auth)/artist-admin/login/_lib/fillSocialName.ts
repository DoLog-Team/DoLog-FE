import { updateMyArtistProfile } from "@/app/artist-admin/profile/edit/_api/actions";
import { authApiClient } from "@/lib/api/instance";

// 소셜 가입 시 받아온 이름(profile.name)을 작가 공통 프로필의 국문 성명에 넣는다
// 마이페이지·프로필 수정은 공통 프로필 nameKo 를 보여주고, 소셜 이름은 로그인 응답에만 한 번 오므로 여기서 저장해 둔다
// 국문 성명이 이미 있으면 덮어쓰지 않는다. 실패해도 로그인 흐름은 막지 않는다
export async function fillProfileNameFromSocial(name: string | null) {
	const nameKo = name?.trim();
	if (!nameKo) return;

	try {
		const profile = await authApiClient<{ nameKo: string | null }>("/artist-profiles/me", {
			cache: "no-store",
		});
		if (profile.nameKo?.trim()) return;
		await updateMyArtistProfile({ nameKo }, null);
	} catch {
		// 이름 자동 입력은 부가 기능이라 실패해도 무시한다 (프로필 수정에서 직접 입력 가능)
	}
}

// 약관 동의 전에는 프로필 수정이 막혀 있을 수 있어, 약관 동의를 마친 뒤 한 번 더 시도하도록 이름을 잠시 보관한다
const PENDING_NAME_KEY = "dolog_pending_social_name";

export function keepSocialNameForTerms(name: string | null) {
	if (name?.trim()) sessionStorage.setItem(PENDING_NAME_KEY, name.trim());
}

export async function fillPendingSocialName() {
	const name = sessionStorage.getItem(PENDING_NAME_KEY);
	sessionStorage.removeItem(PENDING_NAME_KEY);
	await fillProfileNameFromSocial(name);
}
