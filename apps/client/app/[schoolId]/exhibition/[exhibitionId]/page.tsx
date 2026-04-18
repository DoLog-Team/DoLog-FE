import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { Button } from "components";
import { Title } from "@/components/common/Title/Title";
import { Main } from "next/document";

export default async function ExhibitionDetailPage({
	params,
}: {
	params: Promise<{ schoolId: string; exhibitionId: string }>;
}) {
	const { schoolId, exhibitionId } = await params;
	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId);

	if (!exhibition) {
		return <div>전시회를 찾을 수 없습니다.</div>;
	}

	return (
		<main>
			=====================<br></br>
			헤더 import 예정<br></br>
			=====================<br></br>
			SC01 전시회 소개 페이지
			
			<Title title="1. 전시 기본 정보 섹션"/>
			{/* 썸네일카드 */}
			{/* <ExhibitionIntro exhibition={exhibition} /> */}
			<Button variant="main" className="w-full">전시물 감상하기</Button>
			
			<Title title="2. 전시 소개 섹션"/>
			{/* <ExhibitionDetail exhibition={exhibition} /> */}

			<Title title="3. 장소 섹션"/>
			{/* <ExhibitionLocation location={exhibition.location} /> */}
			
			<Title title="4. 주최 기관 섹션"/>
			{/* <ExhibitionHost hostInfo={exhibition.hostInfo} /> */}

			<Title title="푸터"/>
		</main>
	);
}
