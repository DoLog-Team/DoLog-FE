import { resolveExhibitionSlug } from "@/lib/api/exhibition";
import { getArtistDetail } from "../../../../lib/api/artists/artist-detail";
import { Header } from "../../_components/Header";
import { ArtworkSection } from "./components/sections/ArtworkSection";
import { BTSSection } from "./components/sections/BTSSection";
import { ContactSection } from "./components/sections/ContactSection";
import { NavigationSection } from "./components/sections/NavigationSection";
import { ProfileSection } from "./components/sections/ProfileSection";

interface Props {
	params: Promise<{
		exhibitionId: string;
		artistId: string;
	}>;
}

export default async function ArtistDetailPage({ params }: Props) {
	const { exhibitionId, artistId } = await params;

	const resolved = await resolveExhibitionSlug(exhibitionId);
	if (!resolved) return null;

	const artist = await getArtistDetail(artistId);
	if (!artist) return <div>작가 없음</div>;

	return (
		<>
			<Header variant="back" title="작가 상세" />

			<div className="flex flex-col px-4 w-full mx-auto">
				<ProfileSection artist={artist} />

				<ContactSection contact={artist.contact} />

				<BTSSection exhibitionId={exhibitionId} artist={artist} />

				<ArtworkSection artist={artist} exhibitionId={exhibitionId} />

				<NavigationSection artist={artist} />
			</div>
		</>
	);
}
