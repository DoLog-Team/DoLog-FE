"use client";

import { Button } from "components";
import { useRef } from "react";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import { TrackedLink } from "@/components/common/TrackedLink";
import type { ExhibitionDetail } from "@/lib/api/exhibition";
import { EXHIBITION_TYPE_LABEL } from "@/lib/constants/exhibition";

interface ExhibitionIntroProps {
	exhibition: ExhibitionDetail;
	exhibitionId: string;
}

export function ExhibitionIntroSection({ exhibition, exhibitionId }: ExhibitionIntroProps) {
	const entryTime = useRef(Date.now());

	const typeLabel =
		exhibition.exhibitionType != null
			? (EXHIBITION_TYPE_LABEL[exhibition.exhibitionType] ?? exhibition.exhibitionType)
			: null;

	const rows = [
		{ label: "주최 대학", value: exhibition.univName },
		{ label: "학과", value: exhibition.deptName },
		...(typeLabel ? [{ label: "유형", value: typeLabel }] : []),
	];

	return (
		<section className="flex flex-col pb-6 pt-4 min-[721px]:pt-0" data-section="intro">
			<Title title={exhibition.title} className="min-[721px]:mt-8 min-[721px]:mb-5" />
			<RowList rows={rows} />
			{/* 모바일 전용 CTA — 데스크탑은 page.tsx의 ExhibitionDetailSection 아래에 위치 */}
			<div className="min-[721px]:hidden">
				<TrackedLink
					href={`/${exhibitionId}/artwork`}
					eventName="Exhibition CTA Clicked"
					eventProps={{
						exhibition_id: exhibitionId,
						time_to_click_sec: Math.round((Date.now() - entryTime.current) / 1000),
					}}
				>
					<Button variant="main" className="w-full mt-7">
						전시물 감상하기
					</Button>
				</TrackedLink>
			</div>
		</section>
	);
}
