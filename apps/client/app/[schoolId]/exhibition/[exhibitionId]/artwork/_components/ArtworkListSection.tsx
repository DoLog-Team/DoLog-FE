"use client";
import { useState } from "react";
import type { CardItem } from "@/components/common/Card/Card.types";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import type { Artwork } from "../_mocks/artworkList";
import { useArtworkFilter } from "../hooks/useArtworkFilter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { AlbumIcon } from "./components/AlbumIcon";
import Filter from "./components/Filter";
import { ListIcon } from "./components/ListIcon";

interface ArtworkListSectionProps {
	sectionRefs: Record<string, React.RefObject<HTMLElement | null>>;
	grouped: Record<string, Artwork[]>;
}

// [임시] Artwork → CardItem 변환
// 현재 백엔드 스펙에 맞춰 Artwork 타입으로 목데이터를 구성했습니다.
// Card 컴포넌트들이 현재 CardItem 타입을 받고 있고 여러 곳에서 쓰이고 있어 임시로 변환했습니다.
// 추후 백엔드 연동 시 Card 컴포넌트 타입을 Artwork 기준으로 수정하면 이 변환 로직은 제거할 예정입니다!
const toCardItem = (artwork: Artwork): CardItem => ({
	id: Number(artwork.artworkId.replace("uuid-", "")),
	imageUrl: artwork.mainImage,
	title: artwork.title,
	category: artwork.category,
	author: artwork.artists.map((a) => a.name).join(", "),
});

// 보기 방식 토글 버튼
const ViewToggle = ({
	viewMode,
	setViewMode,
}: {
	viewMode: "grid" | "list";
	setViewMode: (mode: "grid" | "list") => void;
}) => (
	<div className="flex gap-1 p-1 h-8 rounded-2 border border-stroke-lightest shrink-0">
		<ListIcon
			active={viewMode === "list"}
			onClick={() => setViewMode("list")}
			className="cursor-pointer"
		/>
		<div className="w-px h-full border border-stroke-lighter pointer-events-none" />
		<AlbumIcon
			active={viewMode === "grid"}
			onClick={() => setViewMode("grid")}
			className="cursor-pointer"
		/>
	</div>
);

export function ArtworkListSection({ sectionRefs }: ArtworkListSectionProps) {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const { ref: titleRef, isVisible: isTitleVisible } = useIntersectionObserver();

	const { selected, setSelected, categories, grouped } = useArtworkFilter();

	const zones = Object.keys(grouped);
	const isMultiZone = zones.length > 1;

	return (
		<section className="flex flex-col">
			{/* 스크롤 전 (Title + 토글버튼) */}
			<div ref={titleRef} className="flex justify-between items-center px-4">
				<Title title="작품 목록" />
				<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
			</div>

			{/* sticky 영역 */}
			<div className="sticky top-11 bg-white z-10 px-4 pb-2">
				<SearchBar placeholder="작품명, 작가명을 검색하세요" className="mb-2.5" />
				<div className="flex items-center justify-between">
					<Filter categories={categories} selected={selected} onSelect={setSelected} />
					{!isTitleVisible && <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />}
				</div>
			</div>

			{/* 작품 목록 */}
			{/* 
			구역이 1개일 경우 작품 목록만
			구역이 2개 이상일 경우 구역 Title과 함께 작품 목록을
			렌더링 합니다 */}
			<div className="flex flex-col px-4 gap-6">
				{zones.map((zone) => {
					const items = grouped[zone].map(toCardItem);
					return (
						<div
							key={zone}
							ref={(el) => {
								if (sectionRefs[zone]) {
									(sectionRefs[zone] as unknown as React.RefObject<HTMLElement | null>).current =
										el;
								}
							}}
						>
							{isMultiZone && <Title title={zone} />}
							{items.length === 0 ? (
								<EmptyState
									message={"선택한 카테고리에 해당되는\n작품이 없어요"}
									className="w-full pb-16 pt-10 px-2.5"
								/>
							) : viewMode === "grid" ? (
								<CardGrid items={items} getHref={(item) => `artwork/${item.id}`} />
							) : (
								<ListCardGrid items={items} getHref={(item) => `artwork/${item.id}`} />
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
