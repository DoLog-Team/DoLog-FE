import { Title } from "@/components/common/Title/Title";
import type { ArtworkParticipant } from "@/lib/api/artwork";
import { ArtistCard, type ArtistCardProps } from "./components/ArtistCard"; // ArtistCardProps import 추가

interface ArtistSectionProps {
	authors: ArtworkParticipant[];
	exhibitionId: string;
}

export function ArtistSection({ authors, exhibitionId }: ArtistSectionProps) {
	return (
		<section className="flex flex-col px-4 pb-6 gap-4">
			<Title title="참여자" />
			<div className="flex flex-col gap-10">
				{authors.map((author, index) => (
					<ArtistCard
						key={index}
						author={author}
						profileHref={`/${exhibitionId}/artist/${author.artistId}`}
					/>
				))}
			</div>
		</section>
	);
}
