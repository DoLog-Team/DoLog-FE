"use client";

import { useMemo } from "react";
import { Divider } from "@/components/common/Divider/Divider";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { Header } from "../../_components/Header";
import type { ArtistProfile } from "../api/artist";
import type { PartnerPart } from "../api/partner";
import { ArtistSection } from "./sections/ArtistSection";
import { PartnerSection } from "./sections/PartnerSection";

interface ArtistPageClientProps {
	schoolId: string;
	exhibitionId: string;
	partners: PartnerPart[];
	artists: ArtistProfile[];
}

export function ArtistPageClient({ exhibitionId, partners, artists }: ArtistPageClientProps) {
	const TABS = useMemo(
		() => [
			{ id: "artists", label: "작가" },
			{ id: "partners", label: "도움을 주신 분들" },
		],
		[],
	);

	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(
		TABS.map((t) => t.id),
		100,
	);

	return (
		<>
			<Header variant="logo" />

			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />

			<div className="flex flex-col w-full px-4">
				<section
					ref={(el) => {
						sectionRefs.artists.current = el;
					}}
				>
					<ArtistSection exhibitionId={exhibitionId} artists={artists} />
				</section>

				<Divider />

				<section
					ref={(el) => {
						sectionRefs.partners.current = el;
					}}
				>
					<PartnerSection partners={partners} />
				</section>
			</div>
		</>
	);
}
