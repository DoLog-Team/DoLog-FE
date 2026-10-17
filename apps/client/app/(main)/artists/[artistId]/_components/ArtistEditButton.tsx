"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MyAccount } from "@/lib/api/account.types";
import { authApiClient } from "@/lib/api/instance";
import { useAuthRole } from "@/lib/auth/useAuthRole";

const PROFILE_EDIT_PATH = "/artist-admin/profile/edit";

/**
 * 작가 편집 버튼 (피그마 000401-8903) — 본인 프로필일 때만 오른쪽 아래에 뜬다
 * 페이지는 공개라 서버에서 로그인 정보를 읽지 않고, 작가 계정으로 로그인했을 때만 accounts/me 로 본인인지 확인한다
 */
export function ArtistEditButton({ artistId }: { artistId: string }) {
	const role = useAuthRole();
	const [isMine, setIsMine] = useState(false);

	useEffect(() => {
		if (role !== "artist") return;
		let ignore = false;
		authApiClient<MyAccount>("/accounts/me")
			.then((account) => {
				if (!ignore) setIsMine(account.artistId === artistId);
			})
			// 확인 실패 시 버튼을 띄우지 않는다
			.catch(() => {});
		return () => {
			ignore = true;
		};
	}, [role, artistId]);

	if (role !== "artist" || !isMine) return null;

	return (
		// 하단 탭바(46px) 위로 모바일 16px, 데스크탑 32px 띄움
		<Link
			href={PROFILE_EDIT_PATH}
			aria-label="프로필 수정"
			className="fixed right-4 bottom-[62px] z-30 flex size-[50px] items-center justify-center rounded-full bg-fg-inverse shadow-[0_0_20px_rgba(0,0,0,0.2)] min-[721px]:right-8 min-[721px]:bottom-[78px]"
		>
			<span className="size-7 bg-icon-inverse mask-[url(/icons/edit.svg)] mask-size-[100%] mask-no-repeat" />
		</Link>
	);
}
