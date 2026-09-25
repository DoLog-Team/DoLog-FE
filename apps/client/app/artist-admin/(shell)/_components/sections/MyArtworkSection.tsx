"use client";

import { useState } from "react";
import type { MyArtwork } from "../../_mocks/artworks";
import { ArtworkCard } from "../ArtworkCard";
import { ListToggleButton } from "../ListToggleButton";
import { SectionHeader } from "../SectionHeader";

const COLLAPSED_COUNT = 4;

// 정렬 조건 : 임시저장 먼저, 그 안에서는 최신 등록순
const sortArtworks = (artworks: MyArtwork[]) =>
	[...artworks].sort((a, b) => {
		if ((a.status === "draft") !== (b.status === "draft")) return a.status === "draft" ? -1 : 1;
		return b.createdAt.localeCompare(a.createdAt);
	});

interface MyArtworkSectionProps {
	artworks: MyArtwork[];
}

export function MyArtworkSection({ artworks }: MyArtworkSectionProps) {
	const [expanded, setExpanded] = useState(false);

	const sorted = sortArtworks(artworks);
	const visible = expanded ? sorted : sorted.slice(0, COLLAPSED_COUNT);

	return (
		<section className="pb-6 min-[721px]:pb-7">
			{/* 보연 TODO: 새 작품 추가하기(작품 제목 작성) 모달 연결 */}
			<SectionHeader title="나의 작품" count={artworks.length} actionLabel="추가하기" />

			<div className="mt-5 flex flex-col gap-5 min-[721px]:mt-0 min-[721px]:grid min-[721px]:grid-cols-4">
				{visible.map((artwork) => (
					<ArtworkCard key={artwork.artworkId} artwork={artwork} />
				))}
			</div>

			{artworks.length > COLLAPSED_COUNT && (
				<div className="mt-17 min-[721px]:mt-7">
					<ListToggleButton expanded={expanded} onToggle={() => setExpanded((prev) => !prev)} />
				</div>
			)}
		</section>
	);
}
