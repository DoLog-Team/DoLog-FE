import { apiClient } from "api";

interface ExhibitionMeta {
	id: string;
	title: string;
	description: string | null;
	image: string | null;
}

export async function getExhibitionMeta(exhibitionId: string): Promise<ExhibitionMeta | null> {
	try {
		return await apiClient<ExhibitionMeta>(`/exhibitions/${exhibitionId}/meta`);
	} catch {
		return null;
	}
}
