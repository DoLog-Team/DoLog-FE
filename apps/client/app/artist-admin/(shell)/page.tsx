import { Divider } from "@/components/common/Divider/Divider";
import { MyArtworkSection } from "./_components/sections/MyArtworkSection";
import { ProfileSection } from "./_components/sections/ProfileSection";
import { MOCK_MY_ARTWORKS } from "./_mocks/artworks";
import { MOCK_ARTIST_PROFILE } from "./_mocks/profile";

export default function ArtistPage() {
	return (
		<>
			<ProfileSection profile={MOCK_ARTIST_PROFILE} />
			<Divider spacing="md" thickness="thin" />
			<MyArtworkSection artworks={MOCK_MY_ARTWORKS} />
		</>
	);
}
