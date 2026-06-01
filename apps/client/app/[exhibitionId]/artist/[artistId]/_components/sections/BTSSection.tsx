import { BTSCardGrid } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { Title } from "@/components/common/Title/Title";
import type { ArtistDetail } from "@/lib/api/artists/artist-detail.types";

export function BTSSection({
	exhibitionId,
	artist,
}: {
	exhibitionId: string;
	artist: ArtistDetail;
}) {
	if (!artist.behindTheScenes.length) return null;

	return (
		<section className="mb-8">
			<Title title="Behind The Scene" size="head2" margin="compact" />

			<BTSCardGrid
				items={artist.behindTheScenes.map((bts) => ({
					id: bts.btsId,
					title: bts.title,
					imageUrl: bts.mainImg,
					author: artist.nameKo,
				}))}
				getHref={(item) => `/${exhibitionId}/bts/${item.id}`}
			/>
		</section>
	);
}
