import { CardGrid } from "@/components/common/Card/CardGrid";
import { RowCardGrid } from "@/components/common/Card/RowCard/RowCardGrid";
import { Divider } from "@/components/common/Divider/Divider";
import { Title } from "@/components/common/Title/Title";
import { MOCK_ARTIST_DATA } from "@/constants/artist";
import { Header } from "../_components/Header";
import { MOCK_PARTNERS } from "./_mocks/partners";

interface ArtistPageProps {
  params: Promise<{ schoolId: string; exhibitionId: string }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { schoolId, exhibitionId } = await params;

  return (
    <>
      <Header variant="logo" />
      <div className="flex flex-col w-full px-4">
        <Title title="참여한 사람들" />

        {/* 작가 리스트 */}
        <section className="flex flex-col pb-6">
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
              `/${schoolId}/exhibition/${exhibitionId}/artist/${item.id}`
            }
          />
        </section>

        <Divider />

        {/* 도움을 주신 분들 */}
        <Title title="도움을 주신 분들" />
        {MOCK_PARTNERS.sort((a, b) => a.order - b.order).map((part) => (
          <section key={part.part_id} className="flex flex-col mb-6">
            <Title title={part.part_name} size="head2" margin="compact" />
            <RowCardGrid
              items={part.members.map((m) => ({
                id: m.member_id,
                name: m.member_name,
                engName: m.member_name_en ?? undefined,
                email: m.member_email ?? undefined,
                imageUrl: m.member_image_url ?? undefined,
              }))}
            />
          </section>
        ))}
      </div>
    </>
  );
}
