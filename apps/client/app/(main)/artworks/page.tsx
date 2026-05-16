import { getArtworks } from "@/lib/api/artwork";
import { getExhibitions } from "@/lib/api/exhibition";
import { CATEGORIES, MOCK_ARTWORKS } from "../_mocks/artwork";
import ArtworksClient from "./_components/ArtworksClient";

export default async function ArtworksPage() {
	const [artworks, exhibitions] = await Promise.all([getArtworks(), getExhibitions()]);

	const exhibitionMap = Object.fromEntries(
		exhibitions.map((e) => [
			e.id,
			{ univName: e.univName, deptName: e.deptName, exhibitionType: e.exhibitionType },
		]),
	);

	const displayArtworks =
		artworks.length > 0
			? artworks.map((a) => ({
					id: a.id,
					title: a.title,
					imageUrl: a.imageUrl,
					author: a.artistName,
					category: exhibitionMap[a.exhibitionId]?.deptName ?? a.category,
					exhibitionTitle: a.exhibitionTitle,
					univName: exhibitionMap[a.exhibitionId]?.univName,
					deptName: exhibitionMap[a.exhibitionId]?.deptName,
					exhibitionType: exhibitionMap[a.exhibitionId]?.exhibitionType ?? undefined,
				}))
			: [
					...new Map(
						CATEGORIES.filter((c) => c !== "전체")
							.flatMap((c) => MOCK_ARTWORKS[c])
							.map((item) => [item.id, item]),
					).values(),
				];

	const slugMap = Object.fromEntries(artworks.map((a) => [a.id, a.slug]));

	return <ArtworksClient artworks={displayArtworks} slugMap={slugMap} />;
}
