"use client";

import { CardGrid } from "@/components/common/Card/CardGrid";
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
	if (!artist.artworks.length) return null;

	const items = artist.artworks.map((a) => ({
		id: a.artworkId,
		title: a.title,
		imageUrl: a.image,
		author: artist.nameKo,
	}));

	return (
		<section className="mb-6" data-section="artworks">
			<Title title="작품" size="head2" margin="compact" />
			<CardGrid
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
				className="min-[721px]:grid-cols-2"
			/>
		</section>
	);
}
