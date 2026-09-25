"use client";

import { useState } from "react";
import type { MyExhibition } from "../../_mocks/exhibitions";
import { ExhibitionCard } from "../ExhibitionCard";
import { ListToggleButton } from "../ListToggleButton";
import { SectionHeader } from "../SectionHeader";

const COLLAPSED_COUNT = 4;

// 수락 대기중 먼저, 그 안에서는 최근 수락순
const sortExhibitions = (exhibitions: MyExhibition[]) =>
	[...exhibitions].sort((a, b) => {
		const aPending = a.acceptedAt === null;
		const bPending = b.acceptedAt === null;
		if (aPending !== bPending) return aPending ? -1 : 1;
		return (b.acceptedAt ?? "").localeCompare(a.acceptedAt ?? "");
	});

interface MyExhibitionSectionProps {
	exhibitions: MyExhibition[];
}

export function MyExhibitionSection({ exhibitions }: MyExhibitionSectionProps) {
	const [expanded, setExpanded] = useState(false);

	const sorted = sortExhibitions(exhibitions);
	const visible = expanded ? sorted : sorted.slice(0, COLLAPSED_COUNT);

	return (
		<section className="pb-6 min-[721px]:pb-7">
			{/* TODO: 전시 참여하기(입장 코드) 모달 연결 */}
			<SectionHeader title="나의 전시" count={exhibitions.length} actionLabel="전시 입장하기" />

			<div className="mt-5 flex flex-col gap-5 min-[721px]:mt-0 min-[721px]:grid min-[721px]:grid-cols-4 min-[721px]:gap-x-5 min-[721px]:gap-y-10">
				{visible.map((exhibition) => (
					<ExhibitionCard key={exhibition.exhibitionId} exhibition={exhibition} />
				))}
			</div>

			{exhibitions.length > COLLAPSED_COUNT && (
				<div className="mt-17 min-[721px]:mt-7">
					<ListToggleButton expanded={expanded} onToggle={() => setExpanded((prev) => !prev)} />
				</div>
			)}
		</section>
	);
}
