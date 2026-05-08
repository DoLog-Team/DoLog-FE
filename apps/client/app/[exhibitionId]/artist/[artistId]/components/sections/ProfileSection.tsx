import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import type { ArtistDetail } from "../../api/artist-detail";

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
