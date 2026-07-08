import { useExhibition } from "@/app/[exhibitionId]/_context/ExhibitionContext";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkParticipant } from "@/lib/api/artwork";
import { ArtistCard } from "./ArtistCard";

interface ArtistSectionProps {
	authors: ArtworkParticipant[];
}

export function ArtistSection({ authors }: ArtistSectionProps) {
	const { slug } = useExhibition();

	return (
		<section className="flex flex-col pb-6 gap-4">
			<DesktopContainer>
				<Title title="참여자" />
				<div className="flex flex-col gap-10">
					{authors.map((author) => (
						<ArtistCard
							key={author.profileId}
							author={author}
							profileHref={`/${slug}/artist/${author.profileId}`}
						/>
					))}
				</div>
			</DesktopContainer>
		</section>
	);
}
