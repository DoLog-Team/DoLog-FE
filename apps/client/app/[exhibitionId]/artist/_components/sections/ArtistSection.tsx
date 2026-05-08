import { useMemo } from "react";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { Title } from "@/components/common/Title/Title";
import type { ArtistProfile } from "../../api/artist";

interface ArtistSectionProps {
	exhibitionId: string;
	artists: ArtistProfile[];
}

export function ArtistSection({ exhibitionId, artists = [] }: ArtistSectionProps) {
	const cardItems = useMemo(() => {
		const mapped = artists.map((artist) => ({
			id: artist.profileId,
			title: artist.nameKo || "이름",
			author: artist.nameEn || "Name",
			imageUrl: artist.profileImg,
			category: "",
		}));

		return mapped;
	}, [artists]);

	if (!artists.length) {
		return null;
	}

	return (
		<section className="flex flex-col pt-4 pb-6">
			<Title title="참여한 사람들" />
			<Title title="작가" size="head2" margin="compact" />

			<CardGrid items={cardItems} getHref={(item) => `/${exhibitionId}/artist/${item.id}`} />
		</section>
	);
}
