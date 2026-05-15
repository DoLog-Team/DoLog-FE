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
	slugMap?: Record<string, string>;
}

export default function ArtworksClient({ artworks, slugMap }: ArtworksClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
	const [selectedDept, setSelectedDept] = useState<string | null>(null);

	const univs = [...new Set(artworks.map((a) => a.univName).filter(Boolean))] as string[];
	const depts = [...new Set(artworks.map((a) => a.deptName).filter(Boolean))] as string[];

	const filtered = artworks.filter((item) => {
		const matchUniv = !selectedUniv || item.univName === selectedUniv;
		const matchDept = !selectedDept || item.deptName === selectedDept;
		const matchSearch =
			!searchQuery || item.title.includes(searchQuery) || item.author.includes(searchQuery);
		return matchUniv && matchDept && matchSearch;
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
					label="대학"
					options={univs}
					selected={selectedUniv}
					onSelect={setSelectedUniv}
				/>
				<FilterChip
					label="학과"
					options={depts}
					selected={selectedDept}
					onSelect={setSelectedDept}
				/>
			</CollapsingHeader>

			<section className="flex flex-col flex-1 px-4 pt-4 pb-6">
				{filtered.length > 0 ? (
					<CardGrid
						items={filtered}
						getHref={(item) => {
							const slug = slugMap?.[String(item.id)];
							return slug ? `/${slug}/artwork/${item.id}` : "#";
						}}
					/>
				) : (
					<EmptyState searchQuery={searchQuery} message="해당하는 작품이 없어요." />
				)}
			</section>

			<MainFooter />
		</div>
	);
}
