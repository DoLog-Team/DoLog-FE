"use client";

import { useEffect } from "react";
import { readVisitorId, saveVisitorId } from "@/lib/visitor";
import { recordArtistView } from "../_api/getArtist";

// 두록 작가 상세에 일정 시간 머문 뒤 조회수를 한 번 기록한다 (작품 상세 useRecordArtworkView 와 같은 기준 3초)
const VIEW_DELAY_MS = 3000;

export function useRecordArtistView(artistId: string) {
	useEffect(() => {
		const timer = setTimeout(() => {
			recordArtistView(artistId, readVisitorId())
				.then((res) => saveVisitorId(res.visitorId))
				// 조회수 기록 실패는 화면에 영향이 없어 무시
				.catch(() => {});
		}, VIEW_DELAY_MS);
		return () => clearTimeout(timer);
	}, [artistId]);
}
