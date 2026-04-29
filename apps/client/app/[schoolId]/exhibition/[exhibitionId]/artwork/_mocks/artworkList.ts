// exhibitions/{id}/artworks 랑 스펙 맞춰둔 목데이터

export interface Artist {
	id: string;
	name: string;
}

export interface Artwork {
	artworkId: string;
	title: string;
	category: string;
	zone: string;
	mainImage: string;
	artists: Artist[];
}

export const MOCK_ARTWORKS: Artwork[] = [
	// 1구역
	{
		artworkId: "uuid-1",
		title: "여백",
		category: "회화",
		zone: "1구역",
		mainImage: "/images/cups.png",
		artists: [{ id: "a-1", name: "강승기" }],
	},
	{
		artworkId: "uuid-2",
		title: "2000년 후",
		category: "회화",
		zone: "1구역",
		mainImage: "/images/cups.png",
		artists: [{ id: "a-2", name: "배수향" }],
	},
	{
		artworkId: "uuid-3",
		title: "무한",
		category: "불교 미술",
		zone: "1구역",
		mainImage: "/images/cups.png",
		artists: [{ id: "a-3", name: "손수현" }],
	},
	{
		artworkId: "uuid-4",
		title: "1-0-8",
		category: "회화",
		zone: "1구역",
		mainImage: "/images/cups.png",
		artists: [{ id: "a-4", name: "박수향" }],
	},
	{
		artworkId: "uuid-5",
		title: "산수",
		category: "동양화",
		zone: "1구역",
		mainImage: "/images/plate.png",
		artists: [{ id: "a-5", name: "김민준" }],
	},
	{
		artworkId: "uuid-6",
		title: "춘하추동",
		category: "동양화",
		zone: "1구역",
		mainImage: "/images/plate.png",
		artists: [{ id: "a-6", name: "이서연" }],
	},

	// 2구역
	{
		artworkId: "uuid-7",
		title: "묵향",
		category: "동양화",
		zone: "2구역",
		mainImage: "/images/plate.png",
		artists: [{ id: "a-7", name: "박지훈" }],
	},
	{
		artworkId: "uuid-8",
		title: "청풍",
		category: "동양화",
		zone: "2구역",
		mainImage: "/images/plate.png",
		artists: [{ id: "a-8", name: "최수아" }],
	},
	{
		artworkId: "uuid-9",
		title: "민화",
		category: "한국화",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-9", name: "정도윤" }],
	},
	{
		artworkId: "uuid-10",
		title: "화조도",
		category: "한국화",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-10", name: "윤하은" }],
	},
	{
		artworkId: "uuid-11",
		title: "책거리",
		category: "한국화",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-11", name: "임재원" }],
	},
	{
		artworkId: "uuid-12",
		title: "봄날",
		category: "한국화",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-12", name: "강민서" }],
	},
	{
		artworkId: "uuid-13",
		title: "연화",
		category: "불교 미술",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-13", name: "한지수" }],
	},
	{
		artworkId: "uuid-14",
		title: "법신",
		category: "불교 미술",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-14", name: "오승현" }],
	},
	{
		artworkId: "uuid-15",
		title: "만다라",
		category: "불교 미술",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-15", name: "류채원" }],
	},
	{
		artworkId: "uuid-16",
		title: "보리수",
		category: "불교 미술",
		zone: "2구역",
		mainImage: "/images/pottery.png",
		artists: [{ id: "a-16", name: "신예진" }],
	},
];
