import { isApiError } from "@/lib/api/instance";
import { serverApiClient } from "@/lib/api/server";
import type {
	ArtistAdminProfile,
	ArtworkStatus,
	MyArtwork,
	MyExhibition,
	MyTermsAgreement,
} from "../_types";

// 작가 어드민 홈(마이페이지) 데이터 — 서버 컴포넌트(page.tsx)에서만 호출한다

/************************
 * GET accounts/me — 로그인한 작가의 artistId
 ************************/

interface MyAccountResponse {
	accountId: string;
	email: string | null;
	role: string;
	accountStatus: string;
	exhibitionId: string | null;
	artistId: string | null;
}

export async function getMyAccount() {
	return serverApiClient<MyAccountResponse>("/accounts/me", { cache: "no-store" });
}

/************************
 * GET artists/{artistId} — 프로필 카드
 ************************/

interface ArtistResponse {
	artistId: string;
	nameKo: string | null;
	nameEn: string | null;
	bio: string | null;
	profileImg: string | null;
	email: string | null;
	snsList: { platformName: string; url: string }[] | null;
	likeCount: number;
	viewCount: number;
}

export async function getMyProfile(artistId: string): Promise<ArtistAdminProfile> {
	const data = await serverApiClient<ArtistResponse>(`/artists/${artistId}`, { cache: "no-store" });
	return {
		artistId: data.artistId,
		nameKo: data.nameKo,
		nameEn: data.nameEn,
		bio: data.bio,
		profileImage: data.profileImg,
		email: data.email,
		sns: (data.snsList ?? []).map(({ platformName, url }) => ({ label: platformName, url })),
		viewCount: data.viewCount,
		likeCount: data.likeCount,
	};
}

/************************
 * GET /artworks/me — 나의 작품
 ************************/

interface MyArtworkResponse {
	artworkId: string;
	title: string;
	mainImg: string | null;
	status: "DRAFT" | "PUBLISHED";
	hidden: boolean;
	exhibitionId: string | null;
	exhibitionName: string | null;
	viewCount: number;
	likeCount: number;
	completionRate: number | null;
	createdAt: string;
}

interface MyArtworksResponse {
	artworks: MyArtworkResponse[];
	totalElements: number;
	totalPages: number;
}

// BE 는 DRAFT/PUBLISHED 2단계 — 명세 가이드대로 DRAFT 중 작성률 100%(또는 미출품)는 비공개, 그 외는 작성 중
const toArtworkStatus = ({ status, completionRate }: MyArtworkResponse): ArtworkStatus => {
	if (status === "PUBLISHED") return "public";
	return completionRate === null || completionRate === 100 ? "private" : "draft";
};

// TODO: 작품이 100개를 넘으면 페이지를 나눠 불러와야 함 (size 최대 100)
export async function getMyArtworks(): Promise<MyArtwork[]> {
	const data = await serverApiClient<MyArtworksResponse>("/artworks/me?size=100", {
		cache: "no-store",
	});
	return data.artworks.map((artwork) => ({
		artworkId: artwork.artworkId,
		title: artwork.title,
		image: artwork.mainImg,
		exhibition:
			artwork.exhibitionId && artwork.exhibitionName
				? {
						exhibitionId: artwork.exhibitionId,
						name: artwork.exhibitionName,
						hidden: artwork.hidden,
					}
				: null,
		viewCount: artwork.viewCount,
		likeCount: artwork.likeCount,
		status: toArtworkStatus(artwork),
		completionRate: artwork.completionRate,
		createdAt: artwork.createdAt,
	}));
}

/************************
 * GET /exhibitions/me — 나의 전시 (참여중·수락 대기중)
 ************************/

interface MyExhibitionResponse {
	exhibitionId: string;
	exhibitionName: string;
	status: "PENDING" | "JOINED";
	joinedAt: string;
}

export async function getMyExhibitions(): Promise<MyExhibition[]> {
	const data = await serverApiClient<{ exhibitions: MyExhibitionResponse[] }>("/exhibitions/me", {
		cache: "no-store",
	});
	return data.exhibitions.map((exhibition) => ({
		exhibitionId: exhibition.exhibitionId,
		name: exhibition.exhibitionName,
		image: null,
		startDate: null,
		endDate: null,
		acceptedAt: exhibition.status === "JOINED" ? exhibition.joinedAt : null,
	}));
}

/************************
 * GET /accounts/me/terms — 계정 관리의 마케팅·홍보 동의
 ************************/

interface TermsAgreementResponse {
	agreedAt: string;
	terms: {
		termsVersion: string;
		age14OrOverConfirmed: boolean;
		serviceTermsAgreed: boolean;
		privacyAgreed: boolean;
		promotionAgreed: boolean | null;
		marketingAgreed: boolean | null;
	};
}

// 동의 내역이 없으면(404) null
export async function getMyTermsAgreement(): Promise<MyTermsAgreement | null> {
	try {
		const { terms } = await serverApiClient<TermsAgreementResponse>("/accounts/me/terms", {
			cache: "no-store",
		});
		return {
			termsVersion: terms.termsVersion,
			age14OrOverConfirmed: terms.age14OrOverConfirmed,
			serviceTermsAgreed: terms.serviceTermsAgreed,
			privacyAgreed: terms.privacyAgreed,
			promotionAgreed: terms.promotionAgreed ?? false,
			marketingAgreed: terms.marketingAgreed ?? false,
		};
	} catch (error) {
		if (isApiError(error, 404)) return null;
		throw error;
	}
}
