export interface ArtworkGroup {
	id: string;
	name: string;
	description: string;
}

export const REQUIRED_OPTIONS = [
	{ key: "image", title: "작품 대표 이미지", label: "작품 대표 이미지 필수 입력" },
	{ key: "size", title: "작품 사이즈", label: "작품 사이즈 필수 입력" },
	{ key: "material", title: "재료 및 기법", label: "작품 재료 및 기법 필수 입력" },
	{ key: "location", title: "위치 이미지", label: "위치 이미지 필수 입력" },
] as const;

export const HIDDEN_OPTIONS = [
	{ key: "size", title: "작품 사이즈", label: "작품 사이즈 보여주지 않기" },
	{ key: "material", title: "재료 및 기법", label: "재료 및 기법 보여주지 않기" },
	{ key: "location", title: "위치 이미지", label: "위치 이미지 보여주지 않기" },
	{
		key: "period",
		title: "제작 기간",
		label: "제작 기간 보여주지 않기",
		description:
			"작가가 2025년 1월 2일~2026년 6월 2일로 제작 기간을 표기했다면,\n제작 기간을 보여주지 않을 경우 2026년만 표기돼요.",
	},
	{
		key: "year",
		title: "제작 연도",
		label: "제작 연도 보여주지 않기",
		description: "제작 연도를 보여주지 않을 경우 모든 제작 기간 데이터가 노출 되지않아요.",
	},
] as const;

type RequiredKey = (typeof REQUIRED_OPTIONS)[number]["key"];
type HiddenKey = (typeof HIDDEN_OPTIONS)[number]["key"];

export interface ExhibitionSettings {
	groups: ArtworkGroup[];
	required: Record<RequiredKey, boolean>;
	hidden: Record<HiddenKey, boolean>;
}

// 전시 설정 API 연결 전 임시 데이터 — 그룹 이름은 작품 관리 목데이터와 맞춤
export const MOCK_EXHIBITION_SETTINGS: ExhibitionSettings = {
	groups: [
		{ id: "1", name: "A 구역", description: "1층 로비" },
		{ id: "2", name: "B 구역", description: "" },
		{ id: "3", name: "C 구역", description: "" },
	],
	required: { image: true, size: false, material: false, location: false },
	hidden: { size: false, material: false, location: false, period: false, year: false },
};

export const MOCK_LAST_SAVED_AT = "2026.09.20 14:05";
