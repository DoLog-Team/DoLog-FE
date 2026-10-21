import { authApiClient } from "@/lib/api/instance";

export interface ExhibitionZone {
	id: string;
	name: string;
}

interface ExhibitionZoneListResponse {
	zones: { id: string; name: string; description: string | null; orderId: number | null }[];
}

export async function getExhibitionZones(exhibitionId: string): Promise<ExhibitionZone[]> {
	const data = await authApiClient<ExhibitionZoneListResponse>(
		`/exhibitions/${exhibitionId}/zones`,
	);
	return data.zones.map((zone) => ({ id: zone.id, name: zone.name }));
}
