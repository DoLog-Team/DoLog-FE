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
import { MOCK_BEHIND_THE_SCENE } from "../../bts/_mocks/behind-the-scene";

interface ArtistDetailPageProps {
	params: Promise<{ schoolId: string; exhibitionId: string; artistId: string }>;
}

export default async function ArtistDetailPage({ params }: ArtistDetailPageProps) {
	const { schoolId, exhibitionId, artistId } = await params;

	const artist = MOCK_ARTIST_DATA.find((a) => a.id === artistId);
	if (!artist) return <div>작가 없음</div>;

	const { prev, next } = getPrevNextArtist(MOCK_ARTIST_DATA, artistId);
	const linkItems = transformLinks(artist.email, artist.sns);
	const btsItems = MOCK_BEHIND_THE_SCENE.filter((b) => b.artistId === artistId);

	return (
		<>
			<Header variant="back" title="작가 상세" />
			<div className="flex flex-col px-4 w-full mx-auto">
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

				<Divider />

				{/* Behind */}
				{btsItems.length > 0 && (
					<section className="mb-8">
						<Title title="Behind The Scene" size="head2" margin="compact" />
						<div className="mt-4">
							<BTSCardGrid
								items={btsItems}
								getHref={(item) => `/${schoolId}/exhibition/${exhibitionId}/bts/${item.id}`}
							/>
						</div>
					</section>
				)}

				{/* 작품 */}
				<section className="mb-6">
					<Title title="작품" size="head2" margin="compact" />
					<ListCardGrid items={MOCK_WORK_DATA} limit={3} />
				</section>

				{/* 작가 둘러보기 */}
				<section className="mt-7 flex flex-col gap-2.5 mb-6">
					<Title title="작가 둘러보기" size="body1-bold" color="lighter" margin="none" />
					<PostNavigation
						prevPost={prev ? { id: prev.id, title: prev.name } : undefined}
						nextPost={next ? { id: next.id, title: next.name } : undefined}
					/>
				</section>
			</div>
		</>
	);
}
