import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import type { ArtistDetail } from "@/lib/api/artists/artist-detail.types";

export function ProfileSection({ artist }: { artist: ArtistDetail }) {
	return (
		<section>
			<ProfileCard
				imageUrl={artist.profileImage}
				name={artist.nameKo}
				engName={artist.nameEn}
				bio={artist.bio}
			/>
		</section>
	);
}
