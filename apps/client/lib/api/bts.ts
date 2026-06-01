import { apiClient } from "api";
import type { BtsDetail, BtsListResponse } from "./bts.types";

export type * from "./bts.types";

/*******************
 * BTS 목록 조회
 * GET exhibitions/{id}/bts
 *******************/
export async function getBtsList(exhibitionId: string): Promise<BtsListResponse | null> {
	try {
		return await apiClient<BtsListResponse>(`/exhibitions/${exhibitionId}/bts`);
	} catch {
		return null;
	}
}

/*******************
 * BTS 상세 조회
 * GET exhibitions/{id}/bts/{btsId}
 *******************/
export async function getBtsDetail(exhibitionId: string, btsId: string): Promise<BtsDetail | null> {
	try {
		return await apiClient<BtsDetail>(`/exhibitions/${exhibitionId}/bts/${btsId}`);
	} catch {
		return null;
	}
}
