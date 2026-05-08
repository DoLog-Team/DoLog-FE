import { getArtworksList } from "@/lib/api/artwork";
import { resolveExhibitionId } from "../_api/resolveExhibitionId";
import { Header } from "../_components/Header";
import { DEFAULT_EXHIBITION_CONFIG, MOCK_EXHIBITION_CONFIG } from "../exhibition-config";
import { ArtworksClient } from "./_components/ArtworksClient";
import { MOCK_ARTWORK_LIST } from "./_mocks/artworkList";

interface ArtworkListPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export default async function ArtworkListPage({ params }: ArtworkListPageProps) {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const config = MOCK_EXHIBITION_CONFIG[exhibitionId] ?? DEFAULT_EXHIBITION_CONFIG;

	const artworkData = uuid
		? ((await getArtworksList(uuid)) ?? MOCK_ARTWORK_LIST)
		: MOCK_ARTWORK_LIST;

	// const exhibition =
	// 	MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId) ?? MOCK_EXHIBITION_DATA[0];

	return (
		<main>
			<Header logoUrl={config.logoSrc} />
			<ArtworksClient maps={artworkData.maps} artworks={artworkData.artworks} />
		</main>
	);
}
