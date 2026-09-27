"use client";

import type { MyArtwork } from "../../_mocks/artworks";
import { ListToggleButton } from "../ListToggleButton";
import { MyArtworkCard } from "../MyArtworkCard";
import { SectionHeader } from "../SectionHeader";
import { useExpandableList } from "../useExpandableList";

// 정렬 조건 : 임시저장 먼저, 그 안에서는 최신 등록순
const compareArtworks = (a: MyArtwork, b: MyArtwork) => {
	if ((a.status === "draft") !== (b.status === "draft")) return a.status === "draft" ? -1 : 1;
	return b.createdAt.localeCompare(a.createdAt);
};

interface MyArtworkSectionProps {
	artworks: MyArtwork[];
}

export function MyArtworkSection({ artworks }: MyArtworkSectionProps) {
	const { visibleItems, expanded, canToggle, toggle } = useExpandableList(
		artworks,
		compareArtworks,
	);

	return (
		<section className="pb-6 min-[721px]:pb-7">
			{/* 보연 TODO: 새 작품 추가하기(작품 제목 작성) 모달 연결 */}
			<SectionHeader title="나의 작품" count={artworks.length} actionLabel="추가하기" />

			<div className="mt-5 flex flex-col gap-5 min-[721px]:mt-0 min-[721px]:grid min-[721px]:grid-cols-4">
				{visibleItems.map((artwork) => (
					<MyArtworkCard key={artwork.artworkId} artwork={artwork} />
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
