import type { ArtworkListResponse } from "@/lib/api/artwork";

export const MOCK_ARTWORK_LIST: ArtworkListResponse = {
	exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
	maps: [
		{
			id: "map-uuid-1",
			imageUrl: "/images/artworkLocation.png",
			description: "B구역 상세 안내도",
		},
		{
			id: "map-uuid-2",
			imageUrl: "/images/pottery.png",
			description: "C구역 상세 안내도",
		},
		{
			id: "map-uuid-3",
			imageUrl: "/images/pottery.png",
			description: "A구역",
		},
	],
	zones: [
		{
			zoneName: "1구역",
			zoneOrderId: 1,
			categories: [
				{
					categoryName: "서양화·유화",
					artworks: [
						{
							id: "9f821131-2800-4731-990c-034e47340999",
							title: "숨 쉬는 표면",
							imageUrl: "/images/cups.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "박세라",
						},
					],
				},
				{
					categoryName: "불교 미술",
					artworks: [
						{
							id: "3b251131-1800-4731-860c-034e47340100",
							title: "무한",
							imageUrl: "/images/cups.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "손수현",
						},
					],
				},
				{
					categoryName: "회화",
					artworks: [
						{
							id: "4a001131-1800-4731-860c-034e47340101",
							title: "1-0-8",
							imageUrl: "/images/cups.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "박수향",
						},
					],
				},
				{
					categoryName: "동양화",
					artworks: [
						{
							id: "5b001131-1800-4731-860c-034e47340102",
							title: "산수",
							imageUrl: "/images/plate.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "김민준",
						},
						{
							id: "6c001131-1800-4731-860c-034e47340103",
							title: "춘하추동",
							imageUrl: "/images/plate.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "이서연",
						},
					],
				},
			],
		},
		{
			zoneName: "2구역",
			zoneOrderId: 2,
			categories: [
				{
					categoryName: "동양화",
					artworks: [
						{
							id: "3b251131-1800-4731-860c-034e47340123",
							title: "균열의 정원",
							imageUrl: "/images/cups.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "이주원",
						},
						{
							id: "7d001131-1800-4731-860c-034e47340104",
							title: "묵향",
							imageUrl: "/images/plate.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "박지훈",
						},
						{
							id: "8e001131-1800-4731-860c-034e47340105",
							title: "청풍",
							imageUrl: "/images/plate.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "최수아",
						},
					],
				},
				{
					categoryName: "한국화",
					artworks: [
						{
							id: "9f001131-1800-4731-860c-034e47340106",
							title: "민화",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "정도윤",
						},
						{
							id: "10a01131-1800-4731-860c-034e47340107",
							title: "화조도",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "윤하은",
						},
						{
							id: "11b01131-1800-4731-860c-034e47340108",
							title: "책거리",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "임재원",
						},
						{
							id: "12c01131-1800-4731-860c-034e47340109",
							title: "봄날",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "강민서",
						},
					],
				},
				{
					categoryName: "불교 미술",
					artworks: [
						{
							id: "13d01131-1800-4731-860c-034e47340110",
							title: "연화",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "한지수",
						},
						{
							id: "14e01131-1800-4731-860c-034e47340111",
							title: "법신",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "오승현",
						},
						{
							id: "15f01131-1800-4731-860c-034e47340112",
							title: "만다라",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "류채원",
						},
						{
							id: "16g01131-1800-4731-860c-034e47340113",
							title: "보리수",
							imageUrl: "/images/pottery.png",
							exhibitionId: "550e8400-e29b-41d4-a716-446655440000",
							slug: "",
							exhibitionTitle: "",
							artistName: "신예진",
						},
					],
				},
			],
		},
	],
};
