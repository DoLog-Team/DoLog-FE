import { getMyArtistProfile } from "./_api/getMyArtistProfile";
import { ProfileEditForm } from "./_components/ProfileEditForm";

// 내 작가 공통 프로필(GET artist-profiles/me)과 SNS 목록으로 입력값을 채운다
export default async function ProfileEditPage() {
	const { profileId, form } = await getMyArtistProfile();

	return <ProfileEditForm profileId={profileId} initialValue={form} />;
}
