import { CATEGORIES, MOCK_ARTWORKS } from "../_mocks/artwork";
import ArtworksClient from "./_components/ArtworksClient";

const categories = CATEGORIES.filter((c) => c !== "전체");

const allArtworks = [
	...new Map(
		categories.flatMap((c) => MOCK_ARTWORKS[c]).map((item) => [item.id, item]),
	).values(),
];

export default function ArtworksPage() {
	return <ArtworksClient artworks={allArtworks} categories={[...categories]} />;
}
