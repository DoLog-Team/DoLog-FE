import { redirect } from "next/navigation";
import { isApiError } from "@/lib/api/instance";
import { serverApiClient } from "@/lib/api/server";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { AdminExhibition, AdminExhibitionCounts } from "../_types";

/************************
 * 전시 어드민 홈
 * GET exhibitions/{exhibitionId}/admin-home
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
	// 전시 상세의 주제 설명
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
	// 전시중 = 공개이고 숨기지 않은 작품 (플랜 한도 초과 포함)
	publishedArtworkCount: number;
	hiddenArtworkCount: number;
	planName: string | null;
	// title, exhibitionType, startDate, endDate, description, address, hostName, hostDescription 중 비어 있는 것
	missingPublishFields?: string[];
}

const EXHIBITION_TYPE_LABEL = {
	graduation: "졸업전시",
	assignment: "과제전",
} as const;

const joinText = (...values: (string | null)[]) => values.filter(Boolean).join(" ") || null;

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
		missingPublishFields: home.missingPublishFields ?? guessMissingPublishFields(home),
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

// missingPublishFields 를 주지 않는 서버(찬주 #429 배포 전)용 — 응답에 있는 값만 본다
const guessMissingPublishFields = (home: AdminHomeResponse) =>
	(
		[
			["title", home.title],
			["exhibitionType", home.exhibitionType],
			["startDate", home.startDate],
			["endDate", home.endDate],
			["description", home.siteDescription],
		] as const
	)
		.filter(([, value]) => !value)
		.map(([field]) => field);

/************************
 * 플랜 한도 초과 작품 수 — admin-home 에 없어서 작품 관리 목록에서 받는다
 * GET exhibitions/{exhibitionId}/artworks/manage
 ************************/

interface ArtworkCountResponse {
	planLimitExceededCount: number;
}

async function getCounts(
	exhibitionId: string,
	home: AdminHomeResponse,
): Promise<AdminExhibitionCounts> {
	return {
		artists: home.joinedArtistCount,
		pendingArtists: home.pendingArtistCount,
		exhibitedArtworks: home.publishedArtworkCount,
		exceededArtworks: await getExceededCount(exhibitionId),
		hiddenArtworks: home.hiddenArtworkCount,
	};
}

// 실패하면 0 — 카드의 "플랜 한도 초과" 배지만 안 보인다
async function getExceededCount(exhibitionId: string) {
	try {
		const { planLimitExceededCount } = await serverApiClient<ArtworkCountResponse>(
			`/exhibitions/${exhibitionId}/artworks/manage?hidden=false&size=1`,
			{ cache: "no-store" },
		);
		return planLimitExceededCount;
	} catch {
		return 0;
	}
}
