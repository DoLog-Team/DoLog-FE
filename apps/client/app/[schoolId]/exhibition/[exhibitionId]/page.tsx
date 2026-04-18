import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";

export default async function ExhibitionDetailPage({
	params,
}: {
	params: Promise<{ schoolId: string; exhibitionId: string }>;
}) {
	const { exhibitionId } = await params;
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
			{/* 0413 TODO */}
			{/* 1. 썸네일 + 전시 기본 정보 섹션 */}
			{/* <ExhibitionCard exhibition={exhibition} /> */}
			{/* 2. 전시 감상하기 버튼 (MainButton 만들어서 import) */}
			{/* 3. 전시 소개 섹션 */}
			{/* <ExhibitionDetail exhibition={exhibition} /> */}
			{/* 4. 장소 섹션 */}
			{/* <ExhibitionLocation location={exhibition.location} /> */}
			{/* 5. 주최 기관 섹션 */}
			{/* <ExhibitionHost hostInfo={exhibition.hostInfo} /> */}
		</main>
	);
}
