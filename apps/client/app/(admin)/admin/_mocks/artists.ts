export interface AdminArtist {
	id: number;
	name: string;
	email: string;
	greeting: string;
	artworkCount: number;
}

const NAMES = ["김두록", "이전시", "박작가", "최도예", "정조각", "한회화", "윤공예", "오사진"];

const createArtists = (count: number, offset: number): AdminArtist[] =>
	Array.from({ length: count }, (_, i) => ({
		id: offset + i,
		name: `${NAMES[i % NAMES.length]}${Math.floor(i / NAMES.length) || ""}`,
		email: `artist${offset + i}@dolog.com`,
		greeting: `20211124${String(i).padStart(2, "0")} / 안녕하세요, 졸업 전시에 참여하고 싶습니다.`,
		artworkCount: i % 4,
	}));

export const MOCK_PENDING_ARTISTS = createArtists(13, 1);
export const MOCK_ARTISTS = createArtists(23, 101);
