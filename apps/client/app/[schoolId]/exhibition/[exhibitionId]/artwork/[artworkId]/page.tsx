import Image from "next/image";
import { MOCK_ARTWORK_DETAIL } from "@/app/(main)/_mocks/artworkDetail";
import { Header } from "../../_components/Header";
import { ArtistSection } from "./_components/ArtistSection";
import { BtsSection } from "./_components/BtsSection";
import { DescriptionSection } from "./_components/DescriptionSection";
import { InfoSection } from "./_components/InfoSection";
import { LocationSection } from "./_components/LocationSection";
import { PhotoSection } from "./_components/PhotoSection";
import { RelatedSection } from "./_components/RelatedSection";
import { PostNavigationSection } from "./_components/PostNavigationSection";

export default function ArtworkDetailPage() {
	const data = MOCK_ARTWORK_DETAIL; // TODO : fetch 변경 예정

	return (
		<div className="flex flex-col">
			<Header />
			{/* 대표 이미지 */}
			<div className="relative aspect-video w-full">
				<Image src={data.image} alt={data.title} fill className="object-cover" priority />
			</div>
			{/* 작품 제목 및 정보 섹션 */}
			<InfoSection data={data} />
			{/* 작품 위치 섹션 */}
			<LocationSection locationImageUrl={data.locationImageUrl} />
			{/* 상세 소개 섹션 */}
			<DescriptionSection content={data.description} exhibitionTitle={data.exhibitionTitle}/>
			{/* 상세 이미지 섹션*/}
			<PhotoSection images={data.detailImages} />
			{/* 참여자 섹션 */}
			<ArtistSection authors={data.authors} />
			{/* TODO : 머지 후 Divider import */}
			{/* BTS 섹션 */}
			<BtsSection bts={data.bts} />
			{/* 동일한 카테고리 작품 섹션 */}
			<RelatedSection category={data.category} />
			{/* 둘러보기 섹션 */}
			<PostNavigationSection
				prevArtwork={data.prevArtwork} 
				nextArtwork={data.nextArtwork} 
			/>
		</div>
	);
}
