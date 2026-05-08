import { apiClient } from "api";

/*******************
 * Footer 정보 조회
 * GET exhibition/{id}/footer-info
 *******************/

export interface ExhibitionFooter {
  title: string;
  department: string;
  address: string | null;
  address_detail: string | null;
  email: string;
  copyright: string | null;
}

export async function getExhibitionFooter(exhibitionId: string): Promise<ExhibitionFooter | null> {
	try {
		return await apiClient<ExhibitionFooter>(`/exhibitions/${exhibitionId}/footer-info`);
	} catch {
		return null;
	}
}
