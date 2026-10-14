import { redirect } from "next/navigation";
import { Divider } from "@/components/common/Divider/Divider";
import { isApiError } from "@/lib/api/instance";
import { withLoginRedirect } from "@/lib/utils/loginHref";
import {
	getMyAccount,
	getMyArtworks,
	getMyExhibitions,
	getMyProfile,
	getMyTermsAgreement,
} from "./_api/getMyPage";
import { AccountSection } from "./_components/sections/AccountSection";
import { MyArtworkSection } from "./_components/sections/MyArtworkSection";
import { MyExhibitionSection } from "./_components/sections/MyExhibitionSection";
import { ProfileSection } from "./_components/sections/ProfileSection";
import type { MyArtwork, MyExhibition } from "./_types";

const LOGIN_HREF = withLoginRedirect("/artist-admin/login", "/artist-admin");

export default async function ArtistPage() {
	// 쿠키는 있지만 refresh 까지 만료된 경우 — 다시 로그인
	const account = await getMyAccount().catch((error) => {
		if (isApiError(error, 401) || isApiError(error, 403)) redirect(LOGIN_HREF);
		throw error;
	});
	const { artistId } = account;

	// 소셜 로그인 시 BE 가 작가 정보를 자동 생성함
	// 작가 정보가 없으면 작품·전시 API 도 404(작가를 찾을 수 없음)라서 호출하지 않고 빈 화면으로 둔다
	const [[profile, artworks, exhibitions], termsAgreement] = await Promise.all([
		artistId
			? Promise.all([getMyProfile(artistId), getMyArtworks(), getMyExhibitions()])
			: ([null, [], []] satisfies [null, MyArtwork[], MyExhibition[]]),
		// 약관 동의는 작가 정보가 아니라 계정 기준이라 artistId 없이도 불러온다
		getMyTermsAgreement(),
	]);

	return (
		<>
			{profile && (
				<>
					<ProfileSection profile={profile} />
					<Divider spacing="md" thickness="thin" />
				</>
			)}
			<MyArtworkSection artworks={artworks} exhibitions={exhibitions} />
			<Divider spacing="md" thickness="thin" />
			<MyExhibitionSection exhibitions={exhibitions} />
			<Divider spacing="md" thickness="thin" />
			<AccountSection agreement={termsAgreement} />
		</>
	);
}
