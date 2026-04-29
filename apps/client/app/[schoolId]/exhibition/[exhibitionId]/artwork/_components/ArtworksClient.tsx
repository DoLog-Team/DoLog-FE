"use client";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { useArtworkFilter } from "../hooks/useArtworkFilter";
import { ArtworkListSection } from "./ArtworkListSection";
import { GuideSection } from "./GuideSection";

export function ArtworksClient({ guideImages }: { guideImages: string[] }) {
	const hasGuide = guideImages.length > 0;
	const { grouped } = useArtworkFilter(); // TODO : 백에서 구역 그룹화되어 내려오는지 확인

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
					<GuideSection guideImages={guideImages} />
				</div>
			)}
			<ArtworkListSection grouped={grouped} sectionRefs={sectionRefs} />
			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
		</>
	);
}
