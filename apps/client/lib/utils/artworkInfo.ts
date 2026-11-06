import type { ArtworkDetail } from "@/lib/api/artwork";

type ArtworkInfoFields = Pick<
	ArtworkDetail,
	"productionStartYear" | "productionEndYear" | "materials" | "width" | "height" | "depth"
>;

// 특정 전시에서만 작가 역할 영역 숨김 처리 [동국대 서양화과]
const HIDE_ARTIST_ROLE_EXHIBITION_IDS = new Set(["5918413e-3bb4-4237-ae4d-c55d8f025f34"]);

export const shouldHideArtistRole = (exhibitionId: string | null | undefined) =>
	!!exhibitionId && HIDE_ARTIST_ROLE_EXHIBITION_IDS.has(exhibitionId);

function formatYear({ productionStartYear: start, productionEndYear: end }: ArtworkInfoFields) {
	if (start && end && start !== end) return `${start} – ${end}`;
	return start ?? end ?? null;
}

// 크기 라벨은 모든 작품 공통 가로 · 세로 · 높이 (작가 어드민 입력 폼과 같음, v2 BE 변경 사항을 반영한 것)
function formatSize({ width, height, depth }: ArtworkInfoFields) {
	// 0 은 입력하지 않은 값으로 본다
	const parts = [
		["가로", width],
		["세로", height],
		// 작가 어드민 입력 폼에서 depth 는 "높이 (부피가 있는 경우)"
		["높이", depth],
	]
		.filter(([, value]) => !!value)
		.map(([label, value]) => `${label} ${value}cm`);
	return parts.length ? parts.join(" × ") : null;
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
