"use client";

import { useMemo, useRef } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { track } from "@/lib/amplitude";
import type { ArtistProfile } from "@/lib/api/artists/artist";
import type { PartnerPart } from "@/lib/api/partner";
import { Header } from "../../_components/Header";
import { ArtistSection } from "./sections/ArtistSection";
import { PartnerSection } from "./sections/PartnerSection";

interface ArtistPageClientProps {
	exhibitionId: string;
	partners: PartnerPart[];
	artists: ArtistProfile[];
}

export function ArtistPageClient({ exhibitionId, partners, artists }: ArtistPageClientProps) {
	const pageEntryTime = useRef(Date.now());

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

			<ScrollTabBar
				tabs={TABS}
				activeTab={activeTab}
				onTabClick={(tabId) => {
					handleTabClick(tabId);
					track("Artist Page Tab Clicked", { tab: tabId, page: "artist_list" });
				}}
			/>

			<DesktopContainer className="flex flex-col">
				<section
					ref={(el) => {
						sectionRefs.artists.current = el;
					}}
				>
					<ArtistSection
						exhibitionId={exhibitionId}
						artists={artists}
						onArtistClick={(artist) => {
							const elapsedSec = Math.round((Date.now() - pageEntryTime.current) / 1000);
							track("Artist Card Clicked", {
								artist_id: artist.profileId,
								artist_name: artist.nameKo,
								time_to_click_sec: elapsedSec,
								page: "artist_list",
							});
						}}
					/>
				</section>

				<Divider />

				<section
					ref={(el) => {
						sectionRefs.partners.current = el;
					}}
				>
					<PartnerSection partners={partners} />
				</section>
			</DesktopContainer>
		</>
	);
}
