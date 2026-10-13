"use client";
import { useCallback, useMemo, useRef, useState } from "react";
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
	// 검색바·필터 고정 영역은 필터 유무·화면 크기에 따라 높이가 달라서, 고정됐을 때의 아래 끝을 직접 계산함
	// (탭으로 이동했을 때 구역이 고정 영역 바로 아래에 오도록)
	const stickyRef = useRef<HTMLDivElement>(null);
	const getStickyBottom = useCallback(() => {
		const el = stickyRef.current;
		if (!el) return 120;
		return Number.parseFloat(getComputedStyle(el).top) + el.offsetHeight;
	}, []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, getStickyBottom);

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
				stickyRef={stickyRef}
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
