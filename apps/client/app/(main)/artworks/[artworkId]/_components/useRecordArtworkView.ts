"use client";

import { useEffect } from "react";
import { recordArtworkView } from "@/lib/api/artwork";
import { readVisitorId, saveVisitorId } from "@/lib/visitor";

// 작품 상세에 일정 시간 머문 뒤 조회수를 한 번 기록한다 (같은 방문자는 BE 가 작품마다 한 번만 셈)
// TODO: 머무는 시간 기준 기획 확인 — 명세는 "일정 시간"만 있음, 우선 3초
const VIEW_DELAY_MS = 3000;

export function useRecordArtworkView(artworkId: string) {
	useEffect(() => {
		const timer = setTimeout(() => {
			recordArtworkView(artworkId, readVisitorId())
				.then((res) => saveVisitorId(res.visitorId))
				// 조회수 기록 실패는 화면에 영향이 없어 무시
				.catch(() => {});
		}, VIEW_DELAY_MS);
		return () => clearTimeout(timer);
	}, [artworkId]);
}
