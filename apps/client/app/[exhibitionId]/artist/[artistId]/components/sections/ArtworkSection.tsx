"use client";

import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { Title } from "@/components/common/Title/Title";
import { track } from "@/lib/amplitude";
import type { ArtistDetail } from "@/lib/api/artists/artist-detail.types";

export function ArtworkSection({
	artist,
	exhibitionId,
}: {
	artist: ArtistDetail;
	exhibitionId: string;
}) {
	const items = artist.artworks.map((a) => ({
		id: a.artworkId,
		title: a.title,
		imageUrl: a.image,
		author: artist.nameKo,
	}));

	return (
		<section className="mb-6" data-section="artworks">
			<Title title="작품" size="head2" margin="compact" />
			<ListCardGrid
				items={items}
				getHref={(item) => `/${exhibitionId}/artwork/${item.id}`}
				onItemClick={(item) =>
					track("Artist Artwork Clicked", {
						artwork_id: item.id,
						artwork_title: item.title,
						artist_name: artist.nameKo,
						page: "artist_detail",
					})
				}
			/>
		</section>
	);
}
