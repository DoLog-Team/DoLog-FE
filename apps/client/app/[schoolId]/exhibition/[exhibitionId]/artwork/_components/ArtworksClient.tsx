"use client";
import { BottomTabBar } from "@/components/common/BottomTabBar/BottomTabBar";
import { useBottomTabBar } from "@/components/common/BottomTabBar/useBottomTabBar";
import { useArtworkFilter } from "../hooks/useArtworkFilter";
import { ArtworkListSection } from "./ArtworkListSection";
import { GuideSection } from "./GuideSection";

export function ArtworksClient({ guideImages }: { guideImages: string[] }) {
	const hasGuide = guideImages.length > 0;
	const { grouped } = useArtworkFilter();
	const zones = Object.keys(grouped);

	const labels = [...(hasGuide ? ["관람 안내"] : []), ...zones];

	const { tabs, activeIndex, refs } = useBottomTabBar(labels);

	return (
		<>
			{hasGuide && <GuideSection guideImages={guideImages} sectionRef={refs[0]} />}
			<ArtworkListSection refs={refs} refOffset={hasGuide ? 1 : 0} />
			<BottomTabBar tabs={tabs} activeIndex={activeIndex} scrollOffset={147} />
		</>
	);
}
