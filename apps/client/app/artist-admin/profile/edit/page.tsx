import { getMyAccount, getMyProfile } from "../../(shell)/_api/getMyPage";
import { ProfileEditForm } from "./_components/ProfileEditForm";
import type { ArtistProfileForm } from "./_types";

const EMPTY_FORM: ArtistProfileForm = {
	nameKo: "",
	nameEn: "",
	bio: "",
	profileImage: null,
	email: "",
	sns: [],
	purchaseUrl: "",
};

// 작가 기본 정보(GET artists/{artistId}) 로 입력값을 채운다
// 소개·사진·이메일·SNS 는 최신 전시 프로필 값을 조합한 것 — 저장 대상(전시별 프로필)은 BE 확인 중 (TODO : profileId 관련 BE 문의 중)
export default async function ProfileEditPage() {
	const { artistId } = await getMyAccount();
	const profile = artistId ? await getMyProfile(artistId) : null;

	const initialValue: ArtistProfileForm = profile
		? {
				nameKo: profile.nameKo ?? "",
				nameEn: profile.nameEn ?? "",
				bio: profile.bio ?? "",
				profileImage: profile.profileImage,
				email: profile.email ?? "",
				sns: profile.sns,
				// TODO: 구매 문의 링크는 작가 조회 응답에 없음 (전시별 프로필 purchaseContactUrl)
				purchaseUrl: "",
			}
		: EMPTY_FORM;

	return <ProfileEditForm artistId={artistId} initialValue={initialValue} />;
}
