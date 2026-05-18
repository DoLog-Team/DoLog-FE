"use client";

import type { CardItem } from "@/components/common/Card/Card.types";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { EmptyArtistIcon } from "@/components/common/icons/EmptyArtistIcon";
import { Title } from "@/components/common/Title/Title";
import type { ArtistProfile } from "@/lib/api/artists/artist";

interface ArtistSectionProps {
	exhibitionId: string;
	artists: ArtistProfile[];
	onArtistClick?: (artist: ArtistProfile) => void;
}

export function ArtistSection({ exhibitionId, artists = [], onArtistClick }: ArtistSectionProps) {
	if (!artists.length) return null;

	const cardItems: CardItem[] = artists.map((artist) => ({
		id: artist.profileId,
		title: artist.nameKo || "",
		author: artist.nameEn || "",
		imageUrl: artist.profileImg,
		category: "",
		emptyIcon: <EmptyArtistIcon />,
	}));

	return (
		<section className="flex flex-col pt-4 pb-6">
			<Title title="참여한 사람들" />
			<Title title="작가" size="head2" margin="compact" />
			<CardGrid
				items={cardItems}
				getHref={(item) => `/${exhibitionId}/artist/${item.id}`}
				onItemClick={
					onArtistClick
						? (item) => {
								const artist = artists.find((a) => a.profileId === item.id);
								if (artist) onArtistClick(artist);
							}
						: undefined
				}
			/>
		</section>
	);
}
