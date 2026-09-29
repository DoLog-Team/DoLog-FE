"use client";

import type { MyExhibition } from "../../_mocks/exhibitions";
import { ListToggleButton } from "../ListToggleButton";
import { MyExhibitionCard } from "../MyExhibitionCard";
import { SectionHeader } from "../SectionHeader";
import { useExpandableList } from "../useExpandableList";

// 수락 대기중 먼저, 그 안에서는 최근 수락순
const compareExhibitions = (a: MyExhibition, b: MyExhibition) => {
	const aPending = a.acceptedAt === null;
	const bPending = b.acceptedAt === null;
	if (aPending !== bPending) return aPending ? -1 : 1;
	return (b.acceptedAt ?? "").localeCompare(a.acceptedAt ?? "");
};

interface MyExhibitionSectionProps {
	exhibitions: MyExhibition[];
}

export function MyExhibitionSection({ exhibitions }: MyExhibitionSectionProps) {
	const { visibleItems, expanded, canToggle, toggle } = useExpandableList(
		exhibitions,
		compareExhibitions,
	);

	return (
		<section className="pb-6 min-[721px]:pb-7">
			{/* TODO: 전시 참여하기(입장 코드) 모달 연결 */}
			<SectionHeader title="나의 전시" count={exhibitions.length} actionLabel="전시 입장하기" />

			<div className="mt-5 flex flex-col gap-5 min-[721px]:mt-0 min-[721px]:grid min-[721px]:grid-cols-4 min-[721px]:gap-x-5 min-[721px]:gap-y-10">
				{visibleItems.map((exhibition) => (
					<MyExhibitionCard key={exhibition.exhibitionId} exhibition={exhibition} />
				))}
			</div>

			{canToggle && (
				<div className="mt-17 min-[721px]:mt-7">
					<ListToggleButton expanded={expanded} onToggle={toggle} />
				</div>
			)}
		</section>
	);
}
