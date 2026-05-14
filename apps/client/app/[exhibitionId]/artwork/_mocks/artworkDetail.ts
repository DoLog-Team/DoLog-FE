import type { ArtworkDetail } from "@/lib/api/artwork";

export const MOCK_ARTWORK_DETAIL: ArtworkDetail = {
	title: "파도의 그릇",
	category: "생활 도자기",
	material: "청자토, 청자유",
	size: "지름 22cm × 높이 7cm",
	description: "가장자리의 얇은 물결 라인은...",
	purchaseUrl: "https://naver.com",
	mainImage: "/images/artwork/artwork.png",
	locationMap: "/images/artwork/artworkLocation.png",
	detailImages: [
		{ imageUrl: "/images/cups.png", description: "" },
		{ imageUrl: "/images/plate.png", description: "" },
	],
	participants: [
		{
			artistId: "1",
			profileId: "profile-1",
			nameKo: "배주현",
			nameEn: "Bae JuHyun",
			profileImg: "/images/artists/artist1.svg",
			role: "팀 리더, 작품 기획",
			bio: "일상에서 자주 쓰는 그릇을 만들며...",
			sns: [
				{ platformName: "인스타그램", url: "@dolog.archive" },
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
		{
			id: "1",
			title: "내 졸업 전시 이야기",
			author: "오찬주",
			mainImg: "/images/artwork/bts1.png",
		},
		{ id: "2", title: "푸른 색의 미학", author: "이보연", mainImg: "/images/artwork/bts2.png" },
		{
			id: "3",
			title: "내가 흙을 사랑하는 이유",
			author: "하연희",
			mainImg: "/images/artwork/bts3.png",
		},
	],
	sameCategoryArtworks: [
		{
			id: "4",
			title: "깨진 다음의 모양",
			category: "생활 도자기",
			artistName: "강슬기",
			mainImage: "/images/cups.png",
		},
		{
			id: "5",
			title: "흐린 날의 화병",
			category: "생활 도자기",
			artistName: "손승완",
			mainImage: "/images/plate.png",
		},
	],
	alphabeticalArtworks: [
		{
			id: "4",
			title: "깨진 다음의 모양",
			category: "생활 도자기",
			artistName: "강슬기",
			mainImage: "/images/artwork/artwork.png",
		},
		{
			id: "5",
			title: "흐린 날의 화병",
			category: "생활 도자기",
			artistName: "손승완",
			mainImage: "/images/artwork/artwork.png",
		},
	],
};
