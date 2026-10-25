import { serverApiClient } from "@/lib/api/server";
import type { ArtistProfileForm } from "../_types";

// 프로필 수정 화면 데이터 — 서버 컴포넌트(page.tsx)에서만 호출한다
// 가입 시 작가(artistId)와 공통 프로필(profileId)이 1:1 로 자동 생성된다

/************************
 * GET artist-profiles/me — 내 작가 공통 프로필
 ************************/

interface MyArtistProfileResponse {
	artistId: string;
	profileId: string;
	nameKo: string | null;
	nameEn: string | null;
	bio: string | null;
	email: string | null;
	purchaseContactUrl: string | null;
	profileImg: string | null;
}

/************************
 * GET artist-profiles/{profileId}/sns — SNS 목록 (공통 프로필 응답에는 없음)
 ************************/

interface ArtistSnsListResponse {
	snsList: { snsId: string; platformName: string; url: string }[];
}

export interface MyArtistProfile {
	artistId: string;
	profileId: string;
	form: ArtistProfileForm;
}

const splitEmail = (email: string | null) => {
	const [local = "", domain = ""] = (email ?? "").split("@");
	return { emailLocal: local, emailDomain: domain };
};

export async function getMyArtistProfile(): Promise<MyArtistProfile> {
	const profile = await serverApiClient<MyArtistProfileResponse>("/artist-profiles/me", {
		cache: "no-store",
	});
	const { snsList } = await serverApiClient<ArtistSnsListResponse>(
		`/artist-profiles/${profile.profileId}/sns`,
		{ cache: "no-store" },
	);

	return {
		artistId: profile.artistId,
		profileId: profile.profileId,
		form: {
			nameKo: profile.nameKo ?? "",
			nameEn: profile.nameEn ?? "",
			bio: profile.bio ?? "",
			profileImage: profile.profileImg,
			profileImageFile: null,
			...splitEmail(profile.email),
			sns: snsList.map(({ snsId, platformName, url }) => ({
				id: snsId,
				snsId,
				label: platformName,
				url,
			})),
			purchaseUrl: profile.purchaseContactUrl ?? "",
		},
	};
}
