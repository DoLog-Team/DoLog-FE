// TODO: 작가 어드민 API 연결 후 제거
export interface JoinableExhibition {
	exhibitionId: string;
	name: string;
	// 전시 관리자가 지정한 자기소개 양식
	introFormat: string;
}

// 입장 코드 → 전시 (테스트용 코드)
const MOCK_EXHIBITIONS_BY_CODE: Record<string, JoinableExhibition> = {
	DOLOG2026: {
		exhibitionId: "10",
		name: "2026년 두록 졸업 전시회",
		introFormat: "학번 / 이름",
	},
};

export const findExhibitionByCode = (code: string): JoinableExhibition | null =>
	MOCK_EXHIBITIONS_BY_CODE[code] ?? null;
