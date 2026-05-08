import { resolveExhibitionSlug } from "@/lib/api/exhibition";
import { ArtistPageClient } from "./_components/ArtistPageClient";
import { getArtistProfiles } from "../../../lib/api/artists/artist";
import { getPartners } from "../../../lib/api/partner";

interface ArtistPageProps {
	params: Promise<{
		exhibitionId: string;
	}>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
	const { exhibitionId } = await params;

	const resolved = await resolveExhibitionSlug(exhibitionId);
	if (!resolved) return null;

	const [partners, artists] = await Promise.all([
		getPartners(resolved.uuid),
		getArtistProfiles(resolved.uuid),
	]);

	return <ArtistPageClient exhibitionId={exhibitionId} partners={partners} artists={artists} />;
}
