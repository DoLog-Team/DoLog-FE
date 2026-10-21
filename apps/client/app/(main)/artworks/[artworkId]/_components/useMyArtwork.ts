"use client";

import { useEffect, useState } from "react";
import { authApiClient } from "@/lib/api/instance";

// GET artworks/{artworkId}/me (본인 작품만) 중 화면에 필요한 값 — 공개 상세 응답에는 공개 상태·출품 전시가 없다
export interface MyArtworkState {
	status: "DRAFT" | "PUBLISHED";
	exhibitionId: string | null;
}

/**
 * 작가 본인 작품일 때만 공개 상태·출품 전시를 불러온다 (작품 관리 메뉴에서 사용)
 */
export function useMyArtwork(artworkId: string, isMine: boolean) {
	const [myArtwork, setMyArtwork] = useState<MyArtworkState | null>(null);

	useEffect(() => {
		if (!isMine) return;
		let ignore = false;
		authApiClient<MyArtworkState>(`/artworks/${artworkId}/me`)
			.then(({ status, exhibitionId }) => {
				if (!ignore) setMyArtwork({ status, exhibitionId });
			})
			.catch(() => {});
		return () => {
			ignore = true;
		};
	}, [isMine, artworkId]);

	return [myArtwork, setMyArtwork] as const;
}
