"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Divider } from "@/components/common/Divider/Divider";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { track } from "@/lib/amplitude";
import type { ArtworkDetail } from "@/lib/api/artwork";
import { useSectionTime } from "@/lib/hooks/useSectionTime";
import { Header } from "../../../_components/Header";
import { ArtistSection } from "../_components/ArtistSection";
import { BtsSection } from "../_components/BtsSection";
import { DescriptionSection } from "../_components/DescriptionSection";
import { InfoSection } from "../_components/InfoSection";
import { LocationSection } from "../_components/LocationSection";
import { PhotoSection } from "../_components/PhotoSection";
import { PostNavigationSection } from "../_components/PostNavigationSection";
import { RelatedSection } from "../_components/RelatedSection";
import { YoutubeSection } from "../_components/YoutubeSection";

export function ArtworkDetailClient({ data }: { data: ArtworkDetail }) {
	const TABS = useMemo(() => {
		const base = [
			{ id: "detail", label: "작품 소개" },
			{ id: "artist", label: "작가 소개" },
		];
		if (data.relatedBts?.length) base.push({ id: "behind", label: "비하인드" });
		return base;
	}, [data.relatedBts]);

	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(TABS.map((t) => t.id));

	const sectionNames = useMemo(() => TABS.map((t) => t.id), [TABS]);
	useSectionTime("artwork_detail", sectionNames);

	const prevArtwork = data.alphabeticalArtworks.find((a) => a.type === "prev");
	const nextArtwork = data.alphabeticalArtworks.find((a) => a.type === "next");

	return (
		<div className="flex flex-col">
			<Header variant="back" />

			<div className="w-full h-auto">
				{data.mainImage ? (
					<Image
						src={data.mainImage}
						alt={data.title}
						width={0}
						height={0}
						sizes="100vw"
						className="w-full h-auto"
						priority
					/>
				) : (
					<EmptyImageFallback className="w-full aspect-video" />
				)}
			</div>
			<InfoSection data={data} />
			<LocationSection locationImageUrl={data.locationMap} />
			<section
				data-section="detail"
				ref={(el) => {
					sectionRefs.detail.current = el;
				}}
			>
				<DescriptionSection content={data.description} />
			</section>
			<YoutubeSection youtubeUrl={data.youtubeUrl} />
			<PhotoSection data={data} />
			<section
				data-section="artist"
				ref={(el) => {
					sectionRefs.artist.current = el;
				}}
			>
				<ArtistSection authors={data.participants} />
			</section>

			{data.relatedBts && data.relatedBts.length > 0 && (
				<>
					<Divider />
					<section
						data-section="behind"
						ref={(el) => {
							sectionRefs.behind.current = el;
						}}
					>
						<BtsSection bts={data.relatedBts} />
					</section>
				</>
			)}
			{data.sameCategoryArtworks && data.sameCategoryArtworks.length > 0 && (
				<RelatedSection artworks={data.sameCategoryArtworks} artworkTitle={data.title} />
			)}
			<PostNavigationSection prevArtwork={prevArtwork} nextArtwork={nextArtwork} />

			<ScrollTabBar
				tabs={TABS}
				activeTab={activeTab}
				onTabClick={(tabId) => {
					handleTabClick(tabId);
					track("Artwork Tab Clicked", { tab: tabId, artwork_title: data.title });
				}}
			/>
		</div>
	);
}
