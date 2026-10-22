"use client";

import { useEffect, useState } from "react";
import {
	type ExhibitionCustom,
	getExhibitionCustom,
} from "@/app/[exhibitionId]/_api/getExhibitionCustom";
import { FloatingCta } from "@/components/common/FloatingCta/FloatingCta";

/**
 * 관련 전시 보기 버튼 — 출품된 전시가 있을 때만 그린다
 * 배경·글자색은 전시 커스텀 컬러의 CTA 색 (없으면 기본 CTA 토큰)
 */
interface RelatedExhibitionCtaProps {
	exhibitionId: string;
	// 전시 홈 주소는 slug 우선 (다른 화면의 전시 링크와 같음)
	slug?: string | null;
}

export function RelatedExhibitionCta({ exhibitionId, slug }: RelatedExhibitionCtaProps) {
	const [custom, setCustom] = useState<ExhibitionCustom | null>(null);

	useEffect(() => {
		let ignore = false;
		getExhibitionCustom(exhibitionId).then((data) => {
			if (!ignore) setCustom(data);
		});
		return () => {
			ignore = true;
		};
	}, [exhibitionId]);

	return (
		<FloatingCta
			href={`/${slug ?? exhibitionId}`}
			label="관련 전시 감상하기"
			closeLabel="관련 전시 보기 닫기"
			className="bg-cta-bg text-cta-text"
			style={{
				...(custom?.cta_bg && { backgroundColor: custom.cta_bg }),
				...(custom?.cta_text && { color: custom.cta_text }),
			}}
		/>
	);
}
