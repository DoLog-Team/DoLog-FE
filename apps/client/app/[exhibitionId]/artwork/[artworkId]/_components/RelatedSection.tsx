"use client";

import { CardGrid } from "@/components/common/Card/CardGrid";
import { Title } from "@/components/common/Title/Title";
import { track } from "@/lib/amplitude";
import type { RelatedArtwork } from "@/lib/api/artwork";

interface RelatedSectionProps {
	artworks: RelatedArtwork[];
	artworkTitle?: string;
}

export const RelatedSection = ({ artworks, artworkTitle }: RelatedSectionProps) => {
	const items = artworks.map((a) => ({
		id: a.id,
		title: a.title,
		category: a.category,
		author: a.artistName,
		imageUrl: a.mainImage,
	}));

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="동일한 카테고리 작품" margin="compact" />
			<CardGrid
				items={items}
				getHref={(item) => `${item.id}`}
				limit={2}
				onItemClick={(item) =>
					track("Related Artwork Clicked", {
						clicked_artwork_id: item.id,
						clicked_artwork_title: item.title,
						from_artwork: artworkTitle,
						page: "artwork_detail",
					})
				}
			/>
		</section>
	);
};
