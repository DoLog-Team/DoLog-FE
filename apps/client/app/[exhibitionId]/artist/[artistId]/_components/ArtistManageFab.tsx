"use client";

import { EditFab } from "@/components/common/EditFab/EditFab";
import { Engagement } from "@/components/common/Engagement/Engagement";
import { OverflowMenuList } from "@/components/common/OverflowMenu/OverflowMenuList";
import { useIsOwnArtist } from "@/lib/auth/useIsOwnArtist";

const PROFILE_EDIT_PATH = "/artist-admin/profile/edit";

interface ArtistManageFabProps {
	artistId: string;
	viewCount: number;
	likeCount: number;
}

/**
 * 작가 관리 메뉴 버튼 — 작가 본인일 때만 연필 버튼이 뜬다
 * 메뉴: 조회·좋아요 현황 / 편집하기(→ 프로필 수정) · 전시 작가 상세와 두록 작가 상세에서 같이 쓴다
 */
export function ArtistManageFab({ artistId, viewCount, likeCount }: ArtistManageFabProps) {
	const isMine = useIsOwnArtist([artistId]);

	if (!isMine) return null;

	return (
		<EditFab
			label="작가 관리 메뉴"
			menu={(close) => (
				<OverflowMenuList
					items={[{ label: "편집하기", icon: "/icons/edit.svg", href: PROFILE_EDIT_PATH }]}
					onSelect={close}
					header={
						<div className="flex justify-center py-2.5">
							<Engagement viewCount={viewCount} likeCount={likeCount} />
						</div>
					}
				/>
			)}
		/>
	);
}
