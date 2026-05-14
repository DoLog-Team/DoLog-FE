import { getArtworks } from "@/lib/api/artwork";
import { CATEGORIES, MOCK_ARTWORKS } from "../_mocks/artwork";
import ArtworksClient from "./_components/ArtworksClient";

export default async function ArtworksPage() {
	const artworks = await getArtworks();

	const displayArtworks =
		artworks.length > 0
			? artworks.map((a) => ({
					id: a.id,
					title: a.title,
					imageUrl: a.imageUrl,
					author: a.artistName,
					category: a.category,
					exhibitionTitle: a.exhibitionTitle,
				}))
			: [
					...new Map(
						CATEGORIES.filter((c) => c !== "전체")
							.flatMap((c) => MOCK_ARTWORKS[c])
							.map((item) => [item.id, item]),
					).values(),
				];

	const exhibitions = [...new Set(artworks.map((a) => a.exhibitionTitle).filter(Boolean))].sort(
		(a, b) => a.localeCompare(b, "ko"),
	);

	const categories = [
		...new Set(
			artworks.length > 0
				? artworks.map((a) => a.category).filter((c): c is string => !!c)
				: CATEGORIES.filter((c) => c !== "전체"),
		),
	].sort((a, b) => a.localeCompare(b, "ko"));

	const slugMap = Object.fromEntries(artworks.map((a) => [a.id, a.slug]));

	return (
		<ArtworksClient
			artworks={displayArtworks}
			exhibitions={exhibitions}
			categories={categories}
			slugMap={slugMap}
		/>
	);
}
