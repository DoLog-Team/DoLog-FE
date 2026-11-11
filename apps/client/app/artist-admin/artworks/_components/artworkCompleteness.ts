import type { ArtworkFieldSettings } from "../[artworkId]/exhibition/_api/getArtworkExhibitionStatus";

export interface ArtworkCompletenessInput {
	category: string | undefined;
	productionEndYear: string | undefined;
	exhibitionId: string | null;
	zoneId: string | undefined | null;
	hasZonesInExhibition: boolean;
	fieldSettings: ArtworkFieldSettings | null;
	mainImagePreview: string | null;
	width: string;
	height: string;
	materials: string[];
	locationMap: string | null;
}

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

export interface CompletionRateInput extends ArtworkCompletenessInput {
	sizeType?: "DIMENSIONS" | "ROUND" | "VARIABLE" | null;
}

const isSizeSatisfied = (
	sizeType: CompletionRateInput["sizeType"],
	width: string,
	height: string,
) => {
	if (sizeType === "VARIABLE") return true;
	if (sizeType === "ROUND") return !!width;
	return !!width && !!height;
};

export const calculateCompletionRate = ({
	category,
	productionEndYear,
	exhibitionId,
	zoneId,
	hasZonesInExhibition,
	fieldSettings,
	mainImagePreview,
	width,
	height,
	sizeType,
	materials,
	locationMap,
}: CompletionRateInput): number => {
	let total = 2; // category, productionEndYear는 항상 분모에 포함
	let satisfied = (category ? 1 : 0) + (productionEndYear ? 1 : 0);

	if (!exhibitionId) return Math.round((satisfied / total) * 100);

	const required = fieldSettings?.required;

	if (hasZonesInExhibition) {
		total += 1;
		if (zoneId) satisfied += 1;
	}
	if (required?.mainImg) {
		total += 1;
		if (mainImagePreview) satisfied += 1;
	}
	if (required?.size) {
		total += 1;
		if (isSizeSatisfied(sizeType, width, height)) satisfied += 1;
	}
	if (required?.materials) {
		total += 1;
		if (materials.length > 0) satisfied += 1;
	}
	if (required?.locationMap) {
		total += 1;
		if (locationMap) satisfied += 1;
	}

	return Math.round((satisfied / total) * 100);
};
