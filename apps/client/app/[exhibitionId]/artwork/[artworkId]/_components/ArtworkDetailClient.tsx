"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArtworkManageFab } from "@/app/(main)/artworks/[artworkId]/_components/ArtworkManageFab";
import { useMyArtwork } from "@/app/(main)/artworks/[artworkId]/_components/useMyArtwork";
import { useExhibition } from "@/app/[exhibitionId]/_context/ExhibitionContext";
import { Divider } from "@/components/common/Divider/Divider";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { ImageViewerModal } from "@/components/common/ImageViewerModal/ImageViewerModal";
import { LikeButton } from "@/components/common/LikeButton/LikeButton";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { track } from "@/lib/amplitude";
import { type ArtworkDetail, setArtworkLike } from "@/lib/api/artwork";
import { useIsOwnArtist } from "@/lib/auth/useIsOwnArtist";
import { useSectionTime } from "@/lib/hooks/useSectionTime";
import { Header } from "../../../_components/Header";
import { ArtistSection, getVisibleAuthors } from "../_components/ArtistSection";
import { BtsSection } from "../_components/BtsSection";
import { DescriptionSection } from "../_components/DescriptionSection";
import { InfoSection } from "../_components/InfoSection";
import { LocationSection } from "../_components/LocationSection";
import { PhotoSection } from "../_components/PhotoSection";
import { PostNavigationSection } from "../_components/PostNavigationSection";
import { RelatedSection } from "../_components/RelatedSection";
import { YoutubeSection } from "../_components/YoutubeSection";

export function ArtworkDetailClient({
	artworkId,
	data,
	hideArtistRole,
}: {
	artworkId: string;
	data: ArtworkDetail;
	hideArtistRole?: boolean;
}) {
	const authors = getVisibleAuthors(data.participants);
	const hasArtist = authors.length > 0;

	const TABS = useMemo(() => {
		const base = [{ id: "detail", label: "작품 소개" }];
		if (hasArtist) base.push({ id: "artist", label: "작가 소개" });
		if (data.relatedBts?.length) base.push({ id: "behind", label: "비하인드" });
		return base;
	}, [hasArtist, data.relatedBts]);

	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(
		TABS.map((t) => t.id),
		44,
		68,
	);

	const sectionNames = useMemo(() => TABS.map((t) => t.id), [TABS]);
	useSectionTime("artwork_detail", sectionNames);

	const { slug } = useExhibition();

	// 작품 관리 메뉴(연필 버튼)는 두록 작품 상세와 같은 컴포넌트를 쓴다
	const isMine = useIsOwnArtist(data.participants.map((participant) => participant.artistId));
	const [myArtwork] = useMyArtwork(artworkId, isMine);

	const prevArtwork = data.alphabeticalArtworks.find((a) => a.type === "prev");
	const nextArtwork = data.alphabeticalArtworks.find((a) => a.type === "next");

	const [isMainImageViewerOpen, setIsMainImageViewerOpen] = useState(false);

	const handleMainImageClick = () => {
		setIsMainImageViewerOpen(true);
	};

	return (
		<div className="flex flex-col">
			<Header variant="sub" title="작품 상세" />

			<div className="w-full">
				{data.mainImage ? (
					<>
						<button
							type="button"
							onClick={handleMainImageClick}
							className="relative block w-full cursor-pointer overflow-hidden min-[721px]:hidden"
							aria-label="작품 대표 이미지 전체보기"
						>
							<Image
								src={data.mainImage}
								alt={data.title}
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: "100%", height: "auto" }}
								priority
							/>
						</button>
						<button
							type="button"
							onClick={handleMainImageClick}
							className="relative hidden w-full cursor-pointer overflow-hidden min-[721px]:flex min-[721px]:items-center min-[721px]:justify-center"
							aria-label="작품 대표 이미지 전체보기"
						>
							<Image
								src={data.mainImage}
								alt={data.title}
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "400px" }}
								priority
							/>
						</button>
					</>
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
			{hasArtist && (
				<section
					data-section="artist"
					ref={(el) => {
						if (sectionRefs.artist) sectionRefs.artist.current = el;
					}}
				>
					<ArtistSection
						authors={authors}
						getProfileHref={(author) => `/${slug}/artist/${author.profileId}`}
					/>
				</section>
			)}

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

			{isMine && (
				<ArtworkManageFab
					artworkId={artworkId}
					title={data.title}
					viewCount={data.viewCount ?? 0}
					likeCount={data.likeCount ?? 0}
					qrPath={`/${slug}/artwork/${artworkId}`}
					myArtwork={myArtwork}
				/>
			)}
			<ScrollTabBar
				tabs={TABS}
				activeTab={activeTab}
				onTabClick={(tabId) => {
					handleTabClick(tabId);
					track("Artwork Tab Clicked", { tab: tabId, artwork_title: data.title });
				}}
				leading={
					<LikeButton
						initialLiked={!!data.liked}
						onToggle={(next, visitorId) => setArtworkLike(artworkId, next, visitorId)}
					/>
				}
			/>
		</div>
	);
}
