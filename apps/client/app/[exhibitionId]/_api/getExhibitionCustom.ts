import { apiClient } from "api";

export interface ExhibitionCustom {
	exhibition_id: string;
	splash_img: string | null;
	theme_mode: "light" | "dark";
	btn_bg: string | null;
	btn_text: string | null;
	cta_bg: string | null;
	cta_text: string | null;
	logo_img: string | null;
}

export async function getExhibitionCustom(exhibitionId: string): Promise<ExhibitionCustom | null> {
	try {
		return await apiClient<ExhibitionCustom>(`/exhibitions/${exhibitionId}/custom`);
	} catch {
		return null;
	}
}
