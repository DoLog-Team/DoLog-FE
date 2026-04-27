"use client";

import { useParams } from "next/navigation";
import { PostNavigation } from "@/app/[schoolId]/exhibition/[exhibitionId]/artist/[artistId]/components/Navigation/PostNavigation/PostNavigation";
import { BTSCardGrid } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import { Divider } from "@/components/common/Divider/Divider";
import { Title } from "@/components/common/Title/Title";
import { MOCK_ARTIST_DATA } from "@/constants/artist";
import { MOCK_WORK_DATA } from "@/constants/work";
import { getPrevNextArtist } from "@/features/artists/mappers/artist.mapper";
import { transformLinks } from "@/features/artists/mappers/link.mapper";
import { Header } from "../../_components/Header";

export default function ArtistDetailPage() {
	const params = useParams();

	const schoolId = params?.schoolId;
	const id = params?.artistId;
	const schoolIdStr = Array.isArray(schoolId) ? schoolId[0] : schoolId || "";
	const idStr = Array.isArray(id) ? id[0] : id || "";

	const { prev, next } = getPrevNextArtist(MOCK_ARTIST_DATA, idStr);

	const artist = MOCK_ARTIST_DATA.find((a) => a.id === idStr);
	if (!artist) return <div>작가 없음</div>;

	const linkItems = transformLinks(artist.email, artist.sns);

	return (
		<>
			<Header variant="back" title="작가 상세" />
			<div className="flex flex-col px-4 gap-4 w-full mx-auto">
				<section>
					<ProfileCard
						imageUrl={artist.imageUrl ?? "/images/artists/artist2.png"}
						name={artist.name}
						engName={artist.engName}
						bio={artist.bio}
					/>
				</section>

				<Title title="연락처" size="head2" />
				<LinkCard items={linkItems} />

				{/* 구분선 */}
				<Divider />

				{/* Behind */}
				<section className="mb-8">
					<Title title="Behind The Scene" size="head2" />

					<div className="mt-4">
						<BTSCardGrid
							items={[
								{
									id: 1,
									title: "내가 흙을 사랑하는 이유",
									author: "강슬기",
									imageUrl: "/images/bts/bts1.png",
								},
								{
									id: 2,
									title: "내가 흙을 사랑하는 이유",
									author: "강슬기",
									imageUrl: "/images/bts/bts1.png",
								},
							]}
						/>
					</div>
				</section>

				{/* 작품 */}
				<section>
					<Title title="작품" size="head2" />
					<ListCardGrid items={MOCK_WORK_DATA} limit={3} />
				</section>

				{/* 작가 둘러보기 */}
				<section>
					<Title title="작가 둘러보기" size="body1-bold" color="lighter" />
					<PostNavigation
						prevPost={prev ? { id: prev.id, title: prev.name } : undefined}
						nextPost={next ? { id: next.id, title: next.name } : undefined}
					/>
				</section>
			</div>
		</>
	);
}
