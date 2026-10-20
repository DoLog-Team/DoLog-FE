import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkParticipant } from "@/lib/api/artwork";
import { ArtistCard } from "./ArtistCard";

interface ArtistSectionProps {
	authors: ArtworkParticipant[];
	// 전시 작품 상세: /{slug}/artist/{profileId}, 두록 작품 상세: /artists/{artistId}
	getProfileHref: (author: ArtworkParticipant) => string;
	title?: string;
}

export function ArtistSection({ authors, getProfileHref, title = "참여자" }: ArtistSectionProps) {
	return (
		<section className="flex flex-col pb-6 gap-4">
			<DesktopContainer>
				<Title title={title} />
				<div className="flex flex-col gap-10">
					{authors.map((author) => (
						<ArtistCard
							key={author.profileId}
							author={author}
							profileHref={getProfileHref(author)}
						/>
					))}
				</div>
			</DesktopContainer>
		</section>
	);
}
