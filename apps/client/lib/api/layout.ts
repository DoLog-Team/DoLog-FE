import { apiClient } from "api";

/**
 * Footer 정보 조회
 */
export interface ExhibitionFooter {
	title: string;
	department: string;
	address: string;
	address_detail: string;
	email: string;
	copyright: string;
}

export async function getExhibitionFooter(exhibitionId: string): Promise<ExhibitionFooter | null> {
	try {
		return await apiClient<ExhibitionFooter>(`/exhibition/${exhibitionId}/footer-info`);
	} catch {
		return null;
	}
}
