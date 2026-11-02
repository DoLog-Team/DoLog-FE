import { redirect } from "next/navigation";
import { isApiError } from "@/lib/api/instance";
import { serverApiClient } from "@/lib/api/server";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { AdminArtist } from "../_types";

/************************
 * 참여 대기 / 참여 작가 목록
 * GET exhibitions/{exhibitionId}/artists/manage
 ************************/

export type ManagedArtistStatus = "PENDING" | "JOINED";

interface ManagedArtistResponse {
	artists: {
		artistId: string;
		nameKo: string | null;
		email: string | null;
		greeting: string | null;
		artworkCount: number | null;
	}[];
	totalCount: number;
	totalPages: number;
}

// 모바일은 페이지 없이 전체 목록, 전체 선택도 검색 결과 전체라서 끝까지 받아 화면에서 나눈다
const PAGE_SIZE = 100;

export async function getAdminArtists(
	exhibitionId: string,
	status: ManagedArtistStatus,
): Promise<AdminArtist[]> {
	const artists: AdminArtist[] = [];
	for (let page = 0; ; page++) {
		const data = await getPage(exhibitionId, status, page);
		artists.push(
			...data.artists.map((artist) => ({
				id: artist.artistId,
				name: artist.nameKo,
				email: artist.email,
				greeting: artist.greeting,
				artworkCount: artist.artworkCount ?? 0,
			})),
		);
		if (page + 1 >= data.totalPages) return artists;
	}
}

async function getPage(exhibitionId: string, status: ManagedArtistStatus, page: number) {
	try {
		return await serverApiClient<ManagedArtistResponse>(
			`/exhibitions/${exhibitionId}/artists/manage?status=${status}&page=${page}&size=${PAGE_SIZE}`,
			{ cache: "no-store" },
		);
	} catch (error) {
		if (isApiError(error, 401)) redirect(ADMIN_LOGIN_HREF);
		throw error;
	}
}
