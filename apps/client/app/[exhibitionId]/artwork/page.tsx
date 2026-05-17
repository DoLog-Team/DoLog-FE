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

	const HIDE_FILTER_EXHIBITION_IDS = new Set(["5918413e-3bb4-4237-ae4d-c55d8f025f34"]);
	const hideFilter = uuid ? HIDE_FILTER_EXHIBITION_IDS.has(uuid) : false;

	return (
		<main>
			<Header />
			<ArtworksClient maps={artworkData.maps} zones={artworkData.zones} hideFilter={hideFilter} />
		</main>
	);
}
