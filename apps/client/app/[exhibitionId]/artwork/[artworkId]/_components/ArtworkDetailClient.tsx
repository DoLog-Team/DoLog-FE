"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Divider } from "@/components/common/Divider/Divider";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { ImageViewerModal } from "@/components/common/ImageViewerModal/ImageViewerModal";
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

export function ArtworkDetailClient({
	data,
	hideArtistRole,
}: {
	data: ArtworkDetail;
	hideArtistRole?: boolean;
}) {
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

	const [isMainImageViewerOpen, setIsMainImageViewerOpen] = useState(false);

	const handleMainImageClick = () => {
		if (window.matchMedia("(max-width: 720px)").matches) {
			setIsMainImageViewerOpen(true);
			return;
		}
		// TODO: PC 상세보기 모달 구현 예정
	};

	return (
		<div className="flex flex-col">
			<Header variant="back" />

			<div className="w-full">
				{data.mainImage ? (
					<button
						type="button"
						onClick={handleMainImageClick}
						className="relative block w-full aspect-video cursor-pointer overflow-hidden min-[721px]:max-h-[400px]"
						aria-label="작품 대표 이미지 전체보기"
					>
						<Image
							src={data.mainImage}
							alt={data.title}
							fill
							sizes="100vw"
							className="object-cover"
							priority
						/>
					</button>
				) : (
					<EmptyImageFallback className="w-full aspect-video min-[721px]:max-h-[400px]" />
				)}
			</div>
			{data.mainImage && (
				<ImageViewerModal
					open={isMainImageViewerOpen}
					onOpenChange={setIsMainImageViewerOpen}
					src={data.mainImage}
					alt={data.title}
					title={data.title}
				/>
			)}
			<InfoSection data={data} hideArtistRole={hideArtistRole} />
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
			{(prevArtwork || nextArtwork) && (
				<PostNavigationSection prevArtwork={prevArtwork} nextArtwork={nextArtwork} />
			)}

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
