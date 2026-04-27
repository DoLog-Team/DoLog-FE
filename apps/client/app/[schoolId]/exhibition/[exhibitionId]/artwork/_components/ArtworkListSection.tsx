"use client";
import { useState, useRef, useEffect } from "react";
import type { Category } from "@/app/(main)/_mocks/artwork";
import { CATEGORIES, MOCK_ARTWORKS } from "@/app/(main)/_mocks/artwork";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import { AlbumIcon } from "./components/AlbumIcon";
import Filter from "./components/Filter";
import { ListIcon } from "./components/ListIcon";

export function ArtworkListSection() {
	const [selected, setSelected] = useState<Category>("전체");
	const items = MOCK_ARTWORKS[selected];
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");


	// 스크롤 시 위치가 변경되면서 sticky 되기 위한 로직
	const titleRef = useRef<HTMLDivElement>(null);
	const [isTitleVisible, setIsTitleVisible] = useState(true);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsTitleVisible(entry.isIntersecting),
			{ threshold: 0 }
		);
		if (titleRef.current) observer.observe(titleRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section className="flex flex-col px-4 pb-6">				
				{/* 스크롤 전 (Title+토글버튼) */}
				<div ref={titleRef} className="flex justify-between items-center">
					<Title title="작품 목록" />
					<div className="flex gap-1 p-1 h-8 rounded-2 border border-stroke-lightest">
						<ListIcon
							active={viewMode === "list"}
							onClick={() => setViewMode("list")}
							className="cursor-pointer"
						/>
						<div className="w-px h-full border border-stroke-lighter" />
						<AlbumIcon
							active={viewMode === "grid"}
							onClick={() => setViewMode("grid")}
							className="cursor-pointer"
						/>
					</div>
				</div>

				{/* 스크롤 시 sticky 영역 */}
				<div className="sticky top-11 bg-white z-10 pb-2">
					<SearchBar placeholder="작품명, 작가명을 검색하세요" />
					<div className="flex items-center justify-between">
						<Filter categories={CATEGORIES} selected={selected} onSelect={(category) => setSelected(category)} />
						{!isTitleVisible && (
							<div className="flex gap-1 p-1 h-8 rounded-2 border border-stroke-lightest shrink-0">
								<ListIcon active={viewMode === "list"} onClick={() => setViewMode("list")} className="cursor-pointer" />
								<div className="w-px h-full border border-stroke-lighter pointer-events-none" />
								<AlbumIcon active={viewMode === "grid"} onClick={() => setViewMode("grid")} className="cursor-pointer" />
							</div>
						)}
					</div>
				</div>

			
			<div className="mt-4">
			{viewMode === "grid" ? <CardGrid items={items} /> : <ListCardGrid items={items} />}
			</div>
		</section>
	);
}
