import { getArtworksList } from "@/lib/api/artwork";
import { resolveExhibitionId } from "../_api/resolveExhibitionId";
import { Header } from "../_components/Header";
import { NotFound } from "../_components/NotFound";
// import { DEFAULT_EXHIBITION_CONFIG, MOCK_EXHIBITION_CONFIG } from "../exhibition-config";
import { ArtworksClient } from "./_components/ArtworksClient";

// import { MOCK_ARTWORK_LIST } from "./_mocks/artworkList";

interface ArtworkListPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export default async function ArtworkListPage({ params }: ArtworkListPageProps) {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);

	if (!uuid) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="전시를 찾을 수 없습니다." />
			</main>
		);
	}

	const artworkData = await getArtworksList(uuid);

	if (!artworkData) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="작품 목록을 찾을 수 없습니다." />
			</main>
		);
	}

	const HIDE_FILTER_EXHIBITION_IDS = new Set(["5918413e-3bb4-4237-ae4d-c55d8f025f34"]);
	const hideFilter = HIDE_FILTER_EXHIBITION_IDS.has(uuid);

	return (
		<main>
			<Header />
			<ArtworksClient maps={artworkData.maps} zones={artworkData.zones} hideFilter={hideFilter} />
		</main>
	);
}
