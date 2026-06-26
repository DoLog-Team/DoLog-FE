"use client";
import { useEffect, useState } from "react";
import type { CardItem } from "@/components/common/Card/Card.types";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import { track } from "@/lib/amplitude";
import type { ArtworkListItem } from "@/lib/api/artwork";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { AlbumIcon } from "./AlbumIcon";
import Filter from "./Filter";
import { ListIcon } from "./ListIcon";

interface FilteredZone {
	zoneName: string;
	zoneOrderId: number;
	description?: string;
	artworks: ArtworkListItem[];
}

interface ArtworkListSectionProps {
	sectionRefs: Record<string, React.RefObject<HTMLElement | null>>;
	zones: FilteredZone[];
	searchQuery: string;
	onSearchChange: (value: string) => void;
	categories: string[];
	selected: string;
	onSelect: (value: string) => void;
	hideFilter?: boolean;
}

const toCardItem = (artwork: ArtworkListItem): CardItem => ({
	id: artwork.id,
	imageUrl: artwork.imageUrl,
	title: artwork.title,
	author: artwork.artistName || "",
});

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
			onClick={() => {
				setViewMode("list");
				track("View Mode Changed", { mode: "list", page: "artwork_list" });
			}}
			className="cursor-pointer"
		/>
		<div className="w-px h-full border border-stroke-lighter pointer-events-none" />
		<AlbumIcon
			active={viewMode === "grid"}
			onClick={() => {
				setViewMode("grid");
				track("View Mode Changed", { mode: "grid", page: "artwork_list" });
			}}
			className="cursor-pointer"
		/>
	</div>
);

export function ArtworkListSection({
	sectionRefs,
	zones,
	searchQuery,
	onSearchChange,
	categories,
	selected,
	onSelect,
	hideFilter,
}: ArtworkListSectionProps) {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 721px)");
		const handler = (e: MediaQueryListEvent) => {
			if (e.matches) setViewMode("grid");
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const { ref: titleRef, isVisible: isTitleVisible } = useIntersectionObserver();
	const isMultiZone = zones.length > 1;

	return (
		<section className="flex flex-col">
			<DesktopContainer>
				<div ref={titleRef} className="flex justify-between items-center">
					<Title title="작품 목록" />
					<div className="min-[721px]:hidden">
						<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
					</div>
				</div>
			</DesktopContainer>

			<div className="sticky top-11 bg-normal z-10 pb-2">
				<DesktopContainer>
					<SearchBar
						placeholder="작품명, 작가명을 검색하세요"
						className="mb-2.5"
						value={searchQuery}
						onChange={onSearchChange}
					/>
					<div className="flex items-center">
						{!hideFilter && (
							<Filter
								categories={categories}
								selected={selected}
								onSelect={(val) => {
									onSelect(val);
									track("Category Filter Selected", { category: val, page: "artwork_list" });
								}}
							/>
						)}
						{!isTitleVisible && (
							<div className="ml-auto min-[721px]:hidden">
								<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
							</div>
						)}
					</div>
				</DesktopContainer>
			</div>

			<DesktopContainer>
				<div className="flex flex-col gap-6">
					{zones.length === 0 ? (
						<EmptyState
							searchQuery={searchQuery || undefined}
							message={"선택한 카테고리에 해당되는\n작품이 없어요"}
							className="w-full pb-16 pt-10 px-2.5"
						/>
					) : (
						zones.map((zone) => {
							const items = zone.artworks.map(toCardItem);
							const handleArtworkClick = (item: CardItem) =>
								track("Artwork Card Clicked", {
									artwork_id: item.id,
									artwork_title: item.title,
									zone: zone.zoneName,
									page: "artwork_list",
								});
							return (
								<div
									key={zone.zoneName}
									className={!isMultiZone ? "pt-4" : ""}
									ref={(el) => {
										if (sectionRefs[zone.zoneName]) {
											(
												sectionRefs[zone.zoneName] as unknown as React.RefObject<HTMLElement | null>
											).current = el;
										}
									}}
								>
									{isMultiZone && <Title title={zone.zoneName} />}
									{isMultiZone && zone.description && (
										<p className="text-body2 text-light mb-4">{zone.description}</p>
									)}
									{viewMode === "grid" ? (
										<CardGrid
											items={items}
											getHref={(item) => `artwork/${item.id}`}
											onItemClick={handleArtworkClick}
										/>
									) : (
										<ListCardGrid
											items={items}
											getHref={(item) => `artwork/${item.id}`}
											onItemClick={handleArtworkClick}
										/>
									)}
								</div>
							);
						})
					)}
				</div>
			</DesktopContainer>
		</section>
	);
}
