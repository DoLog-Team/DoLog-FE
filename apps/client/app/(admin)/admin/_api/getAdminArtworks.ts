import { redirect } from "next/navigation";
import { isApiError } from "@/lib/api/instance";
import { serverApiClient } from "@/lib/api/server";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { AdminArtwork, AdminArtworkGroup, ArtworkVisibilityLabel } from "../_types";

/************************
 * 전체 / 숨긴 작품 목록
 * GET exhibitions/{exhibitionId}/artworks/manage
 * GET exhibitions/{exhibitionId}/zones
 ************************/

interface ArtworkManageResponse {
	artworks: {
		artworkId: string;
		title: string;
		mainImg: string | null;
		artistNames: string[];
		zoneId: string | null;
		zoneName: string | null;
		visibility: "PUBLIC" | "PRIVATE" | "DRAFT";
		hidden: boolean;
		planLimitExceeded: boolean;
		completionRate: number;
	}[];
	totalCount: number;
	totalPages: number;
	planLimitExceededCount: number;
}

interface ZoneListResponse {
	zones: { id: string; name: string }[];
}

const VISIBILITY_LABEL: Record<
	ArtworkManageResponse["artworks"][number]["visibility"],
	ArtworkVisibilityLabel
> = {
	PUBLIC: "공개",
	PRIVATE: "비공개",
	DRAFT: "임시저장",
};

// 작가 목록과 같이 모바일 전체 목록 명세 때문에 끝까지 받아 화면에서 나눈다
const PAGE_SIZE = 100;

export async function getAdminArtworks(exhibitionId: string, hidden: boolean) {
	try {
		const [pages, { zones }] = await Promise.all([
			getAllPages(exhibitionId, hidden),
			serverApiClient<ZoneListResponse>(`/exhibitions/${exhibitionId}/zones`, {
				cache: "no-store",
			}),
		]);

		const artworks: AdminArtwork[] = pages
			.flatMap((page) => page.artworks)
			.map((artwork) => ({
				id: artwork.artworkId,
				title: artwork.title,
				artistName: artwork.artistNames.join(", "),
				groupId: artwork.zoneId,
				group: artwork.zoneName,
				visibility: VISIBILITY_LABEL[artwork.visibility],
				isExposed: !artwork.planLimitExceeded,
				progress: artwork.completionRate,
				imageUrl: artwork.mainImg,
			}));
		const groups: AdminArtworkGroup[] = zones.map(({ id, name }) => ({ id, name }));

		return { artworks, groups, exceededCount: pages[0].planLimitExceededCount };
	} catch (error) {
		if (isApiError(error, 401)) redirect(ADMIN_LOGIN_HREF);
		throw error;
	}
}

async function getAllPages(exhibitionId: string, hidden: boolean) {
	const pages: ArtworkManageResponse[] = [];
	for (let page = 0; ; page++) {
		const data = await serverApiClient<ArtworkManageResponse>(
			`/exhibitions/${exhibitionId}/artworks/manage?hidden=${hidden}&page=${page}&size=${PAGE_SIZE}`,
			{ cache: "no-store" },
		);
		pages.push(data);
		if (page + 1 >= data.totalPages) return pages;
	}
}
