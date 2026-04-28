"use client";

import { useState } from "react";
import type { CardItem } from "@/components/common/Card/Card.types";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { CollapsingHeader } from "@/components/common/CollapsingHeader/CollapsingHeader";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";
import MainFooter from "@/components/common/Footer/MainFooter";

interface ArtworksClientProps {
	artworks: CardItem[];
	categories: string[];
}

export default function ArtworksClient({ artworks, categories }: ArtworksClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const filtered = artworks.filter((item) => {
		const matchCategory = !selectedCategory || item.category === selectedCategory;
		const matchSearch =
			!searchQuery || item.title.includes(searchQuery) || item.author.includes(searchQuery);
		return matchCategory && matchSearch;
	});

	return (
		<div className="flex flex-col min-h-screen">
			<CollapsingHeader
				title="전체 작품"
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="작품명, 작가 명을 검색해요."
			>
				<FilterChip
					label="카테고리"
					options={categories}
					selected={selectedCategory}
					onSelect={setSelectedCategory}
				/>
			</CollapsingHeader>

			<section className="flex flex-col flex-1 px-4 pt-4 pb-6">
				{filtered.length > 0 ? (
					<CardGrid items={filtered} getHref={(item) => `/artwork/${item.id}`} />
				) : (
					<EmptyState searchQuery={searchQuery} message="해당하는 작품이 없어요." />
				)}
			</section>

			<MainFooter />
		</div>
	);
}
