import { cache } from "react";
import { resolveExhibitionSlug } from "@/lib/api/exhibition";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const resolveExhibitionId = cache(async (exhibitionId: string): Promise<string | null> => {
	if (UUID_REGEX.test(exhibitionId)) return exhibitionId;
	const result = await resolveExhibitionSlug(exhibitionId);
	return result?.uuid ?? null;
});
