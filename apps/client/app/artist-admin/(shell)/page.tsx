import { ProfileSection } from "./_components/ProfileSection";
import { MOCK_ARTIST_PROFILE } from "./_mocks/profile";

export default function ArtistPage() {
	return <ProfileSection profile={MOCK_ARTIST_PROFILE} />;
}
