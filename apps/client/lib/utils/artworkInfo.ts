import type { ArtworkDetail } from "@/lib/api/artwork";

type ArtworkInfoFields = Pick<
	ArtworkDetail,
	| "productionStartYear"
	| "productionEndYear"
	| "materials"
	| "width"
	| "height"
	| "depth"
	| "sizeType"
	| "durationSeconds"
>;

// 특정 전시에서만 작가 역할 영역 숨김 처리 [동국대 서양화과]
const HIDE_ARTIST_ROLE_EXHIBITION_IDS = new Set(["5918413e-3bb4-4237-ae4d-c55d8f025f34"]);

export const shouldHideArtistRole = (exhibitionId: string | null | undefined) =>
	!!exhibitionId && HIDE_ARTIST_ROLE_EXHIBITION_IDS.has(exhibitionId);

function formatYear({ productionStartYear: start, productionEndYear: end }: ArtworkInfoFields) {
	if (start && end && start !== end) return `${start} – ${end}`;
	return start ?? end ?? null;
}

// v1→v2 마이그레이션으로 숫자만으로 표현 안 되는 작품(가변크기, 원형)이 생겨서 sizeType으로 분기
function formatSize({ width, height, depth, sizeType, durationSeconds }: ArtworkInfoFields) {
	const sizeText = formatSizeBySizeType({ width, height, depth, sizeType });
	const durationText = durationSeconds ? formatDuration(durationSeconds) : null;
	return [sizeText, durationText].filter(Boolean).join(" | ") || null;
}

function formatSizeBySizeType({
	width,
	height,
	depth,
	sizeType,
}: Pick<ArtworkInfoFields, "width" | "height" | "depth" | "sizeType">) {
	if (sizeType === "VARIABLE") return "가변크기";

	// ROUND: width=지름, height는 항상 null이라 안 보고, depth는 "높이"(선택)
	if (sizeType === "ROUND") {
		return joinSizeParts([
			["지름", width],
			["높이", depth],
		]);
	}

	// DIMENSIONS, 혹은 sizeType이 없던 기존 응답 — 가로 · 세로 · 높이 (작가 어드민 입력 폼과 같음)
	if (sizeType == null || sizeType === "DIMENSIONS") {
		return joinSizeParts([
			["가로", width],
			["세로", height],
			// 작가 어드민 입력 폼에서 depth 는 "높이 (부피가 있는 경우)"
			["높이", depth],
		]);
	}

	return null;
}

// 0 은 입력하지 않은 값으로 봄
function joinSizeParts(entries: [string, number | null | undefined][]) {
	const parts = entries
		.filter(([, value]) => !!value)
		.map(([label, value]) => `${label} ${value}cm`);
	return parts.length ? parts.join(" × ") : null;
}

function formatDuration(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}분 ${seconds}초`;
}

// 작품 제목 아래 정보 줄: 제작 연도 / 재료 · 크기 (두록·전시 작품 상세 공통)
export function getArtworkInfoLines(data: ArtworkInfoFields): string[] {
	const year = formatYear(data);
	const materialAndSize = [data.materials?.join(", "), formatSize(data)]
		.filter(Boolean)
		.join(" / ");
	return [year ? String(year) : null, materialAndSize || null].filter(
		(line): line is string => !!line,
	);
}
