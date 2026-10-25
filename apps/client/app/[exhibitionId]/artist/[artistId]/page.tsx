import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getDologArtist } from "@/app/(main)/artists/[artistId]/_api/getArtist";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { SectionTimeTracker } from "@/components/common/SectionTimeTracker";
import { resolveExhibitionSlug } from "@/lib/api/exhibition";
import { hasArtistProfileInfo } from "@/lib/utils/artistProfile";
import { VISITOR_COOKIE } from "@/lib/visitor";
import { getArtistDetail } from "../../../../lib/api/artists/artist-detail";
import { getExhibitionMeta } from "../../_api/getExhibitionMeta";
import { resolveExhibitionId } from "../../_api/resolveExhibitionId";
import { Header } from "../../_components/Header";
import { NotFound } from "../../_components/NotFound";
import { ArtistManageFab } from "./_components/ArtistManageFab";
import { ArtistTabBar } from "./_components/ArtistTabBar";
import { OtherArtworksCta } from "./_components/OtherArtworksCta";
import { ArtworkSection } from "./_components/sections/ArtworkSection";
import { BTSSection } from "./_components/sections/BTSSection";
import { ContactSection } from "./_components/sections/ContactSection";
import { NavigationSection } from "./_components/sections/NavigationSection";
import { ProfileSection } from "./_components/sections/ProfileSection";

interface Props {
	params: Promise<{
		exhibitionId: string;
		artistId: string;
	}>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { exhibitionId, artistId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const [artist, meta] = await Promise.all([
		uuid ? getArtistDetail(artistId, uuid) : null,
		uuid ? getExhibitionMeta(uuid) : null,
	]);

	const title = [meta?.title, artist?.nameKo].filter(Boolean).join(" | ");

	return {
		title,
		description: artist?.bio ?? undefined,
		openGraph: {
			title,
			description: artist?.bio ?? undefined,
			images: artist?.profileImage ? [{ url: artist.profileImage }] : [],
		},
	};
}

export default async function ArtistDetailPage({ params }: Props) {
	const { exhibitionId, artistId } = await params;

	const resolved = await resolveExhibitionSlug(exhibitionId);
	if (!resolved) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" title="작가 상세" />
				<NotFound message="전시를 찾을 수 없습니다." />
			</main>
		);
	}

	// 방문자 ID 를 같이 보내야 내가 누른 좋아요(liked)가 처음부터 맞게 보인다
	const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;
	const artist = await getArtistDetail(artistId, resolved.uuid, visitorId);
	if (!artist) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" title="작가 상세" />
				<NotFound message="작가를 찾을 수 없습니다." />
			</main>
		);
	}

	// 작가 전체 정보(두록 작가 상세와 같은 API) — 작가 조회수와 이 전시 밖 작품이 있는지는 전시 작가 응답에 없다
	const dologArtist = await getDologArtist(artist.artistId);
	const exhibitionArtworkIds = new Set(artist.artworks.map((artwork) => artwork.artworkId));
	const hasOtherArtworks = !!dologArtist?.artworks.some(
		(artwork) => !exhibitionArtworkIds.has(artwork.artworkId),
	);

	// 프로필에 등록된 정보가 하나도 없으면 작가 소개(프로필)를 숨긴다 (Figma 10.20 추가 사항)
	const hasProfile = hasArtistProfileInfo({
		nameKo: artist.nameKo,
		nameEn: artist.nameEn,
		bio: artist.bio,
		profileImage: artist.profileImage,
		email: artist.contact.email,
		snsCount: artist.contact.snsList?.length,
	});

	return (
		<>
			<SectionTimeTracker pageName="artist_detail" sections={["profile", "contact", "artworks"]} />
			<Header variant="sub" title="작가 상세" />

			{hasProfile && (
				<>
					<DesktopContainer className="flex flex-col">
						<div data-section="profile">
							<ProfileSection
								artist={artist}
								bottomSlot={
									!!artist.contact.email || (artist.contact.snsList?.length ?? 0) > 0 ? (
										<ContactSection contact={artist.contact} />
									) : undefined
								}
							/>
						</div>
					</DesktopContainer>

					<Divider />
				</>
			)}

			<DesktopContainer className="flex flex-col">
				<BTSSection exhibitionId={exhibitionId} artist={artist} />

				<ArtworkSection artist={artist} exhibitionId={exhibitionId} />

				<NavigationSection artist={artist} />
			</DesktopContainer>

			{/* 전시 외 작품 보기 — 작품 목록 확인 결과, 이 전시에 없는 작품이 있을 때만 표시 */}
			{hasOtherArtworks && <OtherArtworksCta artistId={artist.artistId} />}
			<ArtistManageFab
				artistId={artist.artistId}
				viewCount={dologArtist?.viewCount ?? 0}
				likeCount={artist.likeCount}
			/>
			<ArtistTabBar
				profileId={artist.profileId}
				initialLiked={artist.liked}
				hasProfile={hasProfile}
				hasArtworks={artist.artworks.length > 0}
			/>
		</>
	);
}
