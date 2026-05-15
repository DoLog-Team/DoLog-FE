import { CardGrid } from "@/components/common/Card/CardGrid";
import { Title } from "@/components/common/Title/Title";
import type { RelatedArtwork } from "@/lib/api/artwork";

interface RelatedSectionProps {
	artworks: RelatedArtwork[];
}

export const RelatedSection = ({ artworks }: RelatedSectionProps) => {
	// 직접 카테고리 filter 대신 백에서 내려주는 데이터로 받음
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
			<CardGrid items={items} getHref={(item) => `${item.id}`} limit={2} />
		</section>
	);
};
