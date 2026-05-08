"use client";
import { useState } from "react";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import type { ArtworkListItem, ExhibitionMap } from "@/lib/api/artwork";
import { useArtworkFilter } from "../hooks/useArtworkFilter";
import { ArtworkListSection } from "./ArtworkListSection";
import { GuideSection } from "./GuideSection";

interface ArtworksClientProps {
	maps: ExhibitionMap[];
	artworks: ArtworkListItem[];
}

export function ArtworksClient({ maps, artworks }: ArtworksClientProps) {
	const hasGuide = maps.length > 0;

	const [searchQuery, setSearchQuery] = useState("");
	const { selected, setSelected, categories, grouped } = useArtworkFilter(artworks, searchQuery); // TODO : 백에서 구역 그룹화되어 내려오는지 확인

	// ScrollTabBar 탭 [관람 안내(선택값), zone(고유값)]
	const TABS = [
		...(hasGuide ? [{ id: "guide", label: "관람 안내" }] : []),
		...Object.keys(grouped).map((zone) => ({
			id: zone,
			label: zone,
		})),
	];
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(
		TABS.map((t) => t.id),
		142,
	);

	return (
		<>
			{hasGuide && (
				<div
					ref={(el) => {
						if (sectionRefs.guide) sectionRefs.guide.current = el;
					}}
				>
					<GuideSection maps={maps} />
				</div>
			)}
			<ArtworkListSection
				grouped={grouped}
				sectionRefs={sectionRefs}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				categories={categories}
				selected={selected}
				onSelect={setSelected}
			/>
			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
		</>
	);
}
