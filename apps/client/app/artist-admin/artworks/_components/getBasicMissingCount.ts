import type { MyArtworkDetail } from "../_api/getMyArtwork";

type BasicFields = Pick<
	MyArtworkDetail,
	| "category"
	| "productionStartYear"
	| "productionStartMonth"
	| "productionStartDay"
	| "productionEndYear"
	| "productionEndMonth"
	| "productionEndDay"
>;

// ArtworkBasicInfoSection의 미작성 개수 계산 기준과 동일 (카테고리 + 제작 기간)
export const getBasicMissingCount = (artwork: BasicFields) => {
	const hasStartDate = artwork.productionStartYear != null;
	const isStartDateComplete =
		!hasStartDate ||
		Boolean(
			artwork.productionStartYear && artwork.productionStartMonth && artwork.productionStartDay,
		);
	const isEndDateComplete = Boolean(
		artwork.productionEndYear && artwork.productionEndMonth && artwork.productionEndDay,
	);
	const isPeriodComplete = isStartDateComplete && isEndDateComplete;

	return (artwork.category ? 0 : 1) + (isPeriodComplete ? 0 : 1);
};
