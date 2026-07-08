"use client";

import { useState } from "react";
import type { CardItem } from "@/components/common/Card/Card.types";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { CollapsingHeader } from "@/components/common/CollapsingHeader/CollapsingHeader";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";
import MainFooter from "@/components/common/Footer/MainFooter";
import { PageTracker } from "@/components/common/PageTracker";
import { track } from "@/lib/amplitude";
import { EXHIBITION_TYPE_LABEL } from "@/lib/constants/exhibition";

interface ArtworksClientProps {
	artworks: CardItem[];
	slugMap?: Record<string, string>;
}

export default function ArtworksClient({ artworks, slugMap }: ArtworksClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
	const [selectedDept, setSelectedDept] = useState<string | null>(null);
	const [selectedType, setSelectedType] = useState<string | null>(null);

	const univs = [...new Set(artworks.map((a) => a.univName).filter(Boolean))] as string[];
	const depts = [...new Set(artworks.map((a) => a.deptName).filter(Boolean))] as string[];
	const types = [
		...new Set(
			artworks
				.map((a) => a.exhibitionType)
				.filter((t): t is string => t !== null && t !== undefined)
				.map((t) => EXHIBITION_TYPE_LABEL[t] ?? t),
		),
	];

	const filtered = artworks.filter((item) => {
		const matchUniv = !selectedUniv || item.univName === selectedUniv;
		const matchDept = !selectedDept || item.deptName === selectedDept;
		const typeLabel = EXHIBITION_TYPE_LABEL[item.exhibitionType ?? ""] ?? item.exhibitionType;
		const matchType = !selectedType || typeLabel === selectedType;
		const q = searchQuery.toLowerCase();
		const matchSearch =
			!searchQuery || item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q);
		return matchUniv && matchDept && matchType && matchSearch;
	});

	return (
		<div className="flex flex-col min-h-screen">
			<PageTracker pageName="artworks_list" />
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
					onSelect={(val) => {
						setSelectedUniv(val);
						if (val)
							track("Filter Selected", { filter_type: "univ", value: val, page: "artworks_list" });
					}}
				/>
				<FilterChip
					label="학과"
					options={depts}
					selected={selectedDept}
					onSelect={(val) => {
						setSelectedDept(val);
						if (val)
							track("Filter Selected", { filter_type: "dept", value: val, page: "artworks_list" });
					}}
				/>
				<FilterChip
					label="유형"
					options={types}
					selected={selectedType}
					onSelect={(val) => {
						setSelectedType(val);
						if (val)
							track("Filter Selected", { filter_type: "type", value: val, page: "artworks_list" });
					}}
				/>
			</CollapsingHeader>

			<DesktopContainer className="flex-1 pt-4 pb-6">
				<section className="flex flex-col flex-1">
					{filtered.length > 0 ? (
						<CardGrid
							items={filtered}
							getHref={(item) => {
								const slug = slugMap?.[String(item.id)];
								return slug ? `/${slug}/artwork/${item.id}` : "#";
							}}
							onItemClick={(item) =>
								track("Artwork Card Clicked", {
									artwork_id: item.id,
									artwork_title: item.title,
									page: "artworks_list",
								})
							}
						/>
					) : (
						<EmptyState searchQuery={searchQuery} message="해당하는 작품이 없어요." />
					)}
				</section>
			</DesktopContainer>

			<MainFooter />
		</div>
	);
}
