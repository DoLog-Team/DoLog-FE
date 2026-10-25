import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkParticipant } from "@/lib/api/artwork";
import { hasArtistProfileInfo } from "@/lib/utils/artistProfile";
import { ArtistCard } from "./ArtistCard";

// 프로필에 등록된 정보가 하나도 없는 작가는 작가 섹션에서 뺀다 — 모두 빠지면 섹션(과 탭)을 없앤다 (Figma 10.20 추가 사항)
export const getVisibleAuthors = (authors: ArtworkParticipant[]) =>
	authors.filter((author) =>
		hasArtistProfileInfo({
			nameKo: author.nameKo,
			nameEn: author.nameEn,
			bio: author.bio,
			profileImage: author.profileImg,
			email: author.email,
			snsCount: author.sns?.length,
		}),
	);

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
