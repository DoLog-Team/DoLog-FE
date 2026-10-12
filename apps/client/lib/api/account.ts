import { redirect } from "next/navigation";
import { cache } from "react";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { MyAccount } from "./account.types";
import { isApiError } from "./instance";
import { serverApiClient } from "./server";

export type * from "./account.types";

// 서버 컴포넌트 전용 (serverApiClient 사용)

/************************
 * 전시 어드민의 전시 ID
 * GET accounts/me
 * 전시 어드민 화면의 /exhibitions/{exhibitionId} 호출에 쓴다. 한 번의 렌더링에서는 한 번만 부른다
 * 세션이 만료됐거나 전시가 없는 계정이면 로그인 화면으로 보낸다
 ************************/

export const getMyExhibitionId = cache(async (): Promise<string> => {
	let account: MyAccount;
	try {
		account = await serverApiClient<MyAccount>("/accounts/me", { cache: "no-store" });
	} catch (error) {
		if (isApiError(error, 401)) redirect(ADMIN_LOGIN_HREF);
		throw error;
	}

	if (!account.exhibitionId) redirect(ADMIN_LOGIN_HREF);
	return account.exhibitionId;
});
