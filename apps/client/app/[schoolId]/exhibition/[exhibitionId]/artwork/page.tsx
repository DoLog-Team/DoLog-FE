import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { Header } from "../_components/Header";
import { GuideSection } from "./_components/GuideSection";
import ArtworkkListSection from "./_components/ArtworkkListSection";

export default async function ExhibitionDetailPage() {
	const exhibition = MOCK_EXHIBITION_DATA[0];

	return (
		<main>
			<Header />
			{/* 관람 안내 섹션 */}
			<GuideSection guideImages={exhibition.guideImages} />
			{/* 작품 목록 섹션 */}
			<ArtworkkListSection/>
		</main>
	);
}

// 0428 TODO
// - 필터탭 완성
// - 토글 onClick 이벤트 연결
// - 스크롤 시 상단 요소 고정 완성
// - 인디케이터 만들고 연결
// - 헤더 분기처리 + 인터랙션 완성
// - 버튼 이동 인터랙션 완성
