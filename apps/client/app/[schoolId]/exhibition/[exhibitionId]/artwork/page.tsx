import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { Header } from "../_components/Header";
import { ArtworkListSection } from "./_components/ArtworkListSection";
import { GuideSection } from "./_components/GuideSection";
import { MOCK_SCHOOL_DATA } from "@/app/[schoolId]/school-config";

interface ArtworkListPageProps {
    params: Promise<{ schoolId: string }>;
}

export default async function ArtworkListPage({ params }: ArtworkListPageProps) {
	const { schoolId } = await params;
    const schoolConfig = MOCK_SCHOOL_DATA[schoolId];
    const exhibition = MOCK_EXHIBITION_DATA[1];

	return (
		<main>
			<Header logoUrl={schoolConfig.logoSrc} /*onMenuClick={() => {}}*/ />
			{/* 관람 안내 섹션 */}
			<GuideSection guideImages={exhibition.guideImages} />
			{/* 작품 목록 섹션 */}
			<ArtworkListSection />
		</main>
	);
}

// 0428 TODO
// - 헤더 분기처리
// - 버튼 이동 인터랙션 완성
