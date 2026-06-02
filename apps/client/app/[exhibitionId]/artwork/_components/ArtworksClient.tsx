"use client";
import { useMemo, useState } from "react";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { track } from "@/lib/amplitude";
import type { ExhibitionMap, ZoneGroup } from "@/lib/api/artwork";
import { useArtworkFilter } from "../hooks/useArtworkFilter";
import { ArtworkListSection } from "./ArtworkListSection";
import { GuideSection } from "./GuideSection";

interface ArtworksClientProps {
	maps: ExhibitionMap[];
	zones: ZoneGroup[];
	hideFilter?: boolean;
}

export function ArtworksClient({ maps, zones, hideFilter }: ArtworksClientProps) {
	const hasGuide = maps.length > 0;

	const [searchQuery, setSearchQuery] = useState("");
	const { selected, setSelected, categories, filteredZones } = useArtworkFilter(zones, searchQuery);

	// ScrollTabBar 탭 [관람 안내(선택값), zone(고유값)]
	const TABS = useMemo(
		() => [
			...(hasGuide ? [{ id: "guide", label: "관람 안내" }] : []),
			...filteredZones.map((z) => ({ id: z.zoneName, label: z.zoneName })),
		],
		[hasGuide, filteredZones],
	);
	const tabIds = useMemo(() => TABS.map((t) => t.id), [TABS]);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);

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
				zones={filteredZones}
				sectionRefs={sectionRefs}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				categories={categories}
				selected={selected}
				onSelect={setSelected}
				hideFilter={hideFilter}
			/>
			<ScrollTabBar
				tabs={TABS}
				activeTab={activeTab}
				onTabClick={(tabId) => {
					handleTabClick(tabId);
					track("Zone Tab Clicked", { zone: tabId, page: "artwork_list" });
				}}
			/>
		</>
	);
}
