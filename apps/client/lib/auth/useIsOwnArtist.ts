"use client";

import { useEffect, useState } from "react";
import type { MyAccount } from "@/lib/api/account.types";
import { authApiClient } from "@/lib/api/instance";
import { useAuthRole } from "./useAuthRole";

/**
 * 로그인한 작가가 artistIds 중 한 명인지 — 작가 상세·작품 상세의 본인 전용 버튼에 쓴다
 * 페이지는 공개라 서버에서 로그인 정보를 읽지 않고, 작가 계정으로 로그인했을 때만 accounts/me 로 확인한다
 */
export function useIsOwnArtist(artistIds: string[]) {
	const role = useAuthRole();
	const [myArtistId, setMyArtistId] = useState<string | null>(null);

	useEffect(() => {
		if (role !== "artist") return;
		let ignore = false;
		authApiClient<MyAccount>("/accounts/me")
			.then((account) => {
				if (!ignore) setMyArtistId(account.artistId);
			})
			// 확인 실패 시 본인이 아닌 것으로 본다
			.catch(() => {});
		return () => {
			ignore = true;
		};
	}, [role]);

	return role === "artist" && !!myArtistId && artistIds.includes(myArtistId);
}
