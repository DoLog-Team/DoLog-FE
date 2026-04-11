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
        헤더 import <br></br>
        =====================<br></br>
        SC01 전시회 소개 페이지
      {/* 썸네일 + 제목 + 주최/학과 + 전시 감상하기 버튼 */}
      {/* <ExhibitionCard exhibition={exhibition} /> */}

      {/* 전시 소개 섹션 */}
      {/* <ExhibitionDetail exhibition={exhibition} /> */}

      {/* 장소 섹션 */}
      {/* <ExhibitionLocation location={exhibition.location} /> */}

      {/* 주최 기관 섹션 */}
      {/* <ExhibitionHost hostInfo={exhibition.hostInfo} /> */}
    </main>
  );
}