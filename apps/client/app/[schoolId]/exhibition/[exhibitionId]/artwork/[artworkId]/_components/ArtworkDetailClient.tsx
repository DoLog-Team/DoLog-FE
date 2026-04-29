"use client";
import Image from "next/image";
import { useMemo } from "react";
import type { MOCK_ARTWORK_DETAIL } from "@/app/[schoolId]/exhibition/[exhibitionId]/artwork/_mocks/artworkDetail";
import { Divider } from "@/components/common/Divider/Divider";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { Header } from "../../../_components/Header";
import { ArtistSection } from "../_components/ArtistSection";
import { BtsSection } from "../_components/BtsSection";
import { DescriptionSection } from "../_components/DescriptionSection";
import { InfoSection } from "../_components/InfoSection";
import { LocationSection } from "../_components/LocationSection";
import { PhotoSection } from "../_components/PhotoSection";
import { PostNavigationSection } from "../_components/PostNavigationSection";
import { RelatedSection } from "../_components/RelatedSection";

export function ArtworkDetailClient({
	data,
	schoolId,
}: {
	data: typeof MOCK_ARTWORK_DETAIL;
	schoolId: string;
}) {
	// ScrollTabBar 탭 목록 [ 작품 소개, 작가 소개, 비하인드(선택) ]
	const TABS = useMemo(() => {
		const base = [
			{ id: "detail", label: "작품 소개" },
			{ id: "artist", label: "작가 소개" },
		];
		if (data.bts?.length) base.push({ id: "behind", label: "비하인드" });
		return base;
	}, [data.bts]);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(TABS.map((t) => t.id));

	return (
		<div className="flex flex-col">
			<Header variant="back" />

			{/* 대표 이미지 */}
			<div className="relative aspect-video w-full">
				<Image src={data.image} alt={data.title} fill className="object-cover" priority />
			</div>
			{/* 작품 제목 및 정보 섹션 */}
			<InfoSection data={data} />
			{/* 작품 위치 섹션 */}
			<LocationSection locationImageUrl={data.locationImageUrl} />
			{/* 상세 소개 섹션 */}
			<section
				ref={(el) => {
					sectionRefs.detail.current = el;
				}}
			>
				<DescriptionSection content={data.description} />
			</section>
			{/* 상세 이미지 섹션*/}
			<PhotoSection images={data.detailImages} purchaseUrl={data.purchaseUrl} />
			{/* 참여자 섹션 */}
			<section
				ref={(el) => {
					sectionRefs.artist.current = el;
				}}
			>
				<ArtistSection authors={data.authors} schoolId={schoolId} />
			</section>
			<Divider />
			{/* BTS 섹션 - 선택값 */}
			{data.bts?.length > 0 && (
				<section
					ref={(el) => {
						sectionRefs.behind.current = el;
					}}
				>
					<BtsSection bts={data.bts} />
				</section>
			)}
			{/* 동일한 카테고리 작품 섹션 */}
			<RelatedSection category={data.category} />
			{/* 둘러보기 섹션 */}
			<PostNavigationSection prevArtwork={data.prevArtwork} nextArtwork={data.nextArtwork} />

			{/* 하단 스크롤탭바 */}
			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
		</div>
	);
}
