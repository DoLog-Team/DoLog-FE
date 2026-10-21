"use client";

import { EditFab } from "@/components/common/EditFab/EditFab";
import { useIsOwnArtist } from "@/lib/auth/useIsOwnArtist";

const PROFILE_EDIT_PATH = "/artist-admin/profile/edit";

/**
 * 작가 편집 버튼 — 본인 프로필일 때만 오른쪽 아래에 뜬다
 */
export function ArtistEditButton({ artistId }: { artistId: string }) {
	const isMine = useIsOwnArtist([artistId]);

	if (!isMine) return null;

	return <EditFab label="프로필 수정" href={PROFILE_EDIT_PATH} />;
}
