import { getArtistProfiles } from "../../../lib/api/artists/artist";
import { getPartners } from "../../../lib/api/partner";
import { resolveExhibitionId } from "../_api/resolveExhibitionId";
import { ArtistPageClient } from "./_components/ArtistPageClient";

interface ArtistPageProps {
	params: Promise<{
		exhibitionId: string;
	}>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
	const { exhibitionId } = await params;

	const uuid = await resolveExhibitionId(exhibitionId);
	if (!uuid) return null;

	const [partners, artists] = await Promise.all([getPartners(uuid), getArtistProfiles(uuid)]);

	return <ArtistPageClient exhibitionId={exhibitionId} partners={partners} artists={artists} />;
}
