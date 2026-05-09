import { Title } from "@/components/common/Title/Title";
import type { ArtworkParticipant } from "@/lib/api/artwork";
import { ArtistCard } from "./components/ArtistCard";

interface ArtistSectionProps {
	authors: ArtworkParticipant[];
	slug: string;
}

export function ArtistSection({ authors, slug }: ArtistSectionProps) {
	return (
		<section className="flex flex-col px-4 pb-6 gap-4">
			<Title title="참여자" />
			<div className="flex flex-col gap-10">
				{authors.map((author, index) => (
					<ArtistCard
						key={index}
						author={author}
						profileHref={`/${slug}/artist/${author.artistId}`}
					/>
				))}
			</div>
		</section>
	);
}
