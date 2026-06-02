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
				const nameA = (a.member_name ?? "").toLowerCase();
				const nameB = (b.member_name ?? "").toLowerCase();
				return nameA.localeCompare(nameB, "ko");
			}),
		}));

		return sortedParts;
	} catch {
		return [];
	}
}
