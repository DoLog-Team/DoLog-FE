import Image from "next/image";
import { MOCK_SCHOOL_DATA } from "@/app/[schoolId]/school-config";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { ExhibitionDetail } from "./_components/ExhibitionDetailSection";
import { ExhibitionHost } from "./_components/ExhibitionHostSection";
import { ExhibitionIntro } from "./_components/ExhibitionIntroSection";
import { ExhibitionLocation } from "./_components/ExhibitionLocationSection";
import { Header } from "./_components/Header";

interface ExhibitionDetailPageProps {
	params: Promise<{ schoolId: string; exhibitionId: string }>;
}

export default async function ExhibitionDetailPage({ params }: ExhibitionDetailPageProps) {
	const { schoolId, exhibitionId } = await params;
	const schoolConfig = MOCK_SCHOOL_DATA[schoolId];
	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId);

	if (!exhibition) {
		return <div>전시회를 찾을 수 없습니다.</div>;
	}

	return (
		<main>
			<Header logoUrl={schoolConfig.logoSrc} /*onMenuClick={() => {}}*/ />
			{/* 대표 이미지 */}
			<div className="relative w-full aspect-3/4">
				<Image
					src={exhibition.thumbnailUrl}
					alt={exhibition.title}
					fill
					className="object-cover"
					priority
				/>
			</div>
			{/* 제목 및 기본 정보 */}
			<ExhibitionIntro exhibition={exhibition}/>
			{/* 전시 소개 */}
			<ExhibitionDetail exhibition={exhibition} />
			{/* TODO : 머지 후 Divider import */}
			{/* 장소 */}
			<ExhibitionLocation location={exhibition.location} />
			{/* 주최 기관 */}
			<ExhibitionHost hostInfo={exhibition.hostInfo} socialLinks={exhibition.socialLinks} />
		</main>
	);
}
