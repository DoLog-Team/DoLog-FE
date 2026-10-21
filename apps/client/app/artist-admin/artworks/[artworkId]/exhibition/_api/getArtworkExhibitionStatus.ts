import { authApiClient } from "@/lib/api/instance";

export interface ArtworkFieldSettings {
	required: {
		mainImg: boolean;
		size: boolean;
		materials: boolean;
		locationMap: boolean;
	};
	hidden: {
		size: boolean;
		materials: boolean;
		locationMap: boolean;
		productionPeriod: boolean;
		productionYear: boolean;
	};
}

export interface ArtworkExhibitionStatus {
	exhibitionId: string;
	exhibitionName: string;
	zoneId: string | null;
	zoneName: string | null;
	hidden: boolean;
	planLimitExceeded: boolean;
	fieldSettings: ArtworkFieldSettings;
}

export async function getArtworkExhibitionStatus(
	artworkId: string,
): Promise<ArtworkExhibitionStatus> {
	return authApiClient<ArtworkExhibitionStatus>(`/artworks/${artworkId}/exhibition`);
}
