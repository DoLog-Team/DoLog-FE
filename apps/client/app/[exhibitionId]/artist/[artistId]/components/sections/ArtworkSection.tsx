import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { Title } from "@/components/common/Title/Title";
import type { ArtistDetail } from "../../api/artist-detail";

export function ArtworkSection({
	artist,
	exhibitionId,
}: {
	artist: ArtistDetail;
	exhibitionId: string;
}) {
	return (
		<section className="mb-6">
			<Title title="작품" size="head2" margin="compact" />

			<ListCardGrid
				items={artist.artworks.map((a) => ({
					id: a.artworkId,
					title: a.title,
					imageUrl: a.image,
					author: artist.nameKo,
					href: `/${exhibitionId}/artwork/${a.artworkId}`,
				}))}
			/>
		</section>
	);
}
