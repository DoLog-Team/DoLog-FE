import { Header } from "../_components/Header";
import { GuideSection } from "./_components/GuideSection";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";

export default async function ExhibitionDetailPage() {

	const exhibition = MOCK_EXHIBITION_DATA[0]

	return (
		<main>
			<Header />
			{/* 관람 안내 섹션 */}
			<GuideSection guideImages={exhibition.guideImages}/>

			{/* 작품 목록 섹션 */}
			<div className="relative w-full aspect-3/4">SC02 전시물 목록 페이지</div>
		</main>
	);
}



