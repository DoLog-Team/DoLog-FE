import { redirect } from "next/navigation";
import { cache } from "react";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { MyAccount } from "./account.types";
import { isApiError } from "./instance";
import { serverApiClient } from "./server";

export type * from "./account.types";

/************************
 * 전시 어드민의 전시 ID
 * GET accounts/me
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
