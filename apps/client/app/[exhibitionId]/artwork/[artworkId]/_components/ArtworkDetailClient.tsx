"use client";
import Image from "next/image";
import { useMemo } from "react";
import { Divider } from "@/components/common/Divider/Divider";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import type { ArtworkDetail } from "@/lib/api/artwork";
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

	// ScrollTabBar 탭 목록 [ 작품 소개, 작가 소개, 비하인드(선택) ]
	const TABS = useMemo(() => {
		const base = [
			{ id: "detail", label: "작품 소개" },
			{ id: "artist", label: "작가 소개" },
		];
		if (data.relatedBts?.length) base.push({ id: "behind", label: "비하인드" });
		return base;
	}, [data.relatedBts]);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(TABS.map((t) => t.id));

	// 둘러보기 목록(prev,next 정의)
	const alphabetical = data.alphabeticalArtworks;
	const currentTitle = data.title;
	const prevArtwork = alphabetical.find((a) => a.title < currentTitle);
	const nextArtwork = alphabetical.find((a) => a.title > currentTitle);

	return (
		<div className="flex flex-col">
			<Header variant="back" />

			{/* 대표 이미지 */}
			<div className="relative aspect-video w-full">
				{data.mainImage ? (
					<Image src={data.mainImage} alt={data.title} fill className="object-cover" priority />
				) : (
					<div className="w-full h-full bg-fg-lighter flex items-center justify-center">
						<Image src="/icons/empty-image.svg" alt="이미지 없음" width={32} height={32} />
					</div>
				)}
			</div>
			{/* 작품 제목 및 정보 섹션 */}
			<InfoSection data={data} />
			{/* 작품 위치 섹션 */}
			<LocationSection locationImageUrl={data.locationMap} />
			{/* 상세 소개 섹션 */}
			<section
				ref={(el) => {
					sectionRefs.detail.current = el;
				}}
			>
				<DescriptionSection content={data.description} />
			</section>
			{/*  유튜브 섹션  */}
			<YoutubeSection youtubeUrl={data.youtubeUrl} />
			{/* 상세 이미지 섹션*/}
			<PhotoSection data={data} />
			{/* 참여자 섹션 */}
			<section
				ref={(el) => {
					sectionRefs.artist.current = el;
				}}
			>
				<ArtistSection authors={data.participants} />
			</section>
			
			{/* BTS 섹션 - 선택값 */}
			{data.relatedBts && data.relatedBts.length > 0 && (
				<>
				<Divider />
				<section
					ref={(el) => {
						sectionRefs.behind.current = el;
					}}
				>
					<BtsSection bts={data.relatedBts} />
				</section>
				</>
			)}
			{/* 동일한 카테고리 작품 섹션 */}
			{data.sameCategoryArtworks && data.sameCategoryArtworks.length > 0 && (
				<RelatedSection artworks={data.sameCategoryArtworks} />
			)}
			{/* 둘러보기 섹션 */}
			<PostNavigationSection prevArtwork={prevArtwork} nextArtwork={nextArtwork} />

			{/* 하단 스크롤탭바 */}
			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
		</div>
	);
}
