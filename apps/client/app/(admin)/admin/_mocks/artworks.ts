export type ArtworkVisibility = "공개" | "비공개" | "임시저장";

export interface AdminArtwork {
	id: number;
	title: string;
	artistName: string;
	group: string | null;
	visibility: ArtworkVisibility;
	// 플랜 한도 초과로 전시에 노출되지 않으면 false
	isExposed: boolean;
	progress: number;
	imageUrl: string | null;
	isHidden: boolean;
}

export const MOCK_GROUPS = ["A 구역", "B 구역", "C 구역"];

const IMAGES = ["/images/pottery.png", "/images/cups.png", "/images/plate.png", null];
const VISIBILITIES: ArtworkVisibility[] = ["공개", "공개", "비공개", "임시저장"];

export const MOCK_ARTWORKS: AdminArtwork[] = Array.from({ length: 27 }, (_, i) => ({
	id: i + 1,
	title: `물에서 지나온 이야기 ${i + 1}`,
	artistName: ["김두록", "이전시", "박작가"][i % 3],
	group: i % 4 === 3 ? null : MOCK_GROUPS[i % 3],
	visibility: VISIBILITIES[i % 4],
	isExposed: i >= 4,
	progress: [100, 66, 99, 40][i % 4],
	imageUrl: IMAGES[i % 4],
	isHidden: i >= 22,
}));
