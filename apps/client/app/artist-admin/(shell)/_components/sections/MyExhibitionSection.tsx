"use client";

import { useState } from "react";
import type { JoinableExhibition } from "../../_mocks/exhibitionJoin";
import type { MyExhibition } from "../../_mocks/exhibitions";
import { ListToggleButton } from "../ListToggleButton";
import { MyExhibitionCard } from "../MyExhibitionCard";
import { ExhibitionIntroModal } from "../modals/ExhibitionIntroModal";
import { ExhibitionJoinModal } from "../modals/ExhibitionJoinModal";
import { ExhibitionLeaveModal } from "../modals/ExhibitionLeaveModal";
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
	const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
	// 입장 코드가 확인된 전시 (가입 인사 모달 대상)
	const [joiningExhibition, setJoiningExhibition] = useState<JoinableExhibition | null>(null);
	const [leavingExhibition, setLeavingExhibition] = useState<MyExhibition | null>(null);

	return (
		<section className="pb-6 min-[721px]:pb-7">
			<SectionHeader
				title="나의 전시"
				count={exhibitions.length}
				actionLabel="전시 입장하기"
				onAction={() => setIsJoinModalOpen(true)}
			/>

			<div className="mt-5 flex flex-col gap-5 min-[721px]:mt-0 min-[721px]:grid min-[721px]:grid-cols-4 min-[721px]:gap-x-5 min-[721px]:gap-y-10">
				{visibleItems.map((exhibition) => (
					<MyExhibitionCard
						key={exhibition.exhibitionId}
						exhibition={exhibition}
						onLeave={() => setLeavingExhibition(exhibition)}
					/>
				))}
			</div>

			{canToggle && (
				<div className="mt-17 min-[721px]:mt-7">
					<ListToggleButton expanded={expanded} onToggle={toggle} />
				</div>
			)}

			<ExhibitionJoinModal
				open={isJoinModalOpen}
				onOpenChange={setIsJoinModalOpen}
				onCodeConfirmed={setJoiningExhibition}
			/>
			<ExhibitionIntroModal
				exhibition={joiningExhibition}
				onOpenChange={(open) => !open && setJoiningExhibition(null)}
			/>
			<ExhibitionLeaveModal
				exhibition={leavingExhibition}
				onOpenChange={(open) => !open && setLeavingExhibition(null)}
			/>
		</section>
	);
}
