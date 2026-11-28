import type { Metadata } from "next";
import { cookies } from "next/headers";
import MainFooter from "@/components/common/Footer/MainFooter";
import { getArtworks } from "@/lib/api/artwork";
import { VISITOR_COOKIE } from "@/lib/visitor";
import { DetailHeader } from "../../_components/DetailHeader";
import { getDologArtist } from "./_api/getArtist";
import { ArtistDetailClient } from "./_components/ArtistDetailClient";

// 두록 작가 상세 (일반 프로필)
// 전시 안의 작가 상세(app/[exhibitionId]/artist/[artistId])와는 별개

interface Props {
	params: Promise<{ artistId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { artistId } = await params;
	const artist = await getDologArtist(artistId);
	const title = artist?.nameKo ? `${artist.nameKo} | 두록(Dolog)` : "두록(Dolog)";

	return {
		title,
		description: artist?.bio ?? undefined,
		openGraph: {
			title,
			description: artist?.bio ?? undefined,
			images: artist?.profileImg ? [{ url: artist.profileImg }] : [],
		},
	};
}

export default async function DologArtistPage({ params }: Props) {
	const { artistId } = await params;
	// 방문자 ID 를 같이 보내야 내가 누른 좋아요(liked)가 처음부터 맞게 보인다
	const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;
	const [dologArtist, allArtworks] = await Promise.all([
		getDologArtist(artistId, visitorId),
		getArtworks(),
	]);

	// TODO : 백 수정 오면 다시 수정하기. (현재는 임시로 무거운 구조임. 수정 시에 걷어낼 예정)
	// GET /artists/{id} 의 작품에는 카테고리가 없어서 전체 작품 목록(GET /artworks)에서 찾아 채운다
	// BE 가 category 를 직접 내려주면 그 값을 먼저 쓴다
	const categoryById = new Map(allArtworks.map((artwork) => [artwork.id, artwork.category]));
	const artist = dologArtist && {
		...dologArtist,
		artworks: dologArtist.artworks.map((artwork) => ({
			...artwork,
			category: artwork.category ?? categoryById.get(artwork.artworkId) ?? null,
		})),
	};

	return (
		// 하단 고정 탭바에 푸터가 가리지 않게
		<div className="flex flex-col pb-12">
			<DetailHeader title="작가 상세" />
			{artist ? (
				<ArtistDetailClient artist={artist} />
			) : (
				<p className="py-20 text-center text-body1 text-lighter">작가를 찾을 수 없습니다.</p>
			)}
			<MainFooter />
		</div>
	);
}
