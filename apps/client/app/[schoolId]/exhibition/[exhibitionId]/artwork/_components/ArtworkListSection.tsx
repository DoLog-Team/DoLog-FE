"use client";
import Image from "next/image";
import { useState } from "react";
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

	return (
		<section className="flex flex-col px-4 pb-6">
			<div className="flex justify-between items-center">
				<Title title="작품 목록" />
				{/* 보기 방식 토글 버튼 */}
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

			<SearchBar placeholder="작품명, 작가명을 검색하세요" />
			<Filter
				categories={CATEGORIES}
				selected={selected}
				onSelect={(category) => setSelected(category)}
			/>
			{viewMode === "grid" ? <CardGrid items={items} /> : <ListCardGrid items={items} />}
		</section>
	);
}
