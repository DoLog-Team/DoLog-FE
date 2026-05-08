import { resolveExhibitionSlug } from "@/lib/api/exhibition";
import { ArtistPageClient } from "./_components/ArtistPageClient";
import { getArtistProfiles } from "./api/artist";
import { getPartners } from "./api/partner";

interface ArtistPageProps {
	params: Promise<{
		schoolId: string;
		exhibitionId: string;
	}>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
	const { schoolId, exhibitionId } = await params;

	const resolved = await resolveExhibitionSlug(exhibitionId);

	if (!resolved) {
		return null;
	}

	const [partners, artistsRaw] = await Promise.all([
		getPartners(resolved.uuid),
		getArtistProfiles(resolved.uuid),
	]);
	const artists = Array.isArray(artistsRaw) ? artistsRaw : [];

	return (
		<ArtistPageClient
			schoolId={schoolId}
			exhibitionId={exhibitionId}
			partners={partners}
			artists={artists}
		/>
	);
}
