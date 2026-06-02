import type { Metadata } from "next";
import { Divider } from "@/components/common/Divider/Divider";
import { SectionTimeTracker } from "@/components/common/SectionTimeTracker";
import { resolveExhibitionSlug } from "@/lib/api/exhibition";
import { getArtistDetail } from "../../../../lib/api/artists/artist-detail";
import { getExhibitionMeta } from "../../_api/getExhibitionMeta";
import { resolveExhibitionId } from "../../_api/resolveExhibitionId";
import { Header } from "../../_components/Header";
import { NotFound } from "../../_components/NotFound";
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
		getArtistDetail(artistId),
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

	const artist = await getArtistDetail(artistId);
	if (!artist) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" title="작가 상세" />
				<NotFound message="작가를 찾을 수 없습니다." />
			</main>
		);
	}

	return (
		<>
			<SectionTimeTracker pageName="artist_detail" sections={["profile", "contact", "artworks"]} />
			<Header variant="back" title="작가 상세" />

			<div className="flex flex-col px-4 w-full mx-auto">
				<div data-section="profile">
					<ProfileSection artist={artist} />
				</div>

				{(!!artist.contact.email || (artist.contact.snsList?.length ?? 0) > 0) && (
					<ContactSection contact={artist.contact} />
				)}

				<Divider />

				<BTSSection exhibitionId={exhibitionId} artist={artist} />

				<ArtworkSection artist={artist} exhibitionId={exhibitionId} />

				<NavigationSection artist={artist} />
			</div>
		</>
	);
}
