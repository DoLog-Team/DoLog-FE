import { apiClient } from "@/lib/api/instance";
import type { ExhibitionFooter } from "./layout.types";

export type * from "./layout.types";

/*******************
 * Footer 정보 조회
 * GET exhibition/{id}/footer-info
 *******************/

export async function getExhibitionFooter(exhibitionId: string): Promise<ExhibitionFooter | null> {
	try {
		return await apiClient<ExhibitionFooter>(`/exhibitions/${exhibitionId}/footer-info`);
	} catch {
		return null;
	}
}
