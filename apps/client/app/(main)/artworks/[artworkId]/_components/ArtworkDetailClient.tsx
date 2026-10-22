"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArtistSection } from "@/app/[exhibitionId]/artwork/[artworkId]/_components/ArtistSection";
import { DescriptionSection } from "@/app/[exhibitionId]/artwork/[artworkId]/_components/DescriptionSection";
import { InfoSection } from "@/app/[exhibitionId]/artwork/[artworkId]/_components/InfoSection";
import { PhotoSection } from "@/app/[exhibitionId]/artwork/[artworkId]/_components/PhotoSection";
import { PostNavigationSection } from "@/app/[exhibitionId]/artwork/[artworkId]/_components/PostNavigationSection";
import { Divider } from "@/components/common/Divider/Divider";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { ImageViewerModal } from "@/components/common/ImageViewerModal/ImageViewerModal";
import { LikeButton } from "@/components/common/LikeButton/LikeButton";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { type ArtworkDetail, setArtworkLike } from "@/lib/api/artwork";
import { useIsOwnArtist } from "@/lib/auth/useIsOwnArtist";
import { ArtworkManageFab } from "./ArtworkManageFab";
import { RelatedExhibitionCta } from "./RelatedExhibitionCta";
import { useMyArtwork } from "./useMyArtwork";
import { useRecordArtworkView } from "./useRecordArtworkView";

// 섹션은 전시 작품 상세(app/[exhibitionId]/artwork/[artworkId]) 것을 재사용한다

// 크기 라벨은 모든 작품 공통 가로 · 세로 · 높이 (작가 어드민 입력 폼과 같음, v2 BE 변경 사항을 반영한 것)
function formatYear({ productionStartYear: start, productionEndYear: end }: ArtworkDetail) {
	if (start && end && start !== end) return `${start} – ${end}`;
	return start ?? end ?? null;
}

function formatSize({ width, height, depth }: ArtworkDetail) {
	// 0 은 입력하지 않은 값으로 본다
	const parts = [
		["가로", width],
		["세로", height],
		// 작가 어드민 입력 폼에서 depth 는 "높이 (부피가 있는 경우)"
		["높이", depth],
	]
		.filter(([, value]) => !!value)
		.map(([label, value]) => `${label} ${value}cm`);
	return parts.length ? parts.join(" × ") : null;
}

interface ArtworkDetailClientProps {
	artworkId: string;
	data: ArtworkDetail;
}

export function ArtworkDetailClient({ artworkId, data }: ArtworkDetailClientProps) {
	useRecordArtworkView(artworkId);

	const isMine = useIsOwnArtist(data.participants.map((participant) => participant.artistId));
	const [myArtwork] = useMyArtwork(artworkId, isMine);

	const hasArtist = data.participants.length > 0;

	const tabs = useMemo(() => {
		const base = [{ id: "detail", label: "작품 소개" }];
		if (hasArtist) base.push({ id: "artist", label: "작가 소개" });
		return base;
	}, [hasArtist]);

	// 헤더 높이 모바일 44px, 데스크탑 68px
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(
		tabs.map((tab) => tab.id),
		44,
		68,
	);

	const [isMainImageViewerOpen, setIsMainImageViewerOpen] = useState(false);

	const year = formatYear(data);
	const materialAndSize = [data.materials?.join(", "), formatSize(data)]
		.filter(Boolean)
		.join(" / ");
	const infoLines = [year ? String(year) : null, materialAndSize || null].filter(
		(line): line is string => !!line,
	);

	// TODO: purchaseUrl / purchaseChatUrl 중 어느 쪽으로 보낼지 BE 확인 — 우선 채팅 링크 우선
	const purchaseUrl = data.showPurchaseButton ? (data.purchaseChatUrl ?? data.purchaseUrl) : null;

	// 추천 작품 (sameCategoryArtworks: 같은 작가 기준으로 필터링, 출품 안 한 작품은 빈 배열)
	const [firstOther, secondOther] = data.sameCategoryArtworks;

	return (
		<div className="flex flex-col">
			{/* 대표 이미지 — 16:9 꽉 채움, 최대 높이 600px (Figma) */}
			{data.mainImage ? (
				<>
					<button
						type="button"
						onClick={() => setIsMainImageViewerOpen(true)}
						className="relative block aspect-video max-h-150 w-full cursor-pointer overflow-hidden"
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
					<ImageViewerModal
						open={isMainImageViewerOpen}
						onOpenChange={setIsMainImageViewerOpen}
						src={data.mainImage}
						alt={data.title}
						title={data.title}
					/>
				</>
			) : (
				<EmptyImageFallback className="aspect-video max-h-150 w-full" />
			)}

			<InfoSection data={data} hideArtistRole lines={infoLines} />
			<Divider />

			<section
				ref={(el) => {
					sectionRefs.detail.current = el;
				}}
			>
				<DescriptionSection content={data.description} title="작품 설명" />
				<PhotoSection data={{ detailImages: data.detailImages, purchaseUrl, title: data.title }} />
			</section>

			{hasArtist && (
				<section
					ref={(el) => {
						if (sectionRefs.artist) sectionRefs.artist.current = el;
					}}
				>
					<ArtistSection
						authors={data.participants}
						getProfileHref={(author) => `/artists/${author.artistId}`}
						title="작가"
					/>
				</section>
			)}

			{firstOther && (
				<PostNavigationSection
					prevArtwork={firstOther}
					nextArtwork={secondOther}
					title="작가의 다른 작품 둘러보기"
					getHref={(artwork) => `/artworks/${artwork.id}`}
				/>
			)}

			{/* 관련 전시 보기는 출품 전시가 있을 때만 누구에게나 뜬다 */}
			{/* TODO: GET artworks/{artworkId} 응답에 exhibitionId·exhibitionTitle·slug 추가 BE 문의 중 — 오기 전까지는 뜨지 않음, 답변 오면 필드명 확인 */}
			{data.exhibitionId && (
				<RelatedExhibitionCta exhibitionId={data.exhibitionId} slug={data.slug} />
			)}
			{isMine && (
				<ArtworkManageFab
					artworkId={artworkId}
					title={data.title}
					viewCount={data.viewCount ?? 0}
					likeCount={data.likeCount ?? 0}
					qrPath={`/artworks/${artworkId}`}
					myArtwork={myArtwork}
				/>
			)}
			<ScrollTabBar
				tabs={tabs}
				activeTab={activeTab}
				onTabClick={handleTabClick}
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
