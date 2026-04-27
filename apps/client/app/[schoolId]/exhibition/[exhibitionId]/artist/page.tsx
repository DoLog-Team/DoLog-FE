"use client";

import { useParams } from "next/navigation";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { RowCardGrid } from "@/components/common/Card/RowCard/RowCardGrid";
import { Divider } from "@/components/common/Divider/Divider";
import { Title } from "@/components/common/Title/Title";
import { MOCK_ARTIST_DATA } from "@/constants/artist";
import { Header } from "../_components/Header";

export default function ArtistDetailPage() {
  const params = useParams();
  const schoolId = params?.schoolId;
  const id = params?.id;

  const schoolIdStr = Array.isArray(schoolId) ? schoolId[0] : schoolId || "";
  const exhibitionId = params?.exhibitionId;
  const exhibitionIdStr = Array.isArray(exhibitionId)
    ? exhibitionId[0]
    : exhibitionId || "";

  return (
    <>
      <Header variant="logo" />
      {/* 페이지 타이틀 */}
      <div className="flex flex-col w-full px-4">
        <Title title="참여한 사람들" />

        {/* 작가 리스트 */}
        <section className="flex flex-col">
          <Title title="작가" size="head2" />
          <CardGrid
            items={MOCK_ARTIST_DATA.map((artist) => ({
              id: artist.id,
              title: artist.name ?? "이름",
              author: artist.engName ?? "Name",
              imageUrl: artist.imageUrl,
              category: "",
            }))}
            getHref={(item) =>
              `/${schoolIdStr}/exhibition/${exhibitionIdStr}/artist/${item.id}`
            }
          />
        </section>

        {/* 구분선 */}
        <Divider />

        {/* 도움을 주신 분들 */}
        <Title title="도움을 주신 분들" />
        <section className="flex flex-col mb-6">
          <Title title="지도 교수님" size="head2" />
          <RowCardGrid items={MOCK_ARTIST_DATA} />
        </section>

        {/* 전시 준비 위원회 */}
        <section className="flex flex-col">
          <Title title="전시 준비 위원회" size="head2" />
          <RowCardGrid items={MOCK_ARTIST_DATA} />
        </section>
      </div>
    </>
  );
}
