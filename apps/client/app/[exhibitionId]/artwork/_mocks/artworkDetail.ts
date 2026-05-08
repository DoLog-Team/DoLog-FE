import type { ArtworkDetail } from "@/lib/api/artwork";

export const MOCK_ARTWORK_DETAIL: ArtworkDetail = {
	title: "파도의 그릇",
	category: "생활 도자기",
	material: "청자토, 청자유", // materials → material
	size: "지름 22cm × 높이 7cm",
	description: "가장자리의 얇은 물결 라인은...",
	purchaseUrl: "https://naver.com",
	mainImage: "/images/artwork/artwork.png", // image → mainImage
	locationMap: "/images/artwork/artworkLocation.png", // locationImageUrl → locationMap
	detailImages: [
		{ imageUrl: "/images/cups.png", description: "" }, // string[] → object[]
		{ imageUrl: "/images/plate.png", description: "" },
	],
	participants: [
		// authors → participants
		{
			artistId: "1",
			profileId: "profile-1",
			nameKo: "배주현", // name → nameKo
			nameEn: "Bae JuHyun",
			profileImg: "/images/artists/artist1.svg", // profileUrl → profileImg
			role: "팀 리더, 작품 기획",
			bio: "일상에서 자주 쓰는 그릇을 만들며...", // description → bio
			sns: [
				{ platformName: "인스타그램", url: "@dolog.archive" }, // name → platformName
				{ platformName: "비헨스", url: "https://behance.net/..." },
			],
		},
		{
			artistId: "2",
			profileId: "profile-2",
			nameKo: "강슬기",
			nameEn: "Kang Seulgi",
			profileImg: "/images/artists/artist4.png",
			role: "작품 기획, 제작",
			bio: "소성 후에 생기는 균열이나 깨짐을 보며...",
			sns: [
				{ platformName: "인스타그램", url: "@dolog.archive" },
				{ platformName: "비헨스", url: "https://behance.net/..." },
			],
		},
	],
	relatedBts: [
		{ id: "1", title: "내 졸업 전시 이야기", mainImg: "/images/artwork/bts1.png" },
		{ id: "2", title: "푸른 색의 미학", mainImg: "/images/artwork/bts2.png" },
		{ id: "3", title: "내가 흙을 사랑하는 이유", mainImg: "/images/artwork/bts3.png" },
	],
	sameCategoryArtworks: [
		{ id: "4", title: "깨진 다음의 모양", category: "생활 도자기", artistName: "강슬기", imageUrl: "/images/cups.png" },
		{ id: "5", title: "흐린 날의 화병", category: "생활 도자기", artistName: "손승완", imageUrl: "/images/plate.png" },
	],
	alphabeticalArtworks: [
		{ id: "4", title: "깨진 다음의 모양", category: "생활 도자기", artistName: "강슬기", imageUrl: "/images/artwork/artwork.png" },
		{ id: "5", title: "흐린 날의 화병", category: "생활 도자기", artistName: "손승완", imageUrl: "/images/artwork/artwork.png" },
	],
};
