// api/partner.ts

import { apiClient } from "api";

export interface PartnerMember {
	member_id: string;
	member_name: string;
	member_name_en?: string;
	member_email?: string;
	member_image_url?: string;
}

export interface PartnerPart {
	order: number;
	part_id: string;
	part_name: string;
	members: PartnerMember[];
}

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
	} catch (_error) {
		return [];
	}
}
