import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import type { ArtistDetail } from "@/lib/api/artists/artist-detail.types";

interface ProfileSectionProps {
	artist: ArtistDetail;
	bottomSlot?: React.ReactNode;
}

export function ProfileSection({ artist, bottomSlot }: ProfileSectionProps) {
	return (
		<section>
			<ProfileCard
				imageUrl={artist.profileImage}
				name={artist.nameKo}
				engName={artist.nameEn}
				bio={artist.bio}
				bottomSlot={bottomSlot}
			/>
		</section>
	);
}
