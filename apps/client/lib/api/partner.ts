import { apiClient } from "api";
import type { PartnerPart } from "./partner.types";

export type * from "./partner.types";

interface GetPartnersResponse {
	parts: PartnerPart[];
}

export async function getPartners(exhibitionId: string): Promise<PartnerPart[]> {
	try {
		const response = await apiClient<GetPartnersResponse>(`/exhibitions/${exhibitionId}/partners`);

		const sortedParts = (response?.parts ?? []).map((part) => ({
			...part,
			members: [...part.members].sort((a, b) => {
				const orderA = a.member_order ?? Number.MAX_SAFE_INTEGER;
				const orderB = b.member_order ?? Number.MAX_SAFE_INTEGER;
				return orderA - orderB;
			}),
		}));

		return sortedParts;
	} catch {
		return [];
	}
}
