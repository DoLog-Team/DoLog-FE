"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
	type ExhibitionCustom,
	getExhibitionCustom,
} from "@/app/[exhibitionId]/_api/getExhibitionCustom";

/**
 * 관련 전시 보기 버튼 — 출품된 전시가 있을 때만 그린다
 * 배경·글자색은 전시 커스텀 컬러의 CTA 색 (없으면 기본 CTA 토큰), 하단 탭바 위 가운데에 고정, X 로 닫는다
 */
interface RelatedExhibitionCtaProps {
	exhibitionId: string;
	// 전시 홈 주소는 slug 우선 (다른 화면의 전시 링크와 같음)
	slug?: string | null;
}

export function RelatedExhibitionCta({ exhibitionId, slug }: RelatedExhibitionCtaProps) {
	const [closed, setClosed] = useState(false);
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

	if (closed) return null;

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-[62px] z-20 flex justify-center px-4 min-[721px]:bottom-[78px] min-[721px]:px-8">
			<div
				className="pointer-events-auto flex h-9 items-center rounded-lg bg-cta-bg px-1 text-cta-text shadow-[0_0_20px_rgba(0,0,0,0.2)]"
				style={{
					...(custom?.cta_bg && { backgroundColor: custom.cta_bg }),
					...(custom?.cta_text && { color: custom.cta_text }),
				}}
			>
				<Link
					href={`/${slug ?? exhibitionId}`}
					className="flex h-full items-center px-2 text-body2-bold whitespace-nowrap"
				>
					관련 전시 감상하기
				</Link>
				<button
					type="button"
					aria-label="관련 전시 보기 닫기"
					onClick={() => setClosed(true)}
					className="flex size-5 cursor-pointer items-center justify-center"
				>
					<span className="size-5 bg-current mask-[url(/icons/close.svg)] mask-size-[100%] mask-no-repeat" />
				</button>
			</div>
		</div>
	);
}
