import { redirect } from "next/navigation";
import { isApiError } from "@/lib/api/instance";
import { serverApiClient } from "@/lib/api/server";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { AdminExhibition, AdminExhibitionCounts } from "../_types";

// 전시 어드민 홈 데이터 — 서버 컴포넌트(page.tsx)에서만 호출한다

/************************
 * GET exhibitions/{exhibitionId}/admin-home — 전시 요약, 참여 코드, 게시 기간, 작가 수
 * siteDescription 이 전시 상세의 주제 설명이다. 주소, 주최기관은 응답에 없다 (전시 상세 API 는 게시 전이면 403)
 ************************/

interface AdminHomeResponse {
	title: string | null;
	exhibitionType: "graduation" | "assignment" | null;
	univName: string | null;
	collegeName: string | null;
	deptName: string | null;
	startDate: string | null;
	endDate: string | null;
	// "HH:mm"
	openTime: string | null;
	closeTime: string | null;
	operationNotice: string | null;
	siteName: string | null;
	siteDescription: string | null;
	siteThumbnail: string | null;
	exhibitionUrl: string | null;
	artistJoinCode: string | null;
	// "yyyy-MM-dd HH:mm:ss"
	publishedAt: string | null;
	expiresAt: string | null;
	isPublished: boolean;
	joinedArtistCount: number;
	pendingArtistCount: number;
	planName: string | null;
}

const EXHIBITION_TYPE_LABEL = {
	graduation: "졸업전시",
	assignment: "과제전",
} as const;

const joinText = (...values: (string | null)[]) => values.filter(Boolean).join(" ") || null;

// 401 은 세션 만료라 로그인 화면으로, 그 외 실패는 던져서 error.tsx 가 보여준다
async function getAdminHomeResponse(exhibitionId: string) {
	try {
		return await serverApiClient<AdminHomeResponse>(`/exhibitions/${exhibitionId}/admin-home`, {
			cache: "no-store",
		});
	} catch (error) {
		if (isApiError(error, 401)) redirect(ADMIN_LOGIN_HREF);
		throw error;
	}
}

export async function getAdminHome(exhibitionId: string) {
	const home = await getAdminHomeResponse(exhibitionId);

	const exhibition: AdminExhibition = {
		title: home.title,
		type: home.exhibitionType ? EXHIBITION_TYPE_LABEL[home.exhibitionType] : null,
		university: joinText(home.univName, home.collegeName),
		department: home.deptName,
		startDate: home.startDate,
		endDate: home.endDate,
		operatingHours: home.openTime && home.closeTime ? `${home.openTime} - ${home.closeTime}` : null,
		note: home.operationNotice,
		description: home.siteDescription,
		siteName: home.siteName,
		siteDescription: home.siteDescription,
		imageUrl: home.siteThumbnail,
		siteUrl: home.exhibitionUrl,
		entryCode: home.artistJoinCode,
		publishedAt: home.publishedAt?.slice(0, 10) ?? null,
		expiresAt: home.expiresAt?.slice(0, 10) ?? null,
	};

	return { exhibition, counts: await getCounts(exhibitionId, home) };
}

/************************
 * GET exhibitions/{exhibitionId}/artworks/manage — 작품 수만 필요해서 1개씩 조회해 전체 수를 쓴다
 * 전시중인 작품 = 공개이고 숨기지 않은 작품 (컴포넌트 명세 `전시_공개_작품_수`, 플랜 한도 초과도 포함)
 * admin-home 의 작품 수는 아직 0 고정이라 작품 관리 목록 API 로 센다
 * 조회에 실패하면 null → 카드 개수 자리에 "-"
 ************************/

interface ArtworkCountResponse {
	totalCount: number;
	planLimitExceededCount: number;
}

async function getCounts(
	exhibitionId: string,
	home: AdminHomeResponse,
): Promise<AdminExhibitionCounts | null> {
	const countArtworks = (query: string) =>
		serverApiClient<ArtworkCountResponse>(
			`/exhibitions/${exhibitionId}/artworks/manage?${query}&size=1`,
			{ cache: "no-store" },
		);

	try {
		const [shown, hidden] = await Promise.all([
			countArtworks("hidden=false&visibility=PUBLIC"),
			countArtworks("hidden=true"),
		]);
		return {
			artists: home.joinedArtistCount,
			pendingArtists: home.pendingArtistCount,
			exhibitedArtworks: shown.totalCount,
			exceededArtworks: shown.planLimitExceededCount,
			hiddenArtworks: hidden.totalCount,
		};
	} catch {
		return null;
	}
}
