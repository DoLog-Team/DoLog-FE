import type { ArtworkFieldSettings } from "../[artworkId]/exhibition/_api/getArtworkExhibitionStatus";

export interface ArtworkCompletenessInput {
	category: string | undefined;
	productionEndYear: string | undefined;
	exhibitionId: string | null;
	zoneId: string | undefined | null;
	// 그 전시에 그룹이 하나도 없으면 그룹 미지정이어도 통과시킨다 (ArtworkFieldRequirement.isSatisfied와 동일 기준)
	hasZonesInExhibition: boolean;
	fieldSettings: ArtworkFieldSettings | null;
	mainImagePreview: string | null;
	width: string;
	height: string;
	materials: string[];
	locationMap: string | null;
}

// 백엔드 ArtworkFieldRequirement.isSatisfied() / ExhibitionFieldSettings.isSatisfiedBy()와 동일한 기준.
// 저장 버튼을 누른 "그 순간의 아직 저장 안 한 입력값"으로 판정해야 해서, 서버에 물어보는 대신 프론트에서 그대로 복제한다.
export const isArtworkSatisfied = ({
	category,
	productionEndYear,
	exhibitionId,
	zoneId,
	hasZonesInExhibition,
	fieldSettings,
	mainImagePreview,
	width,
	height,
	materials,
	locationMap,
}: ArtworkCompletenessInput): boolean => {
	if (!category || !productionEndYear) return false;
	if (!exhibitionId) return true;
	if (hasZonesInExhibition && !zoneId) return false;

	const required = fieldSettings?.required;
	if (!required) return true;
	if (required.mainImg && !mainImagePreview) return false;
	if (required.size && (!width || !height)) return false;
	if (required.materials && materials.length === 0) return false;
	if (required.locationMap && !locationMap) return false;
	return true;
};
